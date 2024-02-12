from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUser(AbstractUser):
    is_accepted_terms = models.BooleanField(default=False, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    
    def __str__(self):
        return f'id {self.id}, {self.username}, {self.email}'


class PasswordResetToken(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reset token for {self.user.username}"
    

class InitialData(models.Model):
    class Sex(models.TextChoices):
        MALE = 'M'
        FEMALE = 'F'

    height = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(100), MaxValueValidator(250)])
    birthdate = models.DateField()
    sex = models.CharField(max_length=1, choices=Sex.choices, default=Sex.MALE)
    initial_weight = models.DecimalField(max_digits=4, decimal_places=1)
    goal_weight = models.DecimalField(max_digits=4, decimal_places=1)
    is_european_unit_measure = models.BooleanField(default=True)
        
    def __str__(self):
          return f'id {self.id}, birthdate {self.birthdate}'


class Person(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    initial_data = models.OneToOneField(InitialData, on_delete=models.CASCADE, related_name='person_initial_data')

    def __str__(self):
          return f'id {self.id}, {self.user.username}'


class WeightRecord(models.Model):
    weight_record_date = models.DateTimeField(auto_now_add=True)
    weight_value = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(20), MaxValueValidator(250)])
    body_water = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(25), MaxValueValidator(70)])
    fat_mass = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(5), MaxValueValidator(70)])
    bone_mass = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    muscular_mass = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(10), MaxValueValidator(100)])
    bmi = models.DecimalField(max_digits=3, decimal_places=1)
    person = models.ForeignKey(Person, on_delete=models.PROTECT, related_name='weight_records')
    
    def __str__(self):
          return f'{self.weight_record_date}, {self.weight_value}'

class Contact(models.Model):
    email = models.EmailField(max_length=100, blank=False, null=False)
    message = models.TextField(max_length=1000, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
          return f'id {self.id}, {self.email}'
