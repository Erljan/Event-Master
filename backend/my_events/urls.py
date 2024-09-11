from django.urls import path
from .views import AddToMyEvents, RemoveEvent, GetSingleEvent

urlpatterns = [
    path("my-events/", AddToMyEvents.as_view(), name="add_events"),
    path("my-events/<str:eventId>/", RemoveEvent.as_view(), name="delete_events"),
    path("my-event/<str:eventId>/", GetSingleEvent.as_view(), name="get_event")
]