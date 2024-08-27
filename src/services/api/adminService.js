import instance from "../axiosInstance";

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

export const editDataAdmin = (id, data) => {
  const apiUrl = `${baseUrl}/admin-management/admins/${id}`;
  return instance
    .patch(apiUrl, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const detailAdmin = (id) => {
  const apiUrl = `${baseUrl}/admin-management/admins/${id}`;
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

export const getAllAdmins = (
  search,
  sortBy,
  pageSize,
  pageNumber,
  startDateJoined,
  endDateJoined
) => {
  const url = `${baseUrl}/admin-management/admins`;
  const apiUrl = buildUrl(url, {
    search,
    sortBy,
    pageSize,
    pageNumber,
    startDateJoined,
    endDateJoined,
  });
  // console.log("API URL: ", apiUrl);
  return instance
    .get(apiUrl)
    .then((response) => {
      console.log("response: ", response);
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getAllCompaniesMaster = () => {
  const apiUrl = `${baseUrl}/company-management/companies`;
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

export const deleteDataAdmin = (id) => {
  const apiUrl = `${baseUrl}/admin-management/admins/${id}/delete`;
  return instance
    .patch(apiUrl, { is_delete: true })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
