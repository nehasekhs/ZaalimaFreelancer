import React from "react";
export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center">© {new Date().getFullYear()} GigConnect</div>
    </footer>
  );
}
