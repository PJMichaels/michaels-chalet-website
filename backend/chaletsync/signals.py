# signals.py
import os
from django.contrib.auth.signals import user_logged_in
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.mail import send_mail
from .models import Requests, UserProfile
from django.contrib.auth.models import Group
from chaletsync.email.email_templates import new_request_admin_notification

# this section automatically records last login date and increments the login_count field for UserProfile
@receiver(user_logged_in)
def update_login_info(sender, request, user, **kwargs):
    user.last_login = timezone.now()
    user.login_count += 1
    user.save()


# this section automates an email to admin users when a new request is created
@receiver(post_save, sender=Requests)
def send_admin_notification(sender, instance, created, **kwargs):
    if created:
        admin_group = Group.objects.get(name='Admin')
        admin_emails = UserProfile.objects.filter(groups=admin_group).values_list('email', flat=True)
        subject_text, message_text = new_request_admin_notification(instance)
        # print(admin_emails)
        send_mail(
            subject= subject_text,
            message = message_text,
            # message=f'Details of the request: {instance.details}',
            from_email=os.getenv('EMAIL_HOST_USER'),
            recipient_list=admin_emails,
        )
