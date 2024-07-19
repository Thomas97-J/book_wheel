import { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import UserExplore from "./UserExplore";
import PostExplore from "./PostExplore";
import BookExplore from "./BookExplore";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import { Helmet } from "react-helmet-async";

function Explore() {
  const [query, setQuery] = useSearchParams();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const type = query.get("type");
    if (type === "posts" || type === "books") {
      setActiveTab(type);
    } else {
      setActiveTab("users");
    }
  }, [query]);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    setQuery({ type: tabKey });
  };

  return (
    <ExploreWrapper>
      <Helmet>
        <title>책바퀴 - 검색</title>
      </Helmet>
      <DefaultHeader />
      <TabBar>
        <Tab
          $isActive={activeTab === "users"}
          onClick={() => handleTabClick("users")}
        >
          사용자
        </Tab>
        <Tab
          $isActive={activeTab === "posts"}
          onClick={() => handleTabClick("posts")}
        >
          포스트
        </Tab>
        <Tab
          $isActive={activeTab === "books"}
          onClick={() => handleTabClick("books")}
        >
          도서
        </Tab>
      </TabBar>
      <Content>
        {activeTab === "users" && <UserExplore />}
        {activeTab === "posts" && <PostExplore />}
        {activeTab === "books" && <BookExplore />}
      </Content>
    </ExploreWrapper>
  );
}

const ExploreWrapper = styled(PageWrapper)`
  padding-top: 150px;
  position: relative;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  height: 43px;
  position: fixed;
  top: 50px;
  background: #fff;
  z-index: 100;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${(props) => (props.$isActive ? "2px solid black" : "none")};
  background: #fff;
`;

const Content = styled.div`
  position: relative;
  min-height: 200px; /* or any suitable value */
`;

export default Explore;
