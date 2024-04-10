import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Clients from "../components/Clients/Clients";
import Billing from "../components/Billing/Billing";
import Orders from "../components/Orders/Orders";
import AccountSettings from "../components/Settings/AccountSettings.tsx/AccountSettings";
import Notifications from "../components/Settings/Notifications/Notifications";
import Support from "../components/Support/Support";

interface CustomRouteProps {
  path: string;
  component: React.ComponentType<any>;
  title?: string;
}

const routes: CustomRouteProps[] = [
  { path: "/", component: Dashboard, title: "Dashboard" },
  { path: "/clients", component: Clients, title: "Clients" },
  { path: "/orders", component: Orders, title: "Orders" },
  { path: "/products", component: Orders, title: "Products" },
  { path: "/billing", component: Billing, title: "Billing" },
  {
    path: "/account-settings",
    component: AccountSettings,
    title: "Account Settings",
  },
  { path: "/notifications", component: Notifications, title: "Notifications" },
  { path: "/support", component: Support, title: "Support" },
];

export default routes;
