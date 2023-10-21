from django.contrib import admin
from .models import Bookings, Availability

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('reason', 'start_date', 'end_date')

class BookingsAdmin(admin.ModelAdmin):
    list_display = ('name', 'group_size', 'start_date', 'end_date', 'note')



# Register your models here.

admin.site.register(Availability, AvailabilityAdmin)

admin.site.register(Bookings, BookingsAdmin)