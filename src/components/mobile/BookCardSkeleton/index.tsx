import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function BookCardSkeleton() {
  return (
    <BookCardWapper>
      <Skeleton style={{ marginRight: "10px" }} height={100} width={80} />
      <CardContent>
        <Skeleton style={{ marginBottom: "4px" }} height={28} width={160} />
        <Skeleton style={{ marginBottom: "4px" }} height={16} width={120} />
        <Skeleton
          style={{ marginBottom: "2px" }}
          height={18}
          width={200}
          count={2}
        />
      </CardContent>
    </BookCardWapper>
  );
}

const BookCardWapper = styled.div`
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 0 10px;
  height: 120px;
  text-decoration: none;
  color: #000;
`;

const CardContent = styled.div`
  padding: 4px 0;
  display: flex;
  flex-direction: column;
`;

export default BookCardSkeleton;
