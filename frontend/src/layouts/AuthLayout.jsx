import { Outlet } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Logo from "../components/common/Logo.jsx";

const highlights = [
  "Apply to jobs in a few clicks",
  "Track every application in one place",
  "Get matched with roles that fit your skills",
];

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="mb-10" />
          <Outlet />
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Your next career move starts here.
          </h2>
          <p className="mt-4 max-w-md text-brand-100">
            Join a growing community of job seekers and employers building
            better career journeys together.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-200" />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
