#!/bin/bash
# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

# Apply database migrations
echo "Applying database migrations..."
python manage.py makemigrations chaletsync
python manage.py migrate

# Create Django superuser and groups
echo "Setting up Django superuser and groups..."
python manage.py shell <<EOF
from django.contrib.auth.models import User, Group
from django.contrib.auth import get_user_model

User = get_user_model()

# Create groups
for group_name in ["Admin", "Guest", "LimitedGuest"]:
    Group.objects.get_or_create(name=group_name)


# Create superuser
if not User.objects.filter(email='${DJANGO_SUPERUSER_EMAIL}').exists():
    admin = User.objects.create_superuser(
        email='${DJANGO_SUPERUSER_EMAIL}', 
        password='${DJANGO_SUPERUSER_PASSWORD}', 
        name='${DJANGO_SUPERUSER_NAME}',
        phone='${DJANGO_SUPERUSER_PHONE}'
    )
    admin_group = Group.objects.get(name="Admin")
    admin.groups.add(admin_group)
    admin.save()

EOF

# Start Gunicorn server
exec gunicorn --bind 0.0.0.0:8000 backend.wsgi:application