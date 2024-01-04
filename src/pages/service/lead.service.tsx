import axios from "axios";
import { API_URL_STAGE,API_URL } from "../../core/constants/constants";
axios.defaults.baseURL = API_URL_STAGE
export async function getAllLeads(payload:any) {
    try {
      const response = await axios.post(`lead/admin/getAllLead`, payload);
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
