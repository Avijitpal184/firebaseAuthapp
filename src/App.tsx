import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Home from "./pages/Home/Home"
import ForgotPass from "./pages/ForgetPass/ForgotPass"
import "./App.css"


const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/signup", element: <SignUp/>},
  {path: "/login", element: <Login/>},
  {path: "/dashboard", element: <Dashboard/>},
  {path: "/forgotpassword", element: <ForgotPass/>}
])


const App = () => {
  return (
      <RouterProvider router={router}/>
  )
}

export default App