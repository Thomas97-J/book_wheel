import styled from "styled-components";
import formatRelativeTime from "../../../utils/formatRelativeTime";

const DateStringWrapper = styled.div<{ $fontSize: string }>`
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "0.8rem")};
  color: #666;
`;

function DateString({
  date,
  fontSize,
}: {
  date: Timestamp | undefined;
  fontSize?: string;
}) {
  const formattedDate = formatRelativeTime(date);

  return (
    <DateStringWrapper $fontSize={fontSize}>{formattedDate}</DateStringWrapper>
  );
}

export default DateString;
