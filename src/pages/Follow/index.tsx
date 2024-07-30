import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "../../components/mobile/UserCard";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import ListEmpty from "../../components/mobile/ListEmpty";
import { Helmet } from "react-helmet-async";
import useInfiniteFollowers from "../../hooks/follow/useInfiniteFollowers";
import useInfiniteFollowing from "../../hooks/follow/useInfiniteFollowing";
import LoadingSpinner from "../../components/mobile/LoadingSpinner";

function Follow() {
  const [query, setQuery] = useSearchParams();
  const [activeTab, setActiveTab] = useState("followers");
  const userNickname = query.get("user") || "";
  const {
    ref: followerRef,
    followerData,
    isLoading: isFollowerLoading,
  } = useInfiniteFollowers(userNickname);
  const {
    ref: followingRef,
    followingData,
    isLoading: isFollowingLoading,
  } = useInfiniteFollowing(userNickname);
  const isFollowerEmpty =
    followerData?.pages[0]?.followers.length === 0 && !isFollowerLoading;
  const isFollowingEmpty =
    followingData?.pages[0]?.following.length === 0 && !isFollowingLoading;

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
      <Helmet>
        <title>책바퀴 - 팔로우</title>
      </Helmet>
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
        {(isFollowingLoading || isFollowingLoading) && <LoadingSpinner />}
        <AnimatePresence>
          {activeTab === "followers" ? (
            <TabContent
              key="followers"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {followerData?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                  {page?.followers.map((user: any) => (
                    <UserCard key={user.id} userInfo={user} />
                  ))}
                </div>
              ))}
              {isFollowerEmpty && (
                <ListEmpty>팔로우하는 유저가 없습니다.</ListEmpty>
              )}
              <div ref={followerRef}></div>
            </TabContent>
          ) : (
            <TabContent
              key="following"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {followingData?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                  {page?.following.map((user: any) => (
                    <UserCard key={user.id} userInfo={user} />
                  ))}
                </div>
              ))}
              {isFollowingEmpty && (
                <ListEmpty>팔로잉하는 유저가 없습니다.</ListEmpty>
              )}
              <div ref={followingRef}></div>
            </TabContent>
          )}
        </AnimatePresence>
      </FollowBody>
    </FollowWrapper>
  );
}
const FollowWrapper = styled(PageWrapper)`
  padding-top: 96px;
`;
const FollowBody = styled.div`
  padding: 0 10px;
  position: relative;
  min-height: 200px; /* or any suitable value */
`;
const TabBar = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 49px;
  width: 100%;
  max-width: 598px;
  background-color: #fff;
  z-index: 1001;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 6px 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;

  cursor: pointer;
  font-size: 14px;
  border-bottom: ${(props) =>
    props.$isActive ? "2px solid #10B981" : "2px solid #9CA3AF"};
  color: ${(props) => (props.$isActive ? "#10B981" : "#9CA3AF")};
`;

const TabContent = styled(motion.div)`
  width: 100%;
  top: 0;
  left: 0;
`;
export default Follow;
