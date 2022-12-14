import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import ForgetPassword from "../../pages/Authentication/ForgetPassword/ForgetPassword.js";
import Login from "../../pages/Authentication/Login/Login.js";
import ResetPassword from "../../pages/Authentication/ResetPassword/ResetPassword.js";
import CustomerDetailsPage from "../../pages/CustomerDetails/CustomerDetailsPage.js";
import Customers from "../../pages/Customers/Customers.js";
import Dashboard from "../../pages/dashbaord/index.js";
import Invoices from "../../pages/Invoices/Invoices.js";
import Profile from "../../pages/Profile/Profile.js";
import RecordItems from "../../pages/RecordItems/RecordItems.js";
import EditShipping from "../../pages/Shipping/EditShipping/EditShipping.js";
import NewShipping from "../../pages/Shipping/NewShipping/NewShipping.js";
import Shipping from "../../pages/Shipping/Shipping.js";
import DashboardHeader from "../shared/DashboardHeader/DashboardHeader.js";
import ScrollToTop from "../shared/ScrollToTop.js";
import PrivateRoute from "./PrivateRoute.js";

const PageRoutes = () => {
  const location = useLocation();

  const routes = [
    {
      id: 2,
      path: "/login",
      component: <Login />,
    },
    {
      id: 3,
      path: "/forget-password",
      component: <ForgetPassword />,
    },
    {
      id: 4,
      path: "/reset-password",
      component: <ResetPassword />,
    },
    {
      id: 5,
      path: "/",
      component: <Dashboard />,
    },
    {
      id: 6,
      path: "/customers",
      component: <Customers />,
    },
    {
      id: 7,
      path: "/record-items",
      component: <RecordItems />,
    },
    {
      id: 8,
      path: "/profile",
      component: <Profile />,
    },
    {
      id: 9,
      path: "/shipping",
      component: <Shipping />,
    },
    {
      id: 10,
      path: "/invoices",
      component: <Invoices />,
    },
    {
      id: 11,
      path: "/new-shipping",
      component: <NewShipping />,
    },
    {
      id: 12,
      path: "/edit-shipping/:shipment_uid",
      component: <EditShipping />,
    },
    {
      id: 13,
      path: "/customer/:customerId",
      component: <CustomerDetailsPage />,
    },
  ];

  let authPage = [
    "/login",
    "/forget-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <main className={`flex flex-col lg:flex-row px-5 ${!authPage ? 'bg-gray-50 pt-[4.5rem]' : ''}`}>
      <Toaster toastOptions={{
        success: {
          style: {
            background: 'white',
            color: 'green',
            border: '1px solid green',
            fontSize: '.8rem',
          },
        },
        error: {
          style: {
            fontSize: '.8rem',
            background: 'white',
            color: 'red',
            border: '1px solid red'
          },
        },
      }} />
      <div className={`${authPage ? "hidden" : ""}`}>
        <DashboardHeader />
      </div>
      <section className={`w-full min-h-screen container px-0 lg:px-10  mx-auto  `}>
        <ScrollToTop />
        <Routes>
          {routes.map((route) => (
            authPage ?
              <Route key={route.id} path={route.path} element={route.component} />
              :
              <Route key={route.id} path={route.path} element={<PrivateRoute />}>
                <Route path={route.path} element={route.component} />
              </Route>

          ))}
          <Route path="*" element={<h1>Not Found!</h1>} />
        </Routes>
      </section>
    </main>
  );
};

export default PageRoutes;
