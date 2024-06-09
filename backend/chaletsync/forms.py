# chaletsync/forms.py

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import UserProfile

class UserProfileCreationForm(UserCreationForm):
    class Meta:
        model = UserProfile
        fields = ('email', 'name', 'phone')

class UserProfileChangeForm(UserChangeForm):
    class Meta:
        model = UserProfile
        fields = ('email', 'name', 'phone')