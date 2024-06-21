import React from "react";
import { Route, Navigate, RouteProps, PathRouteProps } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface ProtectedRouteProps extends PathRouteProps {
  component: React.ComponentType<any>;
}

function ProtectRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <Component {...rest} />;
}

export default ProtectRoute;
