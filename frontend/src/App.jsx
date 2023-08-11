import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./components/SignIn";
import RootLayout from "./pages/Root";
import UserSignUpPage from "./pages/UserSignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // {
      //   index: true,
      // },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "signup",
        element: <UserSignUpPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
