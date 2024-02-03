import jwt
from rest_framework.exceptions import AuthenticationFailed
from owt_api.models import AppUser
import decouple

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