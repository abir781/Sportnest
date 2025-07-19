import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Authprovider from './Context/Authprovider.jsx';
import Privateroute from './Route/Privateroute.jsx';
import Check from './pages/Check.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Courtpage from './pages/Courtpage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Pendingbookings from './pages/Pendingbookings.jsx';
import Announcement from './pages/Announcement.jsx';
import Approvedbookings from './pages/Approvedbookings.jsx';
import Payment from './pages/Payment.jsx';
import Paymenthistory from './pages/Paymenthistory.jsx';

import Confirmedbooking from './pages/Confirmedbooking.jsx';
import Allusers from './pages/Allusers.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component:Home,
      },
      {
        path:'/login',
        Component:Login,
      },
      {
        path:'/register',
        Component:Register,

      },
      {
        path:'/check',
        element:<Privateroute>
          <Check></Check>
        </Privateroute>

      },
      {
        path:'/courtpage',
        Component:Courtpage,
      },
      {
         path:'/dashboard',
         
        element:<Privateroute>
          <Dashboard></Dashboard>
        </Privateroute>,
         children:[
      {
        index:true,
        Component:Profile,
      },
      {
        path:'/dashboard/pending-bookings',
        Component:Pendingbookings,
      },
      {
        path:'/dashboard/announcements',
        Component:Announcement,

      },
      {
        path:'/dashboard/approvedbookings',
        Component: Approvedbookings,
      },
      {
         path:'/dashboard/paymenthistory',
        Component: Paymenthistory,

      },
      {
         path:'/dashboard/confirmedbooking',
        Component: Confirmedbooking,
      },
        {
         path:'/dashboard/allusers',
        Component: Allusers,
      },
      {
         
        path:'/dashboard/payment/:id',
        Component: Payment,
      
      }
    ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>

      <RouterProvider router={router} />

    </Authprovider>
    </QueryClientProvider>
    
   
  </StrictMode>,
)
