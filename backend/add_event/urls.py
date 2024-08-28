from django.urls import path
from .views import CreateOrGetAllEvents, GetMyEvents

urlpatterns = [
    path("events/", CreateOrGetAllEvents.as_view(), name="events"),
    path("events/my-events/", GetMyEvents.as_view(), name="my-events"),
]