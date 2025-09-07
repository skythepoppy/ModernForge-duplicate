import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always at top */}
      <Navigation />

      {/* Main content */}
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
