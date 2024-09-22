# chaletsync.tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from chaletsync.models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta


class BaseTestCase(APITestCase):
    def setUp(self):
        # Create Groups
        self.admin_group = Group.objects.create(name='Admin')
        self.guest_group = Group.objects.create(name='Guest')

        # Create Admin User
        self.admin_user = UserProfile.objects.create_user(
            email='admin@example.com',
            password='adminpassword',
            name='Admin User',
            phone='1234567890',
        )
        self.admin_user.groups.add(self.admin_group)

        # Create Guest User 1
        self.guest_user = UserProfile.objects.create_user(
            email='guest1@example.com',
            password='guest1password',
            name='Guest User 1',
            phone='0987654321',
        )
        self.guest_user.groups.add(self.guest_group)

        # Create Guest User 2
        self.guest_user_secondary = UserProfile.objects.create_user(
            email='guest2@example.com',
            password='guest2password',
            name='Guest User 2',
            phone='0987654322',
        )
        self.guest_user_secondary.groups.add(self.guest_group)

        # Obtain tokens
        self.admin_token = str(RefreshToken.for_user(self.admin_user).access_token)
        self.guest_token = str(RefreshToken.for_user(self.guest_user).access_token)
        self.secondary_guest_token = str(RefreshToken.for_user(self.guest_user_secondary).access_token)

    def authenticate_as_admin(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')

    def authenticate_as_guest(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.guest_token}')

    def authenticate_as_secondary_guest(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.secondary_guest_token}')


class AdminAvailabilityTests(BaseTestCase):
    def test_admin_can_create_availability(self):
        self.authenticate_as_admin()
        url = reverse('availability-list')
        data = {'reason': 'Availability Test', 'start_date': '2026-01-01', 'end_date': '2026-01-02'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['reason'], 'Availability Test')

    def test_guest_can_view_limited_availability(self):
        self.authenticate_as_admin()
        # Create availability
        url = reverse('availability-list')
        start_date = datetime.today()
        end_date = start_date + timedelta(days=5)
        data = {'reason': 'Guest Viewable Event', 'start_date': start_date.strftime('%Y-%m-%d'), 'end_date': end_date.strftime('%Y-%m-%d')}
        self.client.post(url, data, format='json')
        
        # Switch to guest user
        self.authenticate_as_guest()
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['start_date'], start_date.strftime('%Y-%m-%d')) # check guest can view record

        guest_view_data = {k: data[k] for k in data if k != 'reason' and k != 'id'} 
        self.assertEqual(response.data[0], guest_view_data) # guest view should not show reason or id
        
        # test guest cannot create modify availability
        # test availability only shows current/future dates w/o arg, then test arg.




# class AvailabilityFilterTests(BaseTestCase):
#     def test_only_future_availabilities_returned(self):
#         self.authenticate_as_guest()
#         # Create future and past availability records
#         url = reverse('availability-list')
#         future_data = {'reason': 'Future Event', 'start_date': '2026-01-01', 'end_date': '2026-01-02'}
#         past_data = {'reason': 'Past Event', 'start_date': '2021-01-01', 'end_date': '2021-01-02'}

#         self.authenticate_as_admin()
#         self.client.post(url, future_data, format='json')
#         self.client.post(url, past_data, format='json')

#         # Check future records are returned
#         self.authenticate_as_guest()
#         response = self.client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Assert only future events are present
#         for event in response.data:
#             self.assertGreaterEqual(event['start_date'], '2024-09-01')

#     def test_can_view_past_availabilities_with_param(self):
#         self.authenticate_as_guest()
#         url = reverse('availability-list') + '?include_past=true'
#         response = self.client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Add checks for past availabilities




##### everything below here is an artifact or previous code. test_admin_provision_date was working.

# class ProvisioningTests(APITestCase):

#     def setUp(self):
#         # Create groups for role-based access
#         self.admin_group = Group.objects.create(name='Admin')
#         self.guest_group = Group.objects.create(name='Guest')

#         # Create a test user and assign them to the Admin group
#         self.user = UserProfile.objects.create_user(
#             email='admin@example.com',
#             password='testpassword',
#             name='Admin User',
#             phone='1234567890'
#         )
#         self.user.groups.add(self.admin_group)  # Assign user to Admin group

#         # Obtain a token for the created user
#         refresh = RefreshToken.for_user(self.user)
#         self.token = str(refresh.access_token)

#         # Set the token in the Authorization header
#         self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

#     def test_admin_provision_date(self):
#         url = reverse('availability-list')  # Assuming you are using a router with the name 'availability'
#         data = {'reason': 'Family Holiday', 'start_date': '2026-06-25', 'end_date': '2026-06-28'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['reason'], 'Family Holiday')
#         self.assertEqual(response.data['start_date'], '2026-06-25')
#         self.assertEqual(response.data['end_date'], '2026-06-28')


#     # WIP
#     def test_guest_access_denied(self):
#         # Create a test user and assign them to the Guest group
#         guest_user = UserProfile.objects.create_user(
#             email='guest@example.com',
#             password='guestpassword',
#             name='Guest User',
#             phone='0987654321'
#         )
#         guest_user.groups.add(self.guest_group)  # Assign user to Guest group

#         # Obtain a token for the guest user
#         refresh = RefreshToken.for_user(guest_user)
#         guest_token = str(refresh.access_token)

#         # Set the token in the Authorization header
#         self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + guest_token)

#         url = reverse('availability-list')  # Use the pattern name 'availability-list'
#         data = {'reason': 'Unauthorized Access', 'start_date': '2026-06-25', 'end_date': '2026-06-28'}

#         # Log the data to confirm it is being sent correctly
#         print(f"Sending data: {data}")

#         response = self.client.get(url, data, format='json')
        
#         # Log the response content for debugging
#         print(f"Response data: {response.data}")
#         # response = self.client.post(url, data, format='json')
        
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)  # Expect a 403 Forbidden
    



