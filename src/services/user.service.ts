import { apiClient, extractErrorMessage } from "../middelware/auth.interceptor";

export interface UserDetailProfile {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  link_pict?: string;
  detail?: any[];
}

export interface ProfileResponseData {
  message: string;
  data: UserDetailProfile;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  link_pict?: string;
}

export interface AddAddressUserPayload {
  negara?: string;
  address?: string;
  kota?: string;
  provinsi?: string;
  kode_pos?: string;
}

export interface ParamsHistoryLoginUser {
  search?: string;
  size?: number | string;
  page?: number | string;
  sort?: "terbaru" | "terlama" | "DESC" | "ASC" | string;
  order?: "desc" | "asc" | "DESC" | "ASC" | string;
}

export interface GetHistoryLoginUserPayload {
  uuid?: string;
  uuid_user?: string;
  email?: string;
  ip_address?: string;
  device?: string;
  browser?: string;
  os?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  lat?: string | number;
  lng?: string | number;
  address?: string;
  user_agent?: string;
  status?: string;
  failure_reason?: string | null;
  login_at?: string;
}

export interface LoginHistoryPaginationData {
  data: GetHistoryLoginUserPayload[];
  size: number;
  page: number;
  totalPages: number;
  totalData: number;
}

export interface LoginHistoryPagination {
  page: number;
  size: number;
  totalPages: number;
  totalData: number;
}

export interface GetHistoryLoginUserResponse {
  status: string;
  data: LoginHistoryPaginationData;
}

export const userService = {
  async profileDetail(): Promise<UserDetailProfile> {
    try {
      const response = await apiClient.get<ProfileResponseData>("/user/address");
      console.log("respon user service: ", response);
      return response.data.data;
    } catch (error: any) {
      throw new Error(extractErrorMessage(error));
    }
  },

  async updateDetail(payload: UpdateUserPayload): Promise<string> {
    try {
      const response = await apiClient.put("/users/update", payload);
      return response.data.message;
    } catch (error: any) {
      throw new Error(extractErrorMessage(error));
    }
  },

  async addAddressUser(payload: AddAddressUserPayload): Promise<string> {
    try {
      const response = await apiClient.post("/user/create-address", payload);
      return response.data.message;
    } catch (error: any) {
      throw new Error(extractErrorMessage(error));
    }
  },

  async getHistoryLoginUser(payload?: ParamsHistoryLoginUser): Promise<GetHistoryLoginUserResponse> {
    try {
      const response = await apiClient.get<GetHistoryLoginUserResponse>("/users/login-history", {
        params: payload,
      });
      console.log("respon get history login user: ", response);
      return response.data;
    } catch (error: any) {
      throw new Error(extractErrorMessage(error));
    }
  },
};
