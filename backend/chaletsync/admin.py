from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import UserProfileCreationForm, UserProfileChangeForm
from .models import UserProfile, Bookings, BlockedDates

class UserProfileAdmin(UserAdmin):
    add_form = UserProfileCreationForm
    form = UserProfileChangeForm
    model = UserProfile
    list_display = ('email', 'name', 'phone', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'name', 'phone', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'phone', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


class BlockedDatesAdmin(admin.ModelAdmin):
    list_display = ('date', 'reason')


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

admin.site.register(UserProfile, UserProfileAdmin)

admin.site.register(BlockedDates, BlockedDatesAdmin)

admin.site.register(Bookings, BookingsAdmin)