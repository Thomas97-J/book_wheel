import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectRoute from "./HOCs/ProtectRoute";
import UnProtectRoute from "./HOCs/UnProtectRoute";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/mobile/BottomNav";
import Fallback from "./components/mobile/Fallback";

const My = React.lazy(() => import("./pages/My"));
const Explore = React.lazy(() => import("./pages/Explore"));
const PostEdit = React.lazy(() => import("./pages/Main/PostEdit"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));
const Profile = React.lazy(() => import("./pages/Profile"));
const PasswordChange = React.lazy(() => import("./pages/PasswordChange"));
const UserInfoEdit = React.lazy(() => import("./pages/UserInfoEdit"));
const Follow = React.lazy(() => import("./pages/Follow"));

const Rolling = React.lazy(() => import("./pages/Rolling"));
const Messages = React.lazy(() => import("./pages/Messages"));
const MessageDetail = React.lazy(
  () => import("./pages/Messages/MessageDetail")
);
const Bookshelf = React.lazy(() => import("./pages/Bookshelf"));
const BookEdit = React.lazy(() => import("./pages/Bookshelf/BookEdit"));
const BookDetail = React.lazy(() => import("./pages/Bookshelf/BookDetail"));
const LikePosts = React.lazy(() => import("./pages/My/LikePosts"));
const LikeBooks = React.lazy(() => import("./pages/My/LikeBooks"));

const UserPosts = React.lazy(() => import("./pages/Profile/UserPost"));

export const PATH = {
  main: "",
  signIn: "/signin",
  signUp: "/signup",
  my: "/my",
  infoFix: "/my/edit",
  passwordChange: "/my/change_password",
  likedPost: "/my/likedPost",
  likedBook: "/my/likedBook",
  profile: "/profile",
  follow: "/profile/follow",
  userPost: "/profile/userPost",
  explore: "/explore",
  postEdit: "/post/postEdit",
  postDetail: "/post/detail",
  rolling: "/rolling",
  messages: "/messages",
  messageDetail: "/messages/detail",

  bookshelf: "/bookshelf",
  bookEdit: "/bookshelf/bookEdit",
  bookDetail: "/bookshelf/detail",

  notFound: "*",
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
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
            path={PATH.likedPost}
            element={<ProtectRoute component={LikePosts} />}
          />
          <Route
            path={PATH.likedBook}
            element={<ProtectRoute component={LikeBooks} />}
          />
          <Route
            path={PATH.infoFix}
            element={<ProtectRoute component={UserInfoEdit} />}
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
          <Route
            path={PATH.userPost}
            element={<ProtectRoute component={UserPosts} />}
          />
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
            path={PATH.messageDetail}
            element={<ProtectRoute component={MessageDetail} />}
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
      </Suspense>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
