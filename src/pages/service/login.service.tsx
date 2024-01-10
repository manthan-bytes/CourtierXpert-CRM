import axios from "axios";
import { API_URL_STAGE,API_URL } from "../../core/constants/constants";
axios.defaults.baseURL = API_URL_STAGE
export async function login(payload:any) {
    try {
      const response = await axios.post(`auth/login`, payload);
      if (response && response.status === 201) {
        console.log("🚀 ~ file: login.service.tsx:8 ~ login ~ response:", response)
        return response.data;
      } else {
        throw response.data;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:12 ~ createUser ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }
  

  export async function getAllUsers(payload:any) {
    try {
      const response = await axios.post(`user/admin/getAllUser`, payload);
      if (response && response.status === 201) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:12 ~ createUser ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

  export async function deleteUser(payload:any) {
    try {
      const response = await axios.delete(`user/admin/delete/`+payload);
      if (response && response.status === 200) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:12 ~ createUser ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

  export async function getUser(payload:any) {
    try {
      const response = await axios.get(`user/getUserByEmail/${payload}`);
      if (response && response.status === 200) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:27 ~ getUser ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

