// Daily sales data (Today's hourly breakdown)
export const dailySalesData = [
  { time: "8AM", sales: 45000 },
  { time: "9AM", sales: 78000 },
  { time: "10AM", sales: 125000 },
  { time: "11AM", sales: 98000 },
  { time: "12PM", sales: 145000 },
  { time: "1PM", sales: 88000 },
  { time: "2PM", sales: 112000 },
  { time: "3PM", sales: 165000 },
  { time: "4PM", sales: 134000 },
  { time: "5PM", sales: 189000 },
  { time: "6PM", sales: 156000 },
];

// Weekly sales data
export const weeklySalesData = [
  { time: "Mon", sales: 450000 },
  { time: "Tue", sales: 380000 },
  { time: "Wed", sales: 520000 },
  { time: "Thu", sales: 410000 },
  { time: "Fri", sales: 680000 },
  { time: "Sat", sales: 890000 },
  { time: "Sun", sales: 320000 },
];

// Monthly sales data
export const monthlySalesData = [
  { time: "Week 1", sales: 1250000 },
  { time: "Week 2", sales: 1450000 },
  { time: "Week 3", sales: 1820000 },
  { time: "Week 4", sales: 2130000 },
];

// For analytics page - weekly performance
export const salesData = [
  { day: "Mon", sales: 450000, profit: 95000 },
  { day: "Tue", sales: 380000, profit: 78000 },
  { day: "Wed", sales: 520000, profit: 112000 },
  { day: "Thu", sales: 410000, profit: 88000 },
  { day: "Fri", sales: 680000, profit: 145000 },
  { day: "Sat", sales: 890000, profit: 198000 },
  { day: "Sun", sales: 320000, profit: 68000 },
];

// Daily data for analytics
export const dailyAnalyticsData = [
  { time: "8AM", sales: 45000, profit: 9500 },
  { time: "9AM", sales: 78000, profit: 16400 },
  { time: "10AM", sales: 125000, profit: 26300 },
  { time: "11AM", sales: 98000, profit: 20600 },
  { time: "12PM", sales: 145000, profit: 30500 },
  { time: "1PM", sales: 88000, profit: 18500 },
  { time: "2PM", sales: 112000, profit: 23500 },
  { time: "3PM", sales: 165000, profit: 34700 },
  { time: "4PM", sales: 134000, profit: 28200 },
  { time: "5PM", sales: 189000, profit: 39700 },
  { time: "6PM", sales: 156000, profit: 32800 },
];

// Monthly data for analytics
export const monthlyAnalyticsData = [
  { time: "Week 1", sales: 1250000, profit: 262500 },
  { time: "Week 2", sales: 1450000, profit: 304500 },
  { time: "Week 3", sales: 1820000, profit: 382200 },
  { time: "Week 4", sales: 2130000, profit: 447300 },
];

const hourlyData = dailySalesData;

const categoryData = [
  { name: "Phones", value: 45, color: "hsl(160, 60%, 45%)" },
  { name: "Accessories", value: 30, color: "hsl(230, 45%, 50%)" },
  { name: "Gadgets", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 10, color: "hsl(280, 60%, 55%)" },
];

const topProducts = [
  { name: "Samsung Galaxy A54", sold: 45, revenue: 8325000 },
  { name: "Wireless Earbuds Pro", sold: 89, revenue: 2225000 },
  { name: "iPhone Charger Cable", sold: 156, revenue: 702000 },
  { name: 'Laptop Sleeve 15"', sold: 34, revenue: 408000 },
  { name: "Wireless Mouse", sold: 67, revenue: 502500 },
];

export { hourlyData, categoryData, topProducts };