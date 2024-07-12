import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserCardSkeleton() {
  return (
    <UserCardWrapper>
      <GoToProfile>
        <Skeleton
          style={{ marginRight: "10px" }}
          height={60}
          width={60}
          circle={true}
        />
        <div>
          <Skeleton style={{ marginBottom: "4px" }} height={20} width={120} />
          <Skeleton height={12} width={160} />
        </div>
      </GoToProfile>
    </UserCardWrapper>
  );
}

const UserCardWrapper = styled.div`
  display: flex;
  height: 68;
  padding: 4px 0;
`;
const GoToProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const Nickname = styled.strong`
  font-weight: bold;
`;

const FollowBtnWrapper = styled.div`
  position: absolute;
  right: 10px;
`;
export default UserCardSkeleton;
