export const formatDate = (dateString: string | null) => {
  if (dateString === null) {
    return "Present";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
  return formattedDate;
};
