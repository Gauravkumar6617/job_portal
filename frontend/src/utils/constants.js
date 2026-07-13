export const APP_NAME = "JobNest";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  NOT_FOUND: "*",
};

export const NAV_LINKS = [
  { label: "Home", to: ROUTES.HOME },
  { label: "About", to: ROUTES.ABOUT },
  { label: "Contact", to: ROUTES.CONTACT },
];
