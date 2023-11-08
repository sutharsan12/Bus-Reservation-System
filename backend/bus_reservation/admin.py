from django.contrib import admin
from .models import Bus, Ticket, Login, Register, Contact

class BusAdmin(admin.ModelAdmin):
    list_display = ('name', 'source', 'destination', 'departure_time', 'arrival_time', 'fare', 'total_seats', 'available_seats','img')

class TicketAdmin(admin.ModelAdmin):
    list_display = ('bus', 'passenger_name', 'passenger_age', 'passenger_gender', 'seat_number' , 'total_fare', 'booking_date')

class LoginAdmin(admin.ModelAdmin):
     list_display = ('email', 'password')

class RegisterAdmin(admin.ModelAdmin):
    list_display = ('username', 'password', 'email')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message')


admin.site.register(Bus, BusAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(Login, LoginAdmin)
admin.site.register(Register, RegisterAdmin)
admin.site.register(Contact, ContactAdmin)