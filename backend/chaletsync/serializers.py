from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import UserProfile, Bookings, Requests, BlockedDates
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from authentication.views import CustomTokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password


# Serializer for users to manage their own profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'email', 'name', 'phone')


# serializer for user and group management
class AdminUserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        queryset=Group.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = UserProfile
        fields = ['id', 'email', 'name', 'phone', 'groups', 'password', 'last_login', 'login_count'] # 'is_active', 'is_staff'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        groups = validated_data.pop('groups')
        user = UserProfile.objects.create_user(**validated_data)
        user.groups.set(groups)
        return user

    def update(self, instance, validated_data):
        groups = validated_data.pop('groups', None)
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()

        if groups is not None:
            instance.groups.set(groups)

        return instance


# change password serializer
class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class BlockedDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedDates
        fields = ['date']
        read_only_fields = [x for x in fields]

class AdminBlockedDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedDates
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = Requests
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['created_by'] = UserProfileSerializer(instance.created_by).data
        return response

class AdminBookingsSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = Bookings
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['created_by'] = UserProfileSerializer(instance.created_by).data
        return response


class BookingsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookings
        fields = [
            'arrival_date',
            'departure_date'
            ]
        read_only_fields = [x for x in fields]

class UserBookingsSerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer()
    class Meta:
        model = Bookings
        fields = [
            'id',
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


    

# class LimitedAvailabilitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Availability
#         fields = ['start_date', 'end_date']