from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bus_reservation import views

router = routers.DefaultRouter()
router.register(r'buses', views.BusView, 'bus')
router.register(r'tickets', views.TicketView, 'ticket')
router.register(r'login', views.LoginView, 'login')
router.register(r'register', views.RegisterView, 'Register')
router.register(r'contact', views.ContactView, 'Contact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

