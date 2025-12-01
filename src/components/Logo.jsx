import React from "react";

function Logo({ width = "140px" }) {
  return (
    <div
      style={{ width }}
      className="flex items-center gap-2 font-bold text-xl text-white"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
        M
      </span>
      <span className="tracking-wide">
        Mega<span className="text-blue-200">Blog</span>
      </span>
    </div>
  );
}

export default Logo;