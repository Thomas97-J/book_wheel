import styled from "styled-components";
import { PATH } from "../../../App";
import { NavLink, useLocation } from "react-router-dom";
import useUnreadMessageCounts from "../../../hooks/message/useUnreadMessageCounts";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import RedDot from "../../common/RedDot";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function BottomNavVer2() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const { unreadCounts } = useUnreadMessageCounts(userId);
  const [messageCount, setMessageCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (unreadCounts) {
      setMessageCount(
        Object.values(unreadCounts as object).reduce(
          (sum, value) => sum + value,
          0
        )
      );
      console.log("unreadCounts change");
    }
  }, [unreadCounts]);

  console.log("location", location);

  return (
    <BottomNavWrapper>
      <Background src="\images\bottom_nav_background.svg" />
      <LinkIcon
        key="main"
        to={PATH.main}
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.79999 21.6V14.2963C8.79999 13.6241 9.37307 13.0791 10.08 13.0791H13.92C14.6269 13.0791 15.2 13.6241 15.2 14.2963V21.6M11.2582 2.62524L2.9382 8.25176C2.60054 8.4801 2.39999 8.84976 2.39999 9.24378V19.7741C2.39999 20.7825 3.25961 21.6 4.31999 21.6H19.68C20.7404 21.6 21.6 20.7825 21.6 19.7741V9.24378C21.6 8.84976 21.3994 8.48011 21.0618 8.25176L12.7418 2.62524C12.2977 2.32491 11.7023 2.32491 11.2582 2.62524Z"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>홈</span>
      </LinkIcon>
      <LinkIcon
        key="rolling"
        to={PATH.rolling}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3219 15C20.0622 18.8327 16.4543 21.6 12.2 21.6C6.89807 21.6 2.6 17.3019 2.6 12C2.6 6.69806 6.89807 2.39999 12.2 2.39999C15.7534 2.39999 18.8558 4.33055 20.5157 7.19999M17.6 8.39999H22.4V3.59999"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>롤링</span>
      </LinkIcon>
      <ExchangeBg></ExchangeBg>
      <Exchange key="deal" to={PATH.deal}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99999 9.60002L2.39999 6.00002M2.39999 6.00002L5.99999 2.40002M2.39999 6.00002H21.6M18 14.4L21.6 18M21.6 18L18 21.6M21.6 18H2.39999"
            stroke="#F9FAFB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Exchange>
      <LinkIcon
        key="messages"
        to={PATH.messages}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {messageCount ? <NavRedDot>{messageCount}</NavRedDot> : ""}
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.89909 7.39999H15.0991M7.89909 12.2H12.0991M21.0991 11C21.0991 12.38 20.8079 13.692 20.2836 14.8779L21.1009 20.5991L16.198 19.3734C14.809 20.1545 13.2061 20.6 11.4991 20.6C6.19716 20.6 1.89909 16.3019 1.89909 11C1.89909 5.69806 6.19716 1.39999 11.4991 1.39999C16.801 1.39999 21.0991 5.69806 21.0991 11Z"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>메시지</span>
      </LinkIcon>
      <LinkIcon
        key="my"
        to={PATH.my}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.3995 21.6L20.3998 18.0003C20.4 16.012 18.7882 14.4 16.7998 14.4H7.20056C5.2125 14.4 3.60079 16.0115 3.60056 17.9996L3.60016 21.6M15.6002 5.99999C15.6002 7.98822 13.9884 9.59999 12.0002 9.59999C10.0119 9.59999 8.40016 7.98822 8.40016 5.99999C8.40016 4.01177 10.0119 2.39999 12.0002 2.39999C13.9884 2.39999 15.6002 4.01177 15.6002 5.99999Z"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>마이</span>
      </LinkIcon>
    </BottomNavWrapper>
  );
}
const BottomNavWrapper = styled.nav`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  background-color: white;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  width: 100vw;
  max-width: 600px;
  height: 68px;

  /* Default/green/500 */
  background: #f3f4f6;
`;
const Background = styled.img`
  position: fixed;
  bottom: -60px;
  left: 50%;

  z-index: -1;
  transform: translate(-50%, -50%);
`;
const NavRedDot = styled(RedDot)`
  width: 14px;
  height: 14px;
  font-size: 10px;
  right: -2px;
  top: -2px;
`;
const LinkIcon = styled(NavLink)<{ $isCurrentPath?: boolean }>`
  text-decoration: none;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  width: 60px;
  gap: 8px;

  span {
    display: none;
    font-size: 12px;
  }
  &.active {
    span {
      display: inline;
    }
    /* color: ${({ theme }) => theme.color.default_green}; */
    color: #10b981;
    svg {
      /* fill: ${({ theme }) => theme.color.default_green}; */
      path {
        stroke: #10b981;
      }
    }
  }
`;
const ExchangeBg = styled.div`
  width: 55px;
`;
const Exchange = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  box-shadow: 0px 10px 15px -3px #0000001a;
  background: #10b981;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -62%);
`;
export default BottomNavVer2;
