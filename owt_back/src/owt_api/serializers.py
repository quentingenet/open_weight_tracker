from rest_framework.serializers import ModelSerializer
from .models import AppUser, PasswordResetToken, Person, InitialData, WeightRecord


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = '__all__'

class PasswordResetTokenSerializer(ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = '__all__'
        
class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'


class InitialDataSerializer(ModelSerializer):
    class Meta:
        model = InitialData
        fields = '__all__'


class WeightRecordSerializer(ModelSerializer):
    class Meta:
        model = WeightRecord
        fields = '__all__'
