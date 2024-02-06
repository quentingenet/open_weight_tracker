from tokenize import TokenError
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status

from rest_framework.fields import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponseForbidden

from rest_framework.decorators import action, permission_classes
from .global_utils import check_first_connection, get_user_id_from_jwt
from .services import user_service
from .models import AppUser, PasswordResetToken, Person, InitialData, WeightRecord
from .serializers import AppUserSerializer, PasswordResetTokenSerializer, PersonSerializer, InitialDataSerializer, WeightRecordSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


class CustomTokenObtainPairView(TokenObtainPairView):
    @action(detail=False, methods=['post'])
    def post(self, request, *args, **kwargs):
        print("REQUEST DATA", request.data)
        try:
            user = AppUser.objects.get(username=request.data['username'])
            person_connected = Person.objects.get(user=user)
            heightUser = person_connected.initial_data.height
        except ObjectDoesNotExist:
            return Response({'error': 'User or InitialData not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        response = super().post(request, *args, **kwargs)
        
        try:
            refresh = RefreshToken.for_user(user)
            jwt_token = str(refresh.access_token)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("JWT TOKEN", jwt_token)
        print("RESPONSE DATA", response.data)
        response.data['Authorization'] = f'Bearer {jwt_token}'
        response.data['height'] = heightUser

        return response
        
class AppUserModelViewSet(ModelViewSet):
    serializer_class = AppUserSerializer

    def get_queryset(self, request):
        return AppUser.objects.all()

    # New user registration
    @action(detail=False, methods=['post'])
    def register_user_step_one(self, request):
        return user_service.register_step_one(request.data)

    # After registration set initial data only if first connexion
    @action(detail=False, methods=['post'])
    @permission_classes([IsAuthenticated])
    def register_user_step_two(self, request):
        if request:
            user_id = get_user_id_from_jwt(request)
            if check_first_connection(user_id):
                response = user_service.register_step_two(user_id, request.data)
                return response
            else:
                return HttpResponseForbidden("You are not allowed to access this resource")
        else:
            return HttpResponseForbidden("You are not allowed to access this resource")
        
class PasswordResetTokenModelViewSet(ModelViewSet):
    serializer_class = PasswordResetTokenSerializer

    def get_queryset(self):
        return PasswordResetToken.objects.all()
    
    @action(detail=False, methods=['post'])
    def generate_reset_token(user_id):
        refresh = RefreshToken.for_user(user_id)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    
    @action(detail=False, methods=['post'])
    def validate_reset_token(token):
        try:
            refresh_token = RefreshToken(token)
            user_id = refresh_token.payload['user_id']
            return user_id
        except TokenError:
            return None

    
class PersonModelViewSet(ModelViewSet):
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Person.objects.all()


class InitialDataModelViewSet(ModelViewSet):
    serializer_class = InitialDataSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return InitialData.objects.all()

    @action(detail=False, methods=['get'])
    def get_weights(self, request):
        user_id = get_user_id_from_jwt(request)
        person_connected = get_object_or_404(Person, user__id=user_id)
        initial_data = InitialData.objects.filter(person_initial_data=person_connected)
        serializer = InitialDataSerializer(initial_data, many=True)
        return Response(serializer.data)


class WeightRecordModelViewSet(ModelViewSet):
    serializer_class = WeightRecordSerializer
    permission_classes = [IsAuthenticated]
    queryset = WeightRecord.objects.all()

    @action(detail=False, methods=['get'])
    def get_weights(self, request):
        user_id = get_user_id_from_jwt(request)
        person_connected = get_object_or_404(Person, user__id=user_id)
        weights = WeightRecord.objects.filter(person=person_connected)
        serializer = WeightRecordSerializer(weights, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def create_weight(self, request):
        print("REQUEST DATA =", request.data)
        user_id = get_user_id_from_jwt(request)

        try:
            user_connected = get_object_or_404(AppUser, id=user_id)
            person_connected = get_object_or_404(Person, user=user_connected)
       
            print("USER CONNECTED ID =", user_id)
            new_weight = WeightRecord.objects.create(
                weight_record_date=request.data.get('weight_record_date'),
                weight_value=request.data.get('weight_value'),
                body_water=request.data.get('body_water'),
                fat_mass=request.data.get('fat_mass'),
                bone_mass=request.data.get('bone_mass'),
                muscular_mass=request.data.get('muscular_mass'),
                bmi=request.data.get('bmi'),
                person=person_connected
            )

            return Response({"message": "Weight record created successfully", "data": {"id Weight": new_weight.id}}, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({"error": "Error, weight could not be created due to integrity error"}, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=False, methods=['delete'])
    def delete_weight(self, request):
        print("REQUEST DATA =", request.data)
        weight_id = request.data.get('weight_id')
        print("WEIGHT ID =", weight_id)

        user_id = get_user_id_from_jwt(request)
        user_connected = get_object_or_404(AppUser, id=user_id)
        person_connected = get_object_or_404(Person, user=user_connected)

        weight = get_object_or_404(WeightRecord, id=weight_id, person=person_connected)

        if weight.person.user != user_connected:
            return Response({"error": "You are not authorized to delete this weight record"}, status=status.HTTP_403_FORBIDDEN)

        weight.delete()
        return Response({"message": "Weight record deleted successfully"}, status=status.HTTP_200_OK)
