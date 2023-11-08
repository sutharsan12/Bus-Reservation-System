from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BusSerializer, TicketSerializer, LoginSerializer, RegisterSerializer ,ContactSerializer
from .models import Bus, Ticket, Login, Register, Contact

class BusView(viewsets.ModelViewSet):
    serializer_class = BusSerializer
    queryset = Bus.objects.all()

class TicketView(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    def perform_create(self, serializer):
        bus = serializer.validated_data.get('bus')
        serializer.save(bus_name=bus.name)
    def perform_update(self, serializer):
        bus = serializer.validated_data.get('bus')
        serializer.save(bus_name=bus.name)

class LoginView(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    queryset = Login.objects.all()

class RegisterView(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()