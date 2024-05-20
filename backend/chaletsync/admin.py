from django.contrib import admin
from .models import Bookings, Availability

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('reason', 'start_date', 'end_date')

class BookingsAdmin(admin.ModelAdmin):
    list_display = (
        'created_by',
        'creation_date',
        'last_modified',
        'group_size',
        'arrival_date',
        'departure_date',
        'request_message',
        'price',
        'payment_received',
        'status',
        'admin_note'
        )



# Register your models here.

admin.site.register(Availability, AvailabilityAdmin)

admin.site.register(Bookings, BookingsAdmin)