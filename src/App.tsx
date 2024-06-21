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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/signin"
              element={<UnProtectRoute component={Signin} />}
            />
            <Route
              path="/signup"
              element={<UnProtectRoute component={Signup} />}
            />
            <Route path="/my" element={<ProtectRoute component={My} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
