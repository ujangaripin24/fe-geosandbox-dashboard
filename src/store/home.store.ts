import { create } from "zustand";
import { homeService, type GeoJsonResponse, type ParamsGetAllPlaces } from "../services/home.service";

export interface PaginationPlace {
    size: number;
    page: number;
    totalPages: number;
    totalData: number;
}

interface HomeState {
    placeData: GeoJsonResponse | null;
    paramsPlace: ParamsGetAllPlaces;
    paginationPlace: PaginationPlace;
    isLoading: boolean;
    error: string | null;

    setPlaceData: (data: GeoJsonResponse | null) => void;
    setParamsPlace: (params: ParamsGetAllPlaces) => void;
    setPaginationPlace: (pagination: PaginationPlace) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;

    getAllPlaces: (customParams?: ParamsGetAllPlaces) => Promise<GeoJsonResponse>;
}


export const useHomeStore = create<HomeState>((set, get) => ({
    placeData: null,
    paramsPlace: { search: "", size: 10, page: 1 },
    paginationPlace: { size: 10, page: 1, totalPages: 1, totalData: 0 },
    isLoading: false,
    error: null,

    setPlaceData: (data: GeoJsonResponse | null) => set({ placeData: data }),
    setParamsPlace: (params: ParamsGetAllPlaces) => set({ paramsPlace: params }),
    setPaginationPlace: (pagination: PaginationPlace) => set({ paginationPlace: pagination }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),

    getAllPlaces: async (customParams) => {
        set({ isLoading: true, error: null });
        try {
            const activeParams = customParams ? { ...get().paramsPlace, ...customParams } : get().paramsPlace;
            const response = await homeService.getAllPlaces(activeParams);
            const resData = response.data;
            set({
                placeData: response,
                paramsPlace: activeParams,
                paginationPlace: {
                    page: Number(resData?.page) || 1,
                    size: Number(resData?.size) || 10,
                    totalPages: Number(resData?.totalPages) || 1,
                    totalData: Number(resData?.totalData) || 0,
                },
                isLoading: false,
                error: null
            });
            return response;
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil data", isLoading: false });
            throw error;
        }
    }
}))
