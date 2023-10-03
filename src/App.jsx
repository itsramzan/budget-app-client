import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Layout from "./components/layout/Layout";
import PublicOutlet from "./components/outlet/PublicOutlet";
import PrivateOutlet from "./components/outlet/PrivateOutlet";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import SendOTP from "./pages/SendOTP";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/*" element={<PublicOutlet />}>
              <Route path="register" element={<Register />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="send-otp" element={<SendOTP />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route path="/*" element={<PrivateOutlet />}>
              <Route path="profile" element={<Profile />} />
              <Route path="budget" element={<Budget />} />
            </Route>
          </Routes>
        </Layout>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
