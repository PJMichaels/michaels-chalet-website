from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Availability, Bookings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# customize token payload
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # token['groups'] = user.groups
        token['groups'] = list(user.groups.values_list('name', flat=True))
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'groups']

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'reason', 'start_date', 'end_date']

# class LimitedAvailabilitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Availability
#         fields = ['start_date', 'end_date']

class BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['id', 'name', 'group_size', 'start_date', 'end_date', 'note']

# class LimitedBookingsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Bookings
#         fields = ['start_date', 'end_date']

# create a serializer for availability just for guests