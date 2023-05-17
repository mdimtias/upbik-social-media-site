import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import About from "../Pages/About/About/About"
import Error from "../Pages/SharePage/Error"
import Home from "../Pages/Home/Home/Home"
import Registration from "../Pages/Registration/Registration"
import LogIn from "../Pages/LogIn/LogIn"
import Profile from "../Pages/Profile/Profile"
import EditProfileModal from "../Pages/Profile/EditProfileModal/EditProfileModal"
import Media from "../Pages/Media/Media"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import PostDetail from "../Pages/PostDetail/PostDetail"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/registration",
                element: <Registration></Registration>
            },
            {
                path: "/login",
                element: <LogIn></LogIn>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/media",
                element: <PrivateRoute><Media></Media></PrivateRoute>
            },
            {
                path: "/post/:id",
                element: <PostDetail></PostDetail>
            },
            {
                path: "/edit-profile",
                element: <EditProfileModal></EditProfileModal>
            },
        ]
    }
])