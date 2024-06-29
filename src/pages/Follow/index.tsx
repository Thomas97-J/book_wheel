import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserFollowers } from "../../hooks/users/useGetUserFollowers";
import { useAuth } from "../../context/AuthContext";
import { useGetUserFollowing } from "../../hooks/users/useGetUserFollowing";
import UserCard from "../../components/mobile/UserCard";

function Follow() {
  const [query, setQuery] = useSearchParams();
  const [activeTab, setActiveTab] = useState("followers");
  const userNickname = query.get("user") || "";
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const { followerData } = useGetUserFollowers(uid);
  const { followingData } = useGetUserFollowing(uid);

  const tabs = [
    { name: "팔로워", key: "followers" },
    { name: "팔로잉", key: "following" },
  ];

  useEffect(() => {
    const type = query.get("type");
    if (type === "following") {
      setActiveTab("following");
    } else {
      setActiveTab("followers");
    }
  }, [query]);

  useEffect(() => {
    console.log("followerData", followerData);
    console.log("followingData", followingData);

    return () => {};
  }, [followerData, followingData]);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    setQuery({ type: tabKey, user: userNickname });
  };

  return (
    <FollowWrapper>
      <TabBar>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            $isActive={activeTab === tab.key}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.name}
          </Tab>
        ))}
      </TabBar>
      <Content>
        <AnimatePresence>
          {activeTab === "followers" ? (
            <TabContent
              key="followers"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {followerData?.length ? (
                followerData?.map((user: UserData) => (
                  <UserCard key={user.id} userInfo={user} />
                ))
              ) : (
                <div>팔로우 하는 유저가 없습니다.</div>
              )}
            </TabContent>
          ) : (
            <TabContent
              key="following"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {followingData?.length ? (
                followingData?.map((user: UserData) => {
                  console.log(user.id);
                  return <UserCard key={user.id} userInfo={user} />;
                })
              ) : (
                <div>팔로잉하는 유저가 없습니다.</div>
              )}
            </TabContent>
          )}
        </AnimatePresence>
      </Content>
    </FollowWrapper>
  );
}
const FollowWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${(props) => (props.$isActive ? "2px solid black" : "none")};

  &:hover {
    color: gray;
  }
`;

const Content = styled.div`
  position: relative;
  min-height: 200px; /* or any suitable value */
`;

const TabContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
export default Follow;
