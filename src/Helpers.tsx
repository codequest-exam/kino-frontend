const formatStartTime = (startTime: string) => {
  const date = new Date(startTime);
  const formattedStartTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return formattedStartTime;
};

const formatStartDate = (startTime: string) => {
  const date = new Date(startTime);
  const formattedStartDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
  return formattedStartDate;
};

export { formatStartTime, formatStartDate };
