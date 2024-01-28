from django.contrib.auth.models import User, Group
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

# serializer for user and group management
class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        queryset=Group.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        groups = validated_data.pop('groups')
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups)
        return user

    def update(self, instance, validated_data):
        groups = validated_data.pop('groups', None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()

        if groups is not None:
            instance.groups.set(groups)

        return instance