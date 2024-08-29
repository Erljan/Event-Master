from django.urls import path
from .views import CreateOrGetAllEvents, GetMyEvents, GetAnEvent

urlpatterns = [
    path("events/", CreateOrGetAllEvents.as_view(), name="events"),
    path('events/<int:id>/', GetAnEvent.as_view(), name='event-detail'),
    path("events/my-events/", GetMyEvents.as_view(), name="my-events"),
]