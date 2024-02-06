import jwt
from rest_framework.exceptions import AuthenticationFailed
from owt_api.models import AppUser
import decouple

from django.core.mail import send_mail
from django.conf import settings
from decouple import config
import jwt
from rest_framework.exceptions import AuthenticationFailed

def get_user_id_from_jwt(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    
    if auth_header is not None:
        jwt_token = auth_header.replace('Bearer', '').strip()  # Retire "Bearer" et les espaces autour
        jwt_token = jwt_token.strip(' "')
        
        try:
            print(f"JWT token: {jwt_token}")
            payload = jwt.decode(jwt_token, key=decouple.config('SECRET_KEY'), algorithms=["HS256"])
            user_id = payload.get('user_id')
            return user_id
        except jwt.InvalidTokenError as e:
            print(f"Invalid token: {e}")
            raise AuthenticationFailed('Invalid token')
    else:
        raise AuthenticationFailed('Authorization header is missing')



def check_first_connection(user_id):
    user = AppUser.objects.get(id=user_id)
    is_first_connection = user.last_login is None
    return is_first_connection


def check_user_id(user_id):
    return AppUser.objects.get(id=user_id) is not None


def send_email(user_email, token):
    subject = 'Reset your password on Open Weight Tracker'
    message_body = f'Please click on the following link to reset your password: http://localhost:5173/reset-password/{token}'
    send_mail(
        subject,
        message_body,
        settings.EMAIL_HOST_USER,  # Adresse e-mail de l'expéditeur
        [user_email],  # Liste des adresses e-mail des destinataires
        fail_silently=False,
    )



def send_contact_email(user_email , message):
    subject = f'OWT new message from : {user_email}'
    message_body = message
    email_admin = config('EMAIL_ADMIN')
    sender = config('EMAIL_HOST_USER')
    send_mail(
        subject,
        message_body,
        sender,
        [email_admin],  # Liste des adresses e-mail des destinataires
        fail_silently=False,
    )
