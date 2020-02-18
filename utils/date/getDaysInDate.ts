/** 从日期中获取当月天数 */
export default function getDaysInDate(date: Date): number[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  // 31天
  const thirtyOneDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  // 30天
  const thirty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  // 29天
  const twentyNine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  // 28天
  const twentyEight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return thirtyOneDays;
    case 1:
      if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return twentyNine;
      } else {
        return twentyEight;
      }
    case 3:
    case 5:
    case 8:
    case 10:
      return thirty;
    default:
      return [];
  }
}