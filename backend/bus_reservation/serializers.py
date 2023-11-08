from rest_framework import serializers

from .models import Bus, Ticket, Login, Register, Contact

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ('id','name', 'source', 'destination', 'departure_time',
                  'arrival_time', 'fare', 'total_seats', 'available_seats','img')


class TicketSerializer(serializers.ModelSerializer):
    bus_name = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('id','bus', 'passenger_name', 'passenger_age', 'passenger_gender',
                  'seat_number', 'total_fare', 'booking_date', 'bus_name')

    def get_bus_name(self, obj):
        return obj.bus.name

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('email', 'password')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ('username', 'password', 'email')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('name', 'email', 'message')