from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import AccessToken
from owt_api.serializers import PersonSerializer, UserSerializer
from owt_api.global_utils import get_user_id_from_jwt
from owt_api.models import InitialData, Person
from django.contrib.auth.models import User


def register_step_one(data):
    
    data['password'] = make_password(data['password'])
    data['is_superuser'] = False
    data['is_staff'] = False
    data['is_active'] = True
    data['last_login'] = None
    data['username'] = data['username'].lower().strip()
    data['email'] = data['email'].lower().strip()
    data['joined_date'] = data['joined_date']
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()

        # Generate JWT
        token = AccessToken.for_user(user)
        # Create a response and set the Authorization header with the JWT
        response = HttpResponse(status=status.HTTP_201_CREATED)
        response['Authorization'] = f'Bearer {str(token)}'
        return response
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def register_step_two(user_id, data): 
    
    user = User.objects.get(id=user_id)
    Initial_data = InitialData(body_size = data['body_size'], 
                            gender = data['gender'], 
                            birthdate = data['birthdate'], 
                            initial_weight = data['initial_weight'], 
                            goal_weight = data['goal_weight'], 
                            is_european_unit_measure = data['is_european_unit_measure'],
                            is_accepted_terms = data['isAcceptedTerms'],
                            register_user_date = data['register_user_date'])
    
    person = Person(user=user, initial_data=Initial_data)
    
    serializer = PersonSerializer(data=person)
    if serializer.is_valid():
        person = serializer.save()
        return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)