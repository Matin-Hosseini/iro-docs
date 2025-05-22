const formatDate = (uDate: any, option: any) => {
  let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
  return date;
};

export const addDays = (date: any, days: any) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

export const addMonths = (date: any, months: any) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);

  return result;
};

export const getDate = (date: any) => {
  return {
    day: formatDate(date, { day: "2-digit" }),
    month: formatDate(date, { month: "2-digit" }),
    monthTitle: formatDate(date, { month: "long" }),
    year: formatDate(date, { year: "numeric" }),
    dayWeek: formatDate(date, { weekday: "long" }),
    getCompleteFormat() {
      return `${this.year}/${this.month}/${this.day}`;
    },
  };
};
