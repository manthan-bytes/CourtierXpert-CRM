import axios from "axios";
import { API_URL, API_URL_STAGE } from "../core/constants/constants";
axios.defaults.baseURL = API_URL_STAGE
export async function createUser(payload:any) {
    try {
      const response = await axios.post(`user/create`, payload);
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

  export async function updateUser(id:number , payload:any) {
    try {
      const response = await axios.put(`user/update/${id}`, payload);
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


  export async function sendEmail(payload:any) {
    try {
      const response = await axios.post(`user/sendEmail`, payload);
      if (response && response.status === 201) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:59 ~ sendEmail ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

  export async function chatbot(payload:any) {
    try {
      const response = await axios.post(`user/chatbot`, payload);
      if (response && response.status === 201) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: login.service.tsx:74 ~ chatbot ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }