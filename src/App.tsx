import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import My from "./pages/My";
import ProtectRoute from "./components/ProtectRoute";
import { AuthProvider } from "./components/AuthContext";
import UnProtectRoute from "./components/UnProtectRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const PATH = {
  main: "",
  signIn: "/signin",
  signUp: "/signup",
  my: "/my",
  notFound: "*",
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.main} element={<Main />} />
            <Route
              path={PATH.signIn}
              element={<UnProtectRoute component={Signin} />}
            />
            <Route
              path={PATH.signUp}
              element={<UnProtectRoute component={Signup} />}
            />
            <Route path={PATH.my} element={<ProtectRoute component={My} />} />
            <Route path={PATH.notFound} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
