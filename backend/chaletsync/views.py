from datetime import date
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import Group, User
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
# from rest_framework.views import APIView
from .permissions import IsAdminUser, IsGuestUser, IsLimitedGuestUser
from .models import Bookings, Availability, Requests

# view for admin add/update/delete users - not sure about passwords
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = UserSerializer
    # queryset = User.objects.all()


# view for admin to add/update/delete all bookings
class BookingsView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, (IsAdminUser or IsGuestUser))
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]
    
    queryset = Bookings.objects.all()

    def get_serializer_class(self):
        if self.request.user.groups.filter(name='Admin').exists():
            return AdminBookingsSerializer
        return BookingsSerializer
    
    def get_queryset(self):
        queryset = Bookings.objects.all()
        today = date.today()
        arrival_date = self.request.query_params.get('arrival_date', None)

        if arrival_date == 'all':
            return queryset
        
        elif arrival_date:
            queryset = queryset.filter(arrival_date__gte=arrival_date)
            
        else:
            queryset = queryset.filter(arrival_date__gte=today) | queryset.filter(departure_date__gte=today)

        return queryset

# user bookings endpoint, this should be read only
class MyBookingsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]

    serializer_class = UserBookingsSerializer
    
    def get_queryset(self):
        return Bookings.objects.filter(created_by=self.request.user)

# view for admin to add/update/delete all availability
class AvailabilityView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]

    queryset = Availability.objects.all()

    def get_serializer_class(self):
        if self.request.user.groups.filter(name='Admin').exists():
            return AdminAvailabilitySerializer
        return AvailabilitySerializer

# view for admin to add/update/delete all requests
class RequestsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]

    serializer_class = RequestSerializer
    
    def get_queryset(self):
        return Requests.objects.all()

# user requests endpoint, they can edit their own requests
class MyRequestsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]

    serializer_class = RequestSerializer
    
    def get_queryset(self):
        return Requests.objects.filter(created_by=self.request.user)
        

# keep iterating on models to make sure role level permissions are properly defined

# create a view for only availability dates and nothing else
        
# create a view or serializer for bookings only for the the current user

# eventually add views for float trips, guest book, etc..

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer


# class MyUserView(generics.RetrieveUpdateAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]

#     def get_object(self):
#         # Ensure the user can only access their own information
#         return self.request.user

#     def partial_update(self, request, *args, **kwargs):
#         kwargs['partial'] = True
#         return self.update(request, *args, **kwargs)

