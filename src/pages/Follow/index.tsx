import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserFollowers } from "../../hooks/follow/useGetUserFollowers";
import { useGetUserFollowing } from "../../hooks/follow/useGetUserFollowing";
import UserCard from "../../components/mobile/UserCard";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import ListEmpty from "../../components/mobile/ListEmpty";

function Follow() {
  const [query, setQuery] = useSearchParams();
  const [activeTab, setActiveTab] = useState("followers");
  const userNickname = query.get("user") || "";
  const { followerData, isLoading: isFollowerLoading } =
    useGetUserFollowers(userNickname);
  const { followingData, isLoading: isFollowingLoading } =
    useGetUserFollowing(userNickname);

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
      <DefaultHeader />
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
      <FollowBody>
        <Content>
          <AnimatePresence>
            {activeTab === "followers" ? (
              <TabContent
                key="followers"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isFollowerLoading ? (
                  <>로딩중입니다.</>
                ) : followerData?.length ? (
                  followerData?.map((user: UserData) => (
                    <UserCard key={user.id} userInfo={user} />
                  ))
                ) : (
                  <ListEmpty>팔로우하는 유저가 없습니다.</ListEmpty>
                )}
              </TabContent>
            ) : (
              <TabContent
                key="following"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isFollowingLoading ? (
                  <>로딩중입니다.</>
                ) : followingData?.length ? (
                  followingData?.map((user: UserData) => {
                    return <UserCard key={user.id} userInfo={user} />;
                  })
                ) : (
                  <ListEmpty>팔로잉하는 유저가 없습니다.</ListEmpty>
                )}
              </TabContent>
            )}
          </AnimatePresence>
        </Content>
      </FollowBody>
    </FollowWrapper>
  );
}
const FollowWrapper = styled(PageWrapper)``;
const FollowBody = styled.div`
  padding: 0 10px;
`;
const TabBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
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
  width: 100%;
  top: 0;
  left: 0;
`;
export default Follow;
