from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Person, InitialData, WeightRecord


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
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
