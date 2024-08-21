import axios from "axios";

// Fungsi untuk menambah admin baru
export default async function addNewAdmin({ payload }) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:8080/admin-management/admins",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error adding new admin:", error);
    throw error;
  }
}

// Fungsi untuk mengubah foto admin
export async function changeAdminPhoto(idAdmin, photo) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `http://localhost:8080/admin-management/admins/photo/${idAdmin}`,
      { profile_picture: photo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error changing admin photo:", error);
    throw error;
  }
}
