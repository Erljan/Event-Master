from django.urls import path
from .views import AddToMyEvents

urlpatterns = [
    path("my-events/", AddToMyEvents.as_view(), name="add_events")
]