from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Availability, Bookings, Requests
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# customize token payload
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['username'] = user.username
        token['groups'] = list(user.groups.values_list('name', flat=True))
        return token


class AdminAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['start_date', 'end_date']
        read_only_fields = [x for x in fields]

# class LimitedAvailabilitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Availability
#         fields = ['start_date', 'end_date']

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = '__all__'

class AdminBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = '__all__'

class BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = [
            'arrival_date',
            'departure_date'
            ]
        read_only_fields = [x for x in fields]

class UserBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = [
            'created_by',
            'creation_date',
            'last_modified',
            'group_size',
            'arrival_date',
            'departure_date',
            'request_message',
            'status',
            ]
        read_only_fields = [x for x in fields]

# create serializers for limited guests

# create a serializer for availability just for guests

# serializer for user and group management
class AdminUserSerializer(serializers.ModelSerializer):
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
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # class UserSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = User
    #         fields = ['id', 'username', 'email', 'first_name', 'last_name']  # Customize fields as needed
    #         extra_kwargs = {'password': {'write_only': True}}

    #     def create(self, validated_data):
    #         user = User.objects.create_user(**validated_data)
    #         return user

    #     def update(self, instance, validated_data):
    #         instance.email = validated_data.get('email', instance.email)
    #         # handle other fields
    #         instance.save()
    #         return instance