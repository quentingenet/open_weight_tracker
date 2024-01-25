from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponseForbidden

from rest_framework.decorators import api_view, permission_classes
from .global_utils import check_first_connection, get_user_id_from_jwt
from .services import user_service
from .models import AppUser, Person, InitialData, WeightRecord
from .serializers import AppUserSerializer, PersonSerializer, InitialDataSerializer, WeightRecordSerializer


class AppUserModelViewSet(ModelViewSet):
    serializer_class = AppUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AppUser.objects.all()


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


class WeightRecordModelViewSet(ModelViewSet):
    serializer_class = WeightRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WeightRecord.objects.all()


# New user registration
@api_view(['POST'])
def register_user_step_one_view(request):
    return user_service.register_step_one(request.data)


# After registration set initial data only if first connexion
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_initial_data_first_connexion_view(request):
    if request:
        user_id = get_user_id_from_jwt(request)
        if check_first_connection(user_id):
            response = user_service.register_step_two(user_id, request.data)
            return response
        else:
            return HttpResponseForbidden("You are not allowed to access this resource")
    else:
        return HttpResponseForbidden("You are not allowed to access this resource")