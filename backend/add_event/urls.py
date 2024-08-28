from django.urls import path
from .views import CreateOrGetAllEvents

urlpatterns = [
    path("events/", CreateOrGetAllEvents.as_view(), name="events")
]