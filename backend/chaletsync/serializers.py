from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Availability, Bookings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'groups']

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'reason', 'start_date', 'end_date']

class BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['id', 'name', 'group_size', 'start_date', 'end_date', 'note']


# create a serializer for availability just for guests