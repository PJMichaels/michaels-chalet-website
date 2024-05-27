import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Availability(models.Model):
    reason = models.CharField(max_length=120)
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    # switch reason to note
    # add created by

    def _str_(self):
        return self.title

# add custom user model to make usernames = emails
# add role??
# make passwords optional for limited_guest so they can be created by
# non-limited guests as part of booking

class Bookings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.CharField("Created By", max_length=120)
    creation_date = models.DateTimeField("Creation Date", auto_now_add=True)
    last_modified = models.DateTimeField("Last Modified", auto_now=True)
    group_size = models.IntegerField("Group Size")
    arrival_date = models.DateField("Arrival Date")
    departure_date = models.DateField("Departure Date")
    request_message = models.TextField("Booking Message", null = True) # swap to request_message
    price = models.DecimalField("Booking Price", default=None, max_digits=6, decimal_places=2, null= True)
    payment_received = models.BooleanField("Payment Received", default=False) # new
    status = models.CharField("Booking Status", max_length=30) # confirmed, active, past
    admin_note = models.TextField("Admin Private Note", default=None, null=True) # new
    # add stay rating as int 1-5 "stars"
    # Cleaning_Cost
    # Approved_By
    # Collected_By
    # Collected_Date

    def _str_(self):
        return self.title

class Requests(models.Model):
    booking = models.ForeignKey(
        "Bookings",
        on_delete=models.CASCADE,  # Deletes requests when booking is deleted
        null=True,     # Allows the field to be optional
        default=None                 
    )
    created_by = models.CharField("Created By", max_length=120)
    creation_date = models.DateTimeField("Creation Date", auto_now_add=True)
    group_size = models.IntegerField(
        "Group Size", 
        validators=[
            MaxValueValidator(6),
            MinValueValidator(1)
        ]
        )
    arrival_date = models.DateField("Arrival Date")
    departure_date = models.DateField("Departure Date")
    request_message = models.TextField("Booking Message", null=True)

    request_choices = [
        ('new', 'New Request'),
        ('change', 'Change Request'),
        ('cancellation', 'Cancellation'),
    ]
    request_type = models.CharField("Request Type", max_length=12, choices=request_choices)

    def _str_(self):
        return self.title 


# Booking_Guests Table
# Booking_ID (Foreign)
# User_ID
# Role



# class Booking_Status(models.Model): # this table should exist..
#     status = models.CharField("Booking Status", max_length=30)


# add class model for guestbook_notes
    # note
    # created by
    # booking foreign key