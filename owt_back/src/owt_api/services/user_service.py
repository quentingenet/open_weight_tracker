from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import AccessToken
from owt_api.models import AppUser, InitialData, Person


def register_step_one(data):
    try:
        if data:
            user = AppUser.objects.create(
                        username = data['username'].lower().strip(),
                        password = make_password(data['password']),
                        email = data['email'].lower().strip(),
                        is_superuser = False,
                        is_staff = False,
                        is_active = True,
                        last_login = None,
                        is_accepted_terms = data['is_accepted_terms'],
                        date_joined = timezone.now()
                        )   
            # Generate JWT
            token = AccessToken.for_user(user)
            # Create a response and set the Authorization header with the JWT
            response = HttpResponse(status=status.HTTP_201_CREATED)
            response['Authorization'] = f'Bearer {str(token)}'
            return response
        else:
            return HttpResponse("Error, user not created",status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        return HttpResponse("Error, user could not be created due to integrity error", status=status.HTTP_400_BAD_REQUEST)


def register_step_two(user_id, data): 
    try:
        user = AppUser.objects.get(id=user_id)
    except AppUser.DoesNotExist:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    try:
        initial_data = InitialData.objects.create(
            body_size = data['body_size'], 
            gender = data['gender'], 
            birthdate = data['birthdate'], 
            initial_weight = data['initial_weight'], 
            goal_weight = data['goal_weight'], 
            is_european_unit_measure = data['is_european_unit_measure']
        )
    except ValidationError as e:
        return HttpResponse(f"Error, initial data could not be created: {e}", status=status.HTTP_400_BAD_REQUEST)

    try:
        Person.objects.create(user=user, initial_data=initial_data)
    except ValidationError as e:
        return HttpResponse(f"Error, person could not be created: {e}", status=status.HTTP_400_BAD_REQUEST)
    
    return HttpResponse(status=status.HTTP_201_CREATED)