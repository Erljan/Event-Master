import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/LogIn.jsx";
import ManageEvents from "./pages/ManageEvents.jsx";
import Profile from "./pages/Profile.jsx";
import SignUp from "./pages/SignUp.jsx";
import EventPage from "./pages/EventPage.jsx";
import VenuePage from "./pages/VenuePage.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import VenueResults from "./pages/VenueResults.jsx";
import EventResults from "./pages/EventResults.jsx";
import CreateGroup from "./pages/CreateGroup.jsx";
import GroupPage from "./pages/GroupPage.jsx";
// added these 2 pages below that were missing
import MyEvents from "./pages/MyEvents.jsx";
import Results from "./pages/Results.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "manageevents",
        element: <ManageEvents />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "events/:id/",
        element: <EventPage />,
      },
      {
        path: "myevents",
        element: <MyEvents />,
      },
      {
        path: "venues",
        element: <VenuePage />,
      },
      {
        path: "createevent",
        element: <CreateEvent />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "venueresults",
        element: <VenueResults />,
      },
      {
        path: "eventresults",
        element: <EventResults />,
      },
      {
        path: "creategroup",
        element: <CreateGroup />,
      },
      {
        path: "grouppage",
        element: <GroupPage />,
      },
    ],
  },
]);
export default router;
