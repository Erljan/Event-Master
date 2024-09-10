from django.urls import path
from .views import AddToMyEvents, RemoveEvent

urlpatterns = [
    path("my-events/", AddToMyEvents.as_view(), name="add_events"),
    path("my-events/<str:eventId>/", RemoveEvent.as_view(), name="delete_events")
]