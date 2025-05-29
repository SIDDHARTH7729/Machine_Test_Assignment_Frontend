// layout.tsx
import React from "react";
import Navbar from "@/components/NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;
