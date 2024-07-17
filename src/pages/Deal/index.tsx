import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import { useState } from "react";
import { useGetDealsByFromUserUid } from "../../hooks/deal/useGetDealsByFromUserUid";
import { useGetDealsByToUserUid } from "../../hooks/deal/useGetDealsByToUserUid";

function Deal() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const [activeTab, setActiveTab] = useState("to");
  const { sendDealDatas, isLoading: isSendLoading } =
    useGetDealsByFromUserUid(userId);
  const { receivedDealDatas, isLoading: isReceivedLoading } =
    useGetDealsByToUserUid(userId);

  const tabs = [
    { name: "받은 거래", key: "to" },
    { name: "보낸 거래", key: "from" },
  ];

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <DealWrapper>
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
      <DealBody>
        {activeTab === "to" ? (
          <TabContent
            key="to"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            받은 거래
            {receivedDealDatas?.map(() => (
              <div>거래 내역</div>
            ))}
          </TabContent>
        ) : (
          <TabContent
            key="from"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            보낸 거래{" "}
            {sendDealDatas?.map(() => (
              <div>거래 내역</div>
            ))}
          </TabContent>
        )}
      </DealBody>
    </DealWrapper>
  );
}
const DealWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const DealBody = styled.div`
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

const TabContent = styled(motion.div)`
  width: 100%;
  top: 0;
  left: 0;
`;
export default Deal;
