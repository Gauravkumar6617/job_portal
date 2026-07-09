import { Link } from "react-router-dom";
import { Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Logo from "../common/Logo.jsx";
import { APP_NAME, ROUTES } from "../../utils/constants.js";

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About us", to: ROUTES.ABOUT },
      { label: "Contact", to: ROUTES.CONTACT },
    ],
  },
  {
    heading: "Job Seekers",
    links: [
      { label: "Create account", to: ROUTES.REGISTER },
      { label: "Sign in", to: ROUTES.LOGIN },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", to: ROUTES.PRIVACY },
      { label: "Terms of service", to: ROUTES.TERMS },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            {APP_NAME} connects job seekers with the right opportunities and
            helps employers find great talent, faster.
          </p>
          <a
            href="mailto:hello@jobnest.example"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600"
          >
            <Mail className="h-4 w-4" />
            hello@jobnest.example
          </a>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.heading}>
            <h3 className="text-sm font-semibold text-slate-900">
              {group.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100">
        <div className="section flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {year} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with care for job seekers and employers alike.
          </p>
        </div>
      </div>
    </footer>
  );
}
