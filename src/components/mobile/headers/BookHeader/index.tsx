import styled from "styled-components";
import DropDown from "../../../common/DropDown";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";
import useDeleteBook from "../../../../hooks/books/useDeleteBook";
import Header from "../../../../assets/styles/Header";
import ThreeDot from "../../../common/ThreeDotIcon";

function BookHeader({ user, bookData }: { user: any; bookData: any }) {
  const deleteMutation = useDeleteBook();
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "삭제",
      clickFunction: async () => {
        console.log("삭제 클릭");
        await deleteMutation.mutateAsync(bookData.id ?? "");
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
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
        </svg>
      </button>
      {user?.uid === bookData.uid ? (
        <DropDown
          options={dropDownOptions}
          buttonInner={<ThreeDot />}
          isRightSide={true}
        />
      ) : (
        ""
      )}
    </BookHeaderWrapper>
  );
}

const BookHeaderWrapper = styled(Header)`
  button {
    border: none;
  }
`;

export default BookHeader;
