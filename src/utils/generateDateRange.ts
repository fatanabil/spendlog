export const generateDateRange = (startDate: string, endDate: string) => {
  const dates: string[] = [];

  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
