import { apiClient, extractErrorMessage } from "../middelware/auth.interceptor";

export interface GeoJsonResponse {
    message: string;
    status: number;
    data: GeoJsonData;
}

export interface GeoJsonData {
    type: 'FeatureCollection';
    features: GeoJsonFeature[];
    size: number;
    page: number;
    totalPages: number;
    totalData: number;
}

export interface GeoJsonFeature {
    type: 'Feature';
    geometry: Geometry;
    properties: FeatureProperties;
}

export interface Geometry {
    type: 'Point';
    coordinates: [number, number];
    crs?: Crs;
}

export interface Crs {
    type: string;
    properties: {
        name: string;
    };
}

export interface FeatureProperties {
    uuid: string;
    name_place: string;
    description: string | null;
    kode_provinsi: string;
    nama_provinsi: string;
    kode_kabupaten: string;
    nama_kabupaten: string;
    uuid_user: string;
    createdAt: string;
    updatedAt: string;
}

export interface ParamsGetAllPlaces {
    search?: string;
    size?: number;
    page?: number;
}

export const homeService = {
    async getAllPlaces(payload?: ParamsGetAllPlaces): Promise<GeoJsonResponse> {
        try {
            const response = await apiClient.get<GeoJsonResponse>('/gis/point/get-all', { params: payload });
            console.log("response", response);
            return response.data;
        } catch (error: any) {
            throw new Error(extractErrorMessage(error));
        }
    }
}