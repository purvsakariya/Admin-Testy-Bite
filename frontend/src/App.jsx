import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./store/Context.jsx";
import { UserContextProvider } from "./store/UserProgressCtx.jsx";
import { lazy, Suspense } from "react";
import { ProtectedRoute, PublicRoute } from './Components/ProtectedRoute.jsx'

// Import All Components Using Lazy Loading.
const AvailableMeals = lazy(() => import('./Components/AvailableMeals'))
const Cart = lazy(() => import("./Components/Cart.jsx"));
const Checkout = lazy(() => import("./Components/Checkout.jsx"));
const Header = lazy(() => import("./Components/Header"));
const OrderPlaced = lazy(() => import("./Components/OrderPlaced.jsx"));
const LogIn = lazy(() => import("./Components/LogIn.jsx"));
const SignIn = lazy(() => import("./Components/SignIn.jsx"));
import Layout from './Components/Layout.jsx'
import NotFound from './Components/NotFound.jsx'
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
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <SignIn />
          </Suspense>
        </PublicRoute>)

      },
      {
        path: "/login",
        element: (<PublicRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
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
        path: "/meals",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <AvailableMeals />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/cart",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <Cart />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/checkout",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <Checkout />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/orderplaced",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <OrderPlaced />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/ordersList",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <OrdersList />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/usersList",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <UsersList />
          </Suspense>
        </ProtectedRoute>)
      },
      {
        path: "/changePass",
        element: (<ProtectedRoute>
          <Suspense fallback={<p className="loading">Loading.....</p>}>
            <ChangePass />
          </Suspense>
        </ProtectedRoute>)
      },
    ]
  },

])

function App() {
  return (
    <UserContextProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </UserContextProvider>
  );
}

export default App;
