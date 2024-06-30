from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.utils import timezone

class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )   
   
   def get(self, request):       
    
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}   
    
        return Response(content)
   
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)     
    
    def post(self, request):
          
          try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)        
            
          except Exception as e:               
              return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Update last login and login count
        self.user.last_login = timezone.now()
        self.user.login_count += 1
        self.user.save()

        return data
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ValidateTokenView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return Response({'detail': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to validate the token
            valid_token = AccessToken(token)
            return Response({'valid': True, 'payload': valid_token.payload}, status=status.HTTP_200_OK)
        except ValidationError as e:
            # Token is invalid or expired
            return Response({'valid': False, 'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
