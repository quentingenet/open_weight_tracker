from django.db import IntegrityError
from django.http import JsonResponse
from owt_api.models import AppUser, Person, WeightRecord
from django.shortcuts import get_object_or_404


def add_weight(user_id, data):
    try:
        # Utilisez get_object_or_404 pour éviter la gestion explicite des exceptions pour la récupération d'objets
        user_instance = get_object_or_404(AppUser, id=user_id)
        person_connected = get_object_or_404(Person, user=user_instance)

        new_weight = WeightRecord.objects.create(
            weight_record_date=data.get('weight_record_date'),
            weight_value=data.get('weight_value'),
            body_water=data.get('body_water'),
            fat_mass=data.get('fat_mass'),
            bone_mass=data.get('bone_mass'),
            muscular_mass=data.get('muscular_mass'),
            bmi=data.get('bmi'),
            person=person_connected
        )

        # Aucun besoin d'appeler new_weight.save(), car create() l'a déjà enregistré dans la base de données

        return JsonResponse({'message': 'ok, Weight created', 'status': 201})

    except IntegrityError:
        return JsonResponse({'message': 'Error, weight could not be created due to integrity error', 'status': 400})
