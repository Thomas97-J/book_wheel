import dayjs from "dayjs";

export default function formatRelativeTime(createdAt: Timestamp | undefined) {
  const createdUnix = createdAt?.seconds ?? 0;
  if (createdUnix === 0) {
    return "";
  }
  const createdDate = dayjs.unix(createdUnix);

  // 현재 시간
  const now = dayjs();

  // 날짜가 다른 경우 하루 이전 글로 판별
  if (!createdDate.isSame(now, "day")) {
    return createdDate.format("YYYY-MM-DD");
  }

  // 시간 차이 계산
  const diffInMinutes = now.diff(createdDate, "minute");
  const diffInHours = now.diff(createdDate, "hour");
  if (diffInMinutes < 1) {
    return `방금 전`;
  }

  // 1시간 이내이면 분 단위로 표기
  if (diffInMinutes < 60) {
    return `${diffInMinutes} 분 전`;
  }

  // 당일 날짜이면 시간 단위로 표기
  return `${diffInHours} 시간 전`;
}
