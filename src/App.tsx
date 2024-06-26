import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import My from "./pages/My";
import ProtectRoute from "./components/ProtectRoute";
import UnProtectRoute from "./components/UnProtectRoute";
import NotFound from "./pages/NotFound";
import InfoFixSection from "./pages/UserInfoEdit";
import BottomNav from "./components/mobile/BottomNav";
import Profile from "./pages/Profile";
import PasswordChange from "./pages/PasswordChange";
import Fallback from "./components/mobile/Fallback";

const queryClient = new QueryClient();

const Signin = React.lazy(() => import("./pages/Signin"));
const Explore = React.lazy(() => import("./pages/Explore"));
const PostEdit = React.lazy(() => import("./pages/PostEdit"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));

export const PATH = {
  main: "",
  signIn: "/signin",
  signUp: "/signup",
  my: "/my",
  infoFix: "/my/edit",
  notFound: "*",
  profile: "/profile",
  explore: "/explore",
  passwordChange: "/my/change_password",
  postEdit: "/post/postEdit",
  postDetail: "/post/detail",
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Fallback />}>
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
              <Route
                path={PATH.infoFix}
                element={<ProtectRoute component={InfoFixSection} />}
              />
              <Route
                path={PATH.explore}
                element={<ProtectRoute component={Explore} />}
              />
              <Route
                path={PATH.passwordChange}
                element={<ProtectRoute component={PasswordChange} />}
              />
              <Route
                path={PATH.postEdit}
                element={<ProtectRoute component={PostEdit} />}
              />
              <Route path={PATH.postDetail} element={<PostDetail />} />

              <Route path={PATH.profile} element={<Profile />} />
              <Route path={PATH.notFound} element={<NotFound />} />
            </Routes>
            <BottomNav />
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
