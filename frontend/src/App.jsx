import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./components/SignIn";
import RootLayout from "./pages/Root";
import UserSignUpPage from "./pages/UserSignUp";
import { action as logoutAction } from "./pages/Logout";
import {
  loader as profileLoader,
  action as editingProfileAction,
} from "./pages/Profile";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profileLoader,
        action: editingProfileAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "signup",
        element: <UserSignUpPage />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
