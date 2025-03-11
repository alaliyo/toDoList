export function reductionDate(date) {
  const year = date.getFullYear().toString().slice(2); // 년도
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
  const day = date.getDate().toString().padStart(2, '0'); // 일
  const hours = date.getHours().toString().padStart(2, '0');  // 시간
  const minutes = date.getMinutes().toString().padStart(2, '0');  // 분

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
