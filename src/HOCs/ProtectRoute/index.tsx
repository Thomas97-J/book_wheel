import { Route, Navigate, RouteProps, PathRouteProps } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Fallback from "../../components/mobile/Fallback";

interface ProtectedRouteProps extends PathRouteProps {
  component: React.ComponentType<any>;
}

function ProtectRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Fallback />;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <Component {...rest} />;
}

export default ProtectRoute;
