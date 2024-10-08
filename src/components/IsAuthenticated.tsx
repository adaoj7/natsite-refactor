﻿import React from "react";
import Spacer from "./Spacer";
import Auth from "./Auth";

interface IsAuthenticatedProps {
  isAuthenticated: boolean;
}

const IsAuthenticated: React.FC<IsAuthenticatedProps> = () => {
  return (
    <>
      <div className="text-center">
        <Spacer />
        <h2 className="text-2xl">Please log in to view this page</h2>
        <Auth />
      </div>
    </>
  );
};

export default IsAuthenticated;
