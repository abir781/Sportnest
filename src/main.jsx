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
import Managemember from './pages/ManageMembers.jsx';
import ManageBookings from './pages/ManageBookings.jsx';
import ManageCoupon from './pages/ManageCoupon.jsx';
import ManageCourts from './pages/ManageCourts.jsx';
import MakeAnnouncement from './pages/MakeAnnouncement.jsx';
import Managebookingapproval from './pages/Managebookingapproval.jsx';
import Forbidden from './pages/Forbidden.jsx';
import Adminroute from './Route/Adminroute.jsx';
import ManageMembers from './pages/ManageMembers.jsx';
import UserandMemberroute from './Route/UserandMemberroute.jsx';
import Memberroute from './Route/Memberroute.jsx';
import PaymentHistory from './pages/Paymenthistory.jsx';
import Errorpage from './pages/Errorpage.jsx';
import OverviewPage from './pages/Overviewpage.jsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<Errorpage></Errorpage>,
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
        path:'/forbidden',
        Component:Forbidden,

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
        path:'/dashboard/overview',
        element:<OverviewPage></OverviewPage>
          
        
      },
      {
        path:'/dashboard/pending-bookings',
        element:<UserandMemberroute>
          <Pendingbookings></Pendingbookings>
        </UserandMemberroute>
      },
      {
        path:'/dashboard/announcements',
        element:<UserandMemberroute>
          <Announcement></Announcement>
        </UserandMemberroute>

      },
      {
        path:'/dashboard/approvedbookings',
        element:<Memberroute>
          <Approvedbookings></Approvedbookings>
        </Memberroute>
      },
      {
         path:'/dashboard/paymenthistory',
         element:<Memberroute>
          <PaymentHistory></PaymentHistory>
         </Memberroute>

      },
      {
         path:'/dashboard/confirmedbooking',
         element:<Memberroute>
          <Confirmedbooking></Confirmedbooking>
         </Memberroute>
      },
        {
         path:'/dashboard/allusers',
         element:<Adminroute>
          <Allusers></Allusers>
         </Adminroute>,
        
      },
        {
         path:'/dashboard/managemember',
         element:<Adminroute>
          <ManageMembers></ManageMembers>
         </Adminroute>
        
      },
         {
         path:'/dashboard/managebookings',
        
        element:<Adminroute>
          <ManageBookings></ManageBookings>
        </Adminroute>
      },
         {
         path:'/dashboard/managecoupon',
         element:<Adminroute>
          <ManageCoupon></ManageCoupon>
         </Adminroute>,
        
      },
          {
         path:'/dashboard/managecourts',
         element:<Adminroute>
          <ManageCourts></ManageCourts>
         </Adminroute>,
      },
         {
         path:'/dashboard/makeannouncement',
         element:<Adminroute>
          <MakeAnnouncement></MakeAnnouncement>
         </Adminroute>,
      },
          {
         path:'/dashboard/managebookingapproval',
         element:<Adminroute><Managebookingapproval></Managebookingapproval></Adminroute>,
        
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
