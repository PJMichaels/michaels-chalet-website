from django.db import models

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
    # swap name with created by
    name = models.CharField(max_length=120)
    group_size = models.IntegerField()
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    note = models.TextField() # swap to request_message
    # add guests as plural points to users
    # add status # requested, confirmed, active, past
    # add checkout_complete bool
    # add price
    # add payment_received
    # add payment_received_by
    # add stay rating as int 1-5 "stars"
    # add admin note


    def _str_(self):
        return self.title
    
# add class model for guestbook_notes
    # note
    # created by
    # booking foreign key