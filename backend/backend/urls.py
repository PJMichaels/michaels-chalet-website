"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from chaletsync import views as chaletsyncviews
from authentication import views as authenticationviews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = routers.DefaultRouter()
router.register(r'available', chaletsyncviews.AvailabilityView, 'availability')
router.register(r'bookings', chaletsyncviews.BookingsView, 'bookings')
router.register(r'users', chaletsyncviews.UserViewSet, 'users')
# router.register(r'user', chaletsyncviews.UserView.as_view(), 'user')
# router.register(r'users', chaletsyncviews.UserList, 'users')
# router.register(r'users-details', chaletsyncviews.UserDetail, 'user-details')


#     path('users/<int:pk>/', views.UserDetail.as_view()),
# router.register(r'groups', chaletsyncviews.GroupViewSet, 'groups')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', 
          TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
    path('api/user/', chaletsyncviews.UserView.as_view(), name='user-detail'),
    path('api/token/refresh/', 
          TokenRefreshView.as_view(), 
          name ='token_refresh'),
    path('', include('authentication.urls')),
    path('api/token/validate/', authenticationviews.ValidateTokenView.as_view(), name='token_validate'),     
    path('api/logout/', authenticationviews.LogoutView.as_view(), name ='logout'),
]
