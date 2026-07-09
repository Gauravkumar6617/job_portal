import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage.jsx";
import TermsPage from "../pages/TermsPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import RegisterPage from "../features/auth/pages/RegisterPage.jsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
    </Routes>
  );
}
