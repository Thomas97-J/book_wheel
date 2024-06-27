import React from "react";
import { Route, Navigate, RouteProps, PathRouteProps } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface UnProtectRouteProps extends PathRouteProps {
  component: React.ComponentType<any>;
}

function UnProtectRoute({
  component: Component,
  ...rest
}: UnProtectRouteProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Component {...rest} />;
  }
  return <Navigate to={"/"} replace />;
}

export default UnProtectRoute;
