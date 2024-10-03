import React from "react";

interface LTWProps {
  children: React.ReactNode;
  title: string;
}

export function LTW({ children, title }: LTWProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-2xl">{title}</h1>
        {children}
      </div>
    </div>
  );
}
