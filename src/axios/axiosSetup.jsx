
import {axiosInstance, axiosProduct} from "./axios"
import {store} from "../redux/store"
import { signOut } from "../redux/actions/auth";
const axiosSetup=()=>{
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log(error.response)
        originalRequest._retry = true;
        
          await store.dispatch(signOut());
            
      }
      return Promise.reject(error);
    }
  );
  axiosProduct.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
          await store.dispatch(signOut());
            
      }
      return Promise.reject(error);
    }
  );
}




export default axiosSetup
