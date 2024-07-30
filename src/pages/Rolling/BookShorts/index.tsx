import styled from "styled-components";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import LikeBtnBook from "../../../components/mobile/LikeBtnBook";
import { useAuth } from "../../../context/AuthContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
function BookShorts({ book }: { book: Book }) {
  const { currentUser } = useAuth();
  // const x = useMotionValue(0);
  // const background = useTransform(
  //   x,
  //   [-100, 0, 100],
  //   ["#ff008c", "#fff", "rgb(230, 255, 0)"]
  // );

  // return (
  //   <motion.div style={{ background }}>
  //     <motion.div
  //       drag="x"
  //       dragConstraints={{ left: 0, right: 200 }}
  //       style={{ x }}
  //     >
  //       {/* <Icon x={x} /> */}
  //       <BookShortsWapper>
  //         <GoToBookDetail to={`${PATH.bookDetail}?no=${book.index}`}>
  //           {book.photoUrl && (
  //             <ThumbnailImage src={book.photoUrl} alt={book.title} />
  //           )}
  //           <CardContent>
  //             <Title>{book.title}</Title>
  //             <Author>{book.author}</Author>
  //             {/* <Genres>{book.genres.join(", ")}</Genres> */}
  //             <Content>{book.content}</Content>
  //           </CardContent>
  //         </GoToBookDetail>
  //         <LikeBtnBook userId={currentUser?.uid ?? ""} bookId={book.id ?? ""} />
  //       </BookShortsWapper>
  //     </motion.div>
  //   </motion.div>
  // );
  return (
    <BookShortsWapper>
      <GoToBookDetail to={`${PATH.bookDetail}?no=${book.index}`}>
        {book.photoUrl && (
          <ThumbnailImage src={book.photoUrl} alt={book.title} />
        )}
        <CardContent>
          <Title>{book.title}</Title>
          <Author>{book.author}</Author>
          {/* <Genres>{book.genres.join(", ")}</Genres> */}
          <Content>{book.content}</Content>
        </CardContent>
      </GoToBookDetail>
      <LikeBtnBook userId={currentUser?.uid ?? ""} bookId={book.id ?? ""} />
    </BookShortsWapper>
  );
}

const BookShortsWapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  height: calc(100vh - 50px); /* 바텀 바의 높이를 제외한 전체 화면 높이 */
`;
const GoToBookDetail = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: cover;
  margin-bottom: 20px;
`;

const CardContent = styled.div`
  padding: 4px 16px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin: 0 0 8px 0;
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 8px 0;
`;

const Genres = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 8px 0;
`;

const Content = styled.pre`
  font-size: 14px;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export default BookShorts;
