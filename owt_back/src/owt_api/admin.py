from django.contrib import admin
from .models import AppUser, Contact, PasswordResetToken, WeightRecord, InitialData, Person


class AppUserAdmin(admin.ModelAdmin):
    list_display = ('id','username', 'email', 'date_joined', 'is_active', 'is_staff', 'is_superuser', 'is_accepted_terms')

class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'token', 'created_at')
    
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',)

class InitialDataAdmin(admin.ModelAdmin):
    list_display = ('person_initial_data','height', 'birthdate', 'initial_weight', 'goal_weight', 'is_european_unit_measure')

class WeightRecordAdmin(admin.ModelAdmin):
    list_display = (
    'weight_record_date', 'weight_value', 'body_water', 'fat_mass', 'bone_mass', 'muscular_mass', 'bmi', 'person')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'message', 'created_at')
    
admin.site.register(Contact, ContactAdmin)
admin.site.register(AppUser, AppUserAdmin)
admin.site.register(PasswordResetToken, PasswordResetTokenAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(WeightRecord, WeightRecordAdmin)
admin.site.register(InitialData, InitialDataAdmin)

