from rest_framework import serializers
from .models import Availability, Bookings

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'reason', 'start_date', 'end_date']

class BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['id', 'name', 'group_size', 'start_date', 'end_date', 'note']

