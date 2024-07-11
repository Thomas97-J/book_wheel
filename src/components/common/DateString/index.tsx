import styled from "styled-components";
import formatRelativeTime from "../../../utils/formatRelativeTime";

const DateStringWrapper = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

function DateString({ date }: { date: Timestamp | undefined }) {
  const formattedDate = formatRelativeTime(date);

  return <DateStringWrapper>{formattedDate}</DateStringWrapper>;
}

export default DateString;
