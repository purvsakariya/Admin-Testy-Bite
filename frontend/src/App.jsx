import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./store/Context.jsx";
import { lazy, Suspense } from "react";
import { ProtectedRoute, PublicRoute } from './Components/ProtectedRoute.jsx'
import Loader from "./Components/Loader.jsx";

// Import All Components Using Lazy Loading.
const AvailableMeals = lazy(() => import('./Components/AvailableMeals'));
const Header = lazy(() => import("./Components/Header"));
const LogIn = lazy(() => import("./Components/LogIn.jsx"));
import Layout from './Components/Layout.jsx'
import NotFound from './Components/NotFound.jsx'
import DashBoard from "./Components/DashBoard.jsx";
const OrdersList = lazy(() => import("./Components/OrdersList.jsx"));
const UsersList = lazy(() => import("./Components/UsersList.jsx"));
const ChangePass = lazy(() => import("./Components/ChangePass.jsx"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

      //Public Routes
      {
        index: true,
        element: (<PublicRoute>
          <Suspense fallback={<Loader message="Loading Portal..." />}>
            <LogIn />
          </Suspense>
        </PublicRoute>)

      },
      {
        path: "*",
        element: (<PublicRoute>
          <NotFound />
        </PublicRoute>)
      },

      // authorization User Only
      {
        path: "/dashBoard",
        element: (<ProtectedRoute>
          <Suspense fallback={<Loader message="Loading Dashboard..." />}>
            <DashBoard />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/meals",
        element: (<ProtectedRoute>
          <Suspense fallback={<Loader message="Loading Menu Management..." />}>
            <AvailableMeals />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/ordersList",
        element: (<ProtectedRoute>
          <Suspense fallback={<Loader message="Loading Orders list..." />}>
            <OrdersList />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/usersList",
        element: (<ProtectedRoute>
          <Suspense fallback={<Loader message="Loading Users list..." />}>
            <UsersList />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/changePass",
        element: (<ProtectedRoute>
          <Suspense fallback={<Loader message="Securing Connection..." />}>
            <ChangePass />
          </Suspense>
        </ProtectedRoute>)
      },
    ]
  },

])

function App() {
  return (
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
  );
}

export default App;
