from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BookingsSerializer, AvailabilitySerializer
from .models import Bookings, Availability

# Create your views here.

class BookingsView(viewsets.ModelViewSet):
    serializer_class = BookingsSerializer
    queryset = Bookings.objects.all()

class AvailabilityView(viewsets.ModelViewSet):
    serializer_class = AvailabilitySerializer
    queryset = Availability.objects.all()