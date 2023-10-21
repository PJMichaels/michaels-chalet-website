from django.db import models

# Create your models here.
class Availability(models.Model):
    reason = models.CharField(max_length=120)
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")

    def _str_(self):
        return self.title

class Bookings(models.Model):
    name = models.CharField(max_length=120)
    group_size = models.IntegerField()
    start_date = models.DateField("Start Date")
    end_date = models.DateField("End Date")
    note = models.TextField()

    def _str_(self):
        return self.title