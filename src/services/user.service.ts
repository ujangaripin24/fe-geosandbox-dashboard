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
  negara?: string,
  address?: string,
  kota?: string,
  provinsi?: string,
  kode_pos?: string,
}

export const userService = {
  async profileDetail(): Promise<UserDetailProfile> {
    try {
      const response = await apiClient.get<ProfileResponseData>('/user/address')
      console.log("respon user service: ", response)
      return response.data.data
    } catch (error: any) {
      throw new Error(extractErrorMessage(error))
    }
  },

  async updateDetail(payload: UpdateUserPayload): Promise<string> {
    try {
      const response = await apiClient.put('/users/update', payload)
      return response.data.message
    } catch (error: any) {
      throw new Error(extractErrorMessage(error))
    }
  },

  async addAddressUser(payload: AddAddressUserPayload): Promise<string> {
    try {
      const response = await apiClient.post('/user/create-address', payload);
      return response.data.message
    } catch (error: any) {
      throw new Error(extractErrorMessage(error))
    }
  }
}