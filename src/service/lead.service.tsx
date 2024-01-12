import axios from "axios";
import { API_URL, API_URL_STAGE } from "../core/constants/constants";
axios.defaults.baseURL = API_URL_STAGE
export async function createLead(payload:any) {
    try {
      const response = await axios.post(`lead/create`, payload);
      if (response && response.status === 201) {
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: lead.service.tsx:12 ~ createLead ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

  export async function updateLead(id:number , payload:any) {
    console.log("🚀 ~ file: lead.service.tsx:20 ~ updateLead ~ payload:", payload)
    try {
      const response = await axios.put(`lead/update/${id}`, payload);
      if (response && response.status === 200) {
        console.log("🚀 ~ file: lead.service.tsx:26 ~ updateLead ~ response:", response)
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: lead.service.tsx:27 ~ updateLead ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }

  export async function updateImage(id:number , payload:any) {
    console.log("🚀 ~ file: lead.service.tsx:20 ~ updateLead ~ payload:", payload)
    try {
      const response = await axios.put(`lead/updateImage/${id}`, payload,
      {
        headers: {
            "Content-Type": "multipart/form-data"
        }
       }
      );
      if (response && response.status === 200) {
        console.log("🚀 ~ file: lead.service.tsx:26 ~ updateLead ~ response:", response)
        return response.data;
      } else {
        throw response;
      }
    } catch (e) {
    console.log("🚀 ~ file: lead.service.tsx:27 ~ updateLead ~ e:", e)
    //   console.log(e?.response?.data?.error || "Something went wrong!");
      throw e;
    }
  }



  