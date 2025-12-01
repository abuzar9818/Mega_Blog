import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo width="140px" />
            <span className="text-xs text-slate-500">
              A simple, Appwrite-powered place to share your thoughts.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <Link
              to="/all-posts"
              className="hover:text-blue-300 transition-colors"
            >
              Browse posts
            </Link>
            <Link
              to="/add-post"
              className="hover:text-blue-300 transition-colors"
            >
              Write a post
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] sm:text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MegaBlog. All rights reserved.</p>
          <p>
            Built with React, Tailwind, and Appwrite.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;