import styled from "styled-components";
import DropDown from "../../../common/DropDown";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";
import useDeleteBook from "../../../../hooks/books/useDeleteBook";
import Header from "../../../../assets/styles/Header";

function BookHeader({ user, bookData }) {
  const deleteMutation = useDeleteBook();
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "삭제",
      clickFunction: async () => {
        console.log("삭제 클릭");
        await deleteMutation.mutateAsync(bookData.id);
        navigate(-1);
      },
    },
    {
      label: "수정",
      clickFunction: () => {
        console.log("수정 클릭", bookData);
        navigate(`${PATH.bookEdit}?no=${bookData.index}`);
      },
    },
  ];

  return (
    <BookHeaderWrapper>
      {user?.uid === bookData.uid ? (
        <DropDown options={dropDownOptions} buttonInner={"드롭다운"} />
      ) : (
        ""
      )}
    </BookHeaderWrapper>
  );
}

const BookHeaderWrapper = styled(Header)`
  button {
    width: 100px;
    margin: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default BookHeader;
