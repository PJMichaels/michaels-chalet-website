# unused, but here as a placeholder for new DB generation

from django.contrib.auth.models import Group, User

Group.objects.create(name='Admin')
Group.objects.create(name='Guest')
Group.objects.create(name='Limited Guest')

User.objects.create(user_name='truejambles', password= 'test')