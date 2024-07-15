import styled from "styled-components";

function DefaultPopup({
  setIsPopupOn,
  title,
  content,
}: {
  setIsPopupOn: (bool: boolean) => void;
  title: string;
  content: string;
}) {
  return (
    <Overlay
      onClick={(e) => {
        e.stopPropagation();
        setIsPopupOn(false);
      }}
    >
      <PopupContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsPopupOn(false);
          }}
        >
          X
        </CloseButton>
        <Content>
          <h2>{title}</h2>
          <p>{content}</p>
        </Content>
      </PopupContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.2;
  }
`;

export default DefaultPopup;
