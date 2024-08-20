import instance from "./axiosInstance";

const baseUrl = import.meta.env.VITE_API_URL;

export const buildUrl = (base, params) => {
  let url = base + "?";
  for (const key in params) {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  }
  // Remove the trailing '&'
  url = url.slice(0, -1);
  return url;
};

export const editDataAdmin = (id, payload) => {
  const apiUrl = `${baseUrl}/admin-management/admins/${id}`;
  return instance
    .put(apiUrl, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const editPassword = (id, password) => {
  const apiUrl = `${baseUrl}/account/superadmin/change-password-admin/${id}`;
  return instance
    .patch(apiUrl, { password: password })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getAllAdmins = (search, sortBy, pageSize, pageNumber) => {
  const url = `${baseUrl}/admin-management/admins`;
  const apiUrl = buildUrl(url, { search, sortBy, pageSize, pageNumber });
  return instance
    .get(apiUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
