import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AdminPanel from '../pages/AdminPanel'
import AllOrder from '../pages/AllOrder'
import AllProducts from '../pages/AllProducts'
import AllUsers from '../pages/AllUsers'
import Cancel from '../pages/Cancel'
import Cart from '../pages/Cart'
import CategoryProduct from '../pages/CategoryProduct'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import Home from '../pages/Home'
import Login from '../pages/Login'
import OrderPage from '../pages/OrderPage'
import ProductDetails from '../pages/ProductDetails'
import SearchProduct from '../pages/SearchProduct'
import SignUp from '../pages/SignUp'
import Success from '../pages/Success'
import UpdatePassword from '../pages/UpdatePassword'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassowrd />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "update-password",
                element: <UpdatePassword />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'success',
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: 'order',
                element: <OrderPage />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: "all-orders",
                        element: <AllOrder />
                    }
                ]
            },
        ]
    }
])


export default router