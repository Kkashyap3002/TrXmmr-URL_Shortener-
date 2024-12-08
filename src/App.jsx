// IMPORTANT: Avoid naming conflicts between custom components and library imports.
// The 'Link' component from './pages/link' was renamed to 'CustomLink' to prevent conflict 
// with 'Link' from 'react-router-dom'.
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import './App.css'
import AppLayout from "./layouts/app-layout";
import LandingPage from './pages/landing';
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import Redirectlink from './pages/redirect-link';
import CustomLink from './pages/link';
// Use 'RouterLink' for navigation links from 'react-router-dom'.
// Use 'CustomLink' for the custom component defined in './pages/link'.


const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    children: [
      {
        path : '/',
        element: <LandingPage/> 

      },
      {
        path : '/dashboard',
        element: <Dashboard/>

      },
      {
        path : '/auth',
        element: <Auth/>

      },
      {
        path : "/link/:id",   //:id - variable for dynamic URL
        element: <CustomLink/>

      },
      {
        path: "/:id",
        element: <Redirectlink/>,
      }

    ]
  }
])
function App() {

  return <RouterProvider router = {router} />;
}

export default App;
