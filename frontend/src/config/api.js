const BASE_URL = import.meta.env.VITE_API_URL;
const CLOUDINERY_URI = import.meta.env.CLOUDINERY_URL;

export const API = {
  // Auth
  LOGIN:`${BASE_URL}/api/v1/admin/login`,
  LOGOUT:`${BASE_URL}/api/v1/admin/logout`,
  DELETEORDER:`${BASE_URL}/api/v1/admin/deleteOrder`,
  DELETEUSER:`${BASE_URL}/api/v1/admin/deleteUser`,
  USERS:`${BASE_URL}/api/v1/admin/users`,
  ORDERS:`${BASE_URL}/api/v1/admin/orders`,
  CHANGE_PASS:`${BASE_URL}/api/v1/admin/changePass`,

  // Meals
  MEALS:`${BASE_URL}/orders/availableMeals`,
  
};