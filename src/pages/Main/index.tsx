import { useAuth } from "../../components/AuthContext";
import { auth } from "../../firebase";

import { Link } from "react-router-dom";

function Main() {
  const { currentUser, isLoading } = useAuth();

  return (
    <div>
      <Link to="/signup">회원가입</Link>
      <Link to="/my">마이페이지</Link>
      <h2>User Profile</h2>
      <p>Email: {currentUser?.email}</p>
      <p>UID: {currentUser?.uid}</p>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Main;
