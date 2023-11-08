from django.db import models

class Bus(models.Model):
    name = models.CharField(max_length=50, unique=True)
    source = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    fare = models.IntegerField()
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()
    img = models.URLField(max_length=200)
    

class Ticket(models.Model): 
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    passenger_name = models.CharField(max_length=50)
    passenger_age = models.IntegerField()
    passenger_gender = models.CharField(max_length=10)
    seat_number = models.CharField(max_length=1000)
    total_fare = models.IntegerField()
    booking_date = models.DateTimeField(auto_now_add=True)
    bus_name = models.CharField(max_length=50, blank=True)

class Login(models.Model):
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=50)

class Register(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField()

class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    message = models.CharField(max_length=1000)