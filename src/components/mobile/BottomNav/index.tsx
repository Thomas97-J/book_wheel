import styled from "styled-components";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import useUnreadMessageCounts from "../../../hooks/message/useUnreadMessageCounts";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import RedDot from "../../common/RedDot";

function BottomNav() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const { unreadCounts, isLoading, error } = useUnreadMessageCounts(userId);
  const [messageCount, setMessageCount] = useState(0);
  useEffect(() => {
    if (unreadCounts) {
      setMessageCount(
        Object.values(unreadCounts as object).reduce(
          (sum, value) => sum + value,
          0
        )
      );
      console.log("unreadCounts");
    }
  }, [unreadCounts]);
  return (
    <BottomNavWrapper>
      <LinkIcon to={PATH.main}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
        </svg>
      </LinkIcon>
      <LinkIcon to={PATH.rolling}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M16.242 17.242a6.04 6.04 0 0 1-1.37 1.027l.961 1.754a8.068 8.068 0 0 0 2.569-2.225l-1.6-1.201a5.938 5.938 0 0 1-.56.645zm1.743-4.671a5.975 5.975 0 0 1-.362 2.528l1.873.701a7.977 7.977 0 0 0 .483-3.371l-1.994.142zm1.512-2.368a8.048 8.048 0 0 0-1.841-2.859l-1.414 1.414a6.071 6.071 0 0 1 1.382 2.146l1.873-.701zm-8.128 8.763c-.047-.005-.094-.015-.141-.021a6.701 6.701 0 0 1-.468-.075 5.923 5.923 0 0 1-2.421-1.122 5.954 5.954 0 0 1-.583-.506 6.138 6.138 0 0 1-.516-.597 5.91 5.91 0 0 1-.891-1.634 6.086 6.086 0 0 1-.247-.902c-.008-.043-.012-.088-.019-.131A6.332 6.332 0 0 1 6 13.002V13c0-1.603.624-3.109 1.758-4.242A5.944 5.944 0 0 1 11 7.089V10l5-4-5-4v3.069a7.917 7.917 0 0 0-4.656 2.275A7.936 7.936 0 0 0 4 12.999v.009c0 .253.014.504.037.753.007.076.021.15.03.227.021.172.044.345.076.516.019.1.044.196.066.295.032.142.065.283.105.423.032.112.07.223.107.333.026.079.047.159.076.237l.008-.003A7.948 7.948 0 0 0 5.6 17.785l-.007.005c.021.028.049.053.07.081.211.272.433.538.681.785a8.236 8.236 0 0 0 .966.816c.265.192.537.372.821.529l.028.019.001-.001a7.877 7.877 0 0 0 2.136.795l-.001.005.053.009c.201.042.405.071.61.098.069.009.138.023.207.03a8.038 8.038 0 0 0 2.532-.137l-.424-1.955a6.11 6.11 0 0 1-1.904.102z"></path>
        </svg>
      </LinkIcon>
      <LinkIcon to={PATH.messages}>
        {messageCount ? <NavRedDot>{messageCount}</NavRedDot> : ""}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path>
          <circle cx="9.5" cy="11.5" r="1.5"></circle>
          <circle cx="14.5" cy="11.5" r="1.5"></circle>
        </svg>
      </LinkIcon>
      <LinkIcon to={PATH.my}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
        </svg>
      </LinkIcon>
    </BottomNavWrapper>
  );
}
const BottomNavWrapper = styled.div`
  width: 100vw;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  background-color: white;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.1);
`;

const NavRedDot = styled(RedDot)`
  width: 14px;
  height: 14px;
  font-size: 10px;
  right: -2px;
  top: -2px;
`;
const LinkIcon = styled(Link)`
  position: relative;
`;

export default BottomNav;
