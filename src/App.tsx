import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Signup from "./pages/Signup";
import Main from "./pages/Main";
import My from "./pages/My";
import ProtectRoute from "./HOCs/ProtectRoute";
import UnProtectRoute from "./HOCs/UnProtectRoute";
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
const Follow = React.lazy(() => import("./pages/Follow"));
const Rolling = React.lazy(() => import("./pages/Rolling"));
const Messages = React.lazy(() => import("./pages/Messages"));
const Bookshelf = React.lazy(() => import("./pages/Bookshelf"));
const BookEdit = React.lazy(() => import("./pages/Bookshelf/BookEdit"));
const BookDetail = React.lazy(() => import("./pages/Bookshelf/BookDetail"));
export const PATH = {
  main: "",
  signIn: "/signin",
  signUp: "/signup",
  my: "/my",
  infoFix: "/my/edit",
  passwordChange: "/my/change_password",
  profile: "/profile",
  follow: "/profile/follow",
  explore: "/explore",
  postEdit: "/post/postEdit",
  postDetail: "/post/detail",
  rolling: "/rolling",
  messages: "/messages",
  bookshelf: "/bookshelf",
  bookEdit: "/bookshelf/bookEdit",
  bookDetail: "/bookshelf/detail",

  notFound: "*",
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
              <Route path={PATH.follow} element={<Follow />} />
              <Route
                path={PATH.rolling}
                element={<ProtectRoute component={Rolling} />}
              />
              <Route
                path={PATH.messages}
                element={<ProtectRoute component={Messages} />}
              />
              <Route
                path={PATH.bookEdit}
                element={<ProtectRoute component={BookEdit} />}
              />
              <Route
                path={PATH.bookDetail}
                element={<ProtectRoute component={BookDetail} />}
              />
              <Route path={PATH.bookshelf} element={<Bookshelf />} />
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
