import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import { useEffect, useState } from "react";
import { useGetDealsByFromUserUid } from "../../hooks/deal/useGetDealsByFromUserUid";
import { useGetDealsByToUserUid } from "../../hooks/deal/useGetDealsByToUserUid";
import ReceivedDealCard from "./ReceivedDealCard";
import SentDealCard from "./SentDealCard";
import ListEmpty from "../../components/mobile/ListEmpty";
import LoadingSpinner from "../../components/mobile/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import DealHeader from "../../components/mobile/headers/DealHeader";

function Deal() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const [query, setQuery] = useSearchParams();
  const type = query.get("type");

  const [activeTab, setActiveTab] = useState("received");
  const { sentDealDatas, isLoading: isSendLoading } =
    useGetDealsByFromUserUid(userId);
  const { receivedDealDatas, isLoading: isReceivedLoading } =
    useGetDealsByToUserUid(userId);
  const isSentEmpty = sentDealDatas?.length === 0 && !isSendLoading;
  const isReceivedtEmpty =
    receivedDealDatas?.length === 0 && !isReceivedLoading;

  const tabs = [
    { name: "받은 교환 신청", key: "received" },
    { name: "보낸 교환 신청", key: "sent" },
  ];

  useEffect(() => {
    const type = query.get("type");
    if (type === "sent") {
      setActiveTab("sent");
    } else {
      setActiveTab("received");
    }
  }, [query]);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    setQuery({ type: tabKey });
  };

  return (
    <DealWrapper>
      <DealHeader />
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
      <DealBody>
        {(isReceivedLoading || isSendLoading) && <LoadingSpinner />}
        {activeTab === "received" ? (
          <TabContent
            key="received"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isReceivedtEmpty ? (
              <ListEmpty>받은 교환 신청이 없습니다.</ListEmpty>
            ) : (
              receivedDealDatas?.map((receivedDeal) => {
                return (
                  <ReceivedDealCard
                    receivedDeal={receivedDeal}
                    key={receivedDeal.id}
                  />
                );
              })
            )}
          </TabContent>
        ) : (
          <TabContent
            key="sent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isSentEmpty ? (
              <ListEmpty>보낸 교환 신청이 없습니다.</ListEmpty>
            ) : (
              sentDealDatas?.map((sentDeal) => {
                return <SentDealCard sentDeal={sentDeal} key={sentDeal.id} />;
              })
            )}
          </TabContent>
        )}
      </DealBody>
    </DealWrapper>
  );
}
const DealWrapper = styled(PageWrapper)`
  padding-top: 84px;
`;
const DealBody = styled.div`
  padding: 0 10px;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 598px;

  height: 32px;
  top: 44px;
  position: fixed;
  background-color: #fff;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 6px 20px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  border-bottom: ${(props) =>
    props.$isActive ? "2px solid #10B981" : "2px solid #9CA3AF"};
  color: ${(props) => (props.$isActive ? "#10B981" : "#9CA3AF")};
`;

const TabContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
  left: 0;
`;
export default Deal;
