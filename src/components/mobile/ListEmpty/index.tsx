import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";

function ListEmpty({ children }: { children: any }) {
  return (
    <ListEmptyWrapper>
      <IconWrapper>
        <Icon src={imgPaths.hamsterWithBook} alt="Logo" />
      </IconWrapper>
      <Message>{children}</Message>
    </ListEmptyWrapper>
  );
}

const ListEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
  color: #555;
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export default ListEmpty;
