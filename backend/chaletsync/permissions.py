from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Admin').exists()
    
class IsGuestUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Guest').exists()
    
class IsLimitedGuestUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='LimitedGuest').exists()
    
# Experimental class to check multiple roles AND Authentication!
# class IsAdminOrGuest(permissions.BasePermission):
#     def has_permission(self, request, view):
#         is_authenticated = request.user and request.user.is_authenticated
#         is_admin = request.user.groups.filter(name='Admin').exists()
#         is_guest = request.user.groups.filter(name='Guest').exists()
#         return is_authenticated and (is_admin or is_guest)