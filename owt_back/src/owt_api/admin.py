from django.contrib import admin
from .models import WeightRecord, InitialData, Person


class PersonAdmin(admin.ModelAdmin):
    list_display = ('initial_data', 'user')

class InitialDataAdmin(admin.ModelAdmin):
    list_display = (
    'body_size', 'birthdate', 'initial_weight', 'goal_weight', 'is_european_unit_measure', 'register_user_date')

class WeightRecordAdmin(admin.ModelAdmin):
    list_display = (
    'weight_record_date', 'weight_value', 'body_water', 'fat_mass', 'bone_mass', 'muscular_mass', 'bmi', 'person')


admin.site.register(Person, PersonAdmin)
admin.site.register(WeightRecord, WeightRecordAdmin)
admin.site.register(InitialData, InitialDataAdmin)

