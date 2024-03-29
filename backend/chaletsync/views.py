from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import Group, User
from .serializers import AdminUserSerializer, UserSerializer, BookingsSerializer, AvailabilitySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from .permissions import IsAdminUser, IsGuestUser, IsLimitedGuestUser
from .models import Bookings, Availability
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

# view for admin add/update/delete users - not sure about passwords
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = UserSerializer
    queryset = User.objects.all()

# view for admin to add/update/delete all bookings
class BookingsView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, (IsAdminUser or IsGuestUser))
    serializer_class = BookingsSerializer
    queryset = Bookings.objects.all()

# view for booking page with limited details
# class LimitedBookingsView(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated, (IsAdminUser or IsGuestUser))
#     serializer_class = LimitedBookingsSerializer
#     queryset = Bookings.objects.all()

# view for admin to add/update/delete all availability
class AvailabilityView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, (IsAdminUser or IsGuestUser))
    serializer_class = AvailabilitySerializer
    queryset = Availability.objects.all()

# class LimitedAvailabilityView(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated, (IsAdminUser or IsGuestUser))
#     serializer_class = LimitedAvailabilitySerializer
#     queryset = Availability.objects.all()

# add multiple views for admin to see all other models ...

# create a view for only availability dates and nothing else
        
# create a view or serializer for bookings only for the the current user

# eventually add views for float trips, guest book, etc..

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer


class UserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Ensure the user can only access their own information
        return self.request.user

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

