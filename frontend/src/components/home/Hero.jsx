import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, Sparkles } from "lucide-react";
import { ROUTES } from "../../utils/constants.js";

export default function Hero() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(ROUTES.REGISTER, {
      state: { intent: "search", keyword, location },
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="section relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Smarter job matching, powered by AI
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl animate-slide-up">
            Find a job that
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              actually fits you
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 animate-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            Create a profile once, and let {""}
            <span className="font-semibold text-slate-800">JobNest</span>{" "}
            connect you with roles that match your skills — or find the
            talent your team needs.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 animate-slide-up sm:flex-row sm:items-center"
            style={{ animationDelay: "160ms" }}
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full border-none bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="hidden h-6 w-px bg-slate-200 sm:block" />
            <div className="flex flex-1 items-center gap-2 border-t border-slate-100 px-3 pt-3 sm:border-t-0 sm:pt-0">
              <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or remote"
                className="w-full border-none bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <button type="submit" className="btn-primary sm:px-6">
              <Search className="h-4 w-4" />
              Search jobs
            </button>
          </form>

          <p
            className="mt-4 text-sm text-slate-500 animate-fade-in"
            style={{ animationDelay: "220ms" }}
          >
            New here?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Create a free account
            </Link>{" "}
            to start applying.
          </p>
        </div>
      </div>
    </section>
  );
}
