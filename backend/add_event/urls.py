from django.urls import path
from .views import CreateOrGetAllEvents, GetMyEvents, GetAnEvent, DeleteEvent

urlpatterns = [
    path("events/", CreateOrGetAllEvents.as_view(), name="events"),
    path('events/<int:id>/', GetAnEvent.as_view(), name='event-detail'),
    path('events/<int:id>/delete/', DeleteEvent.as_view(), name='delete-event'),
    path("events/user-events/", GetMyEvents.as_view(), name="my-events"),
]