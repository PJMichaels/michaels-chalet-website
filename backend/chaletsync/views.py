from datetime import date
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import Group, User
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
# from rest_framework.views import APIView
from .permissions import IsAdminUser, IsGuestUser, IsLimitedGuestUser
from .models import UserProfile, Bookings, Availability, Requests

# view for admin add/update/delete users - not sure about passwords
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = UserProfile.objects.all()
    serializer_class = AdminUserSerializer


# view for a user to view or update their own profile details
class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# change password view
class PasswordChangeView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check old password
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"status": "password set"}, status=status.HTTP_200_OK)


# view for admin to add/update/delete all bookings
class BookingsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]
    
    # queryset = Bookings.objects.all()
    queryset = Bookings.objects.select_related('created_by').all()

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
        queryset = Bookings.objects.filter(created_by=self.request.user)
        today = date.today()
        arrival_date = self.request.query_params.get('arrival_date', None)

        if arrival_date == 'all':
            return queryset
        
        elif arrival_date:
            queryset = queryset.filter(arrival_date__gte=arrival_date)
            
        else:
            queryset = queryset.filter(arrival_date__gte=today) | queryset.filter(departure_date__gte=today)

        return queryset

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

    # queryset = Bookings.objects.all()
    queryset = Requests.objects.select_related('created_by').all()

    serializer_class = RequestSerializer
    
    def get_queryset(self):
        return Requests.objects.all()

# user requests endpoint, they can edit their own requests
class MyRequestsView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | IsGuestUser]

    serializer_class = RequestSerializer
    
    def get_queryset(self):
        return Requests.objects.filter(created_by=self.request.user).select_related('created_by')
        

# keep iterating on models to make sure role level permissions are properly defined

# create a view for only availability dates and nothing else
        
# create a view or serializer for bookings only for the the current user

# eventually add views for float trips, guest book, etc..

