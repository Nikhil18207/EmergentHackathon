const API_BASE = 'http://localhost:5000/api';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    count?: number;
    error?: string;
}

// Garments API
export const garmentsApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE}/garments`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getById: async (id: string) => {
        const res = await fetch(`${API_BASE}/garments/${id}`);
        return res.json() as Promise<ApiResponse<any>>;
    },

    getByCategory: async (category: string) => {
        const res = await fetch(`${API_BASE}/garments/category/${category}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getBySubcategory: async (subcategory: string) => {
        const res = await fetch(`${API_BASE}/garments/subcategory/${subcategory}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    }
};

// Materials API
export const materialsApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE}/materials`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getById: async (id: string) => {
        const res = await fetch(`${API_BASE}/materials/${id}`);
        return res.json() as Promise<ApiResponse<any>>;
    },

    getSuitableFor: async (garmentType: string) => {
        const res = await fetch(`${API_BASE}/materials/suitable/${garmentType}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getByType: async (type: string) => {
        const res = await fetch(`${API_BASE}/materials/type/${type}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    }
};

// Features API
export const featuresApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE}/features`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getById: async (id: string) => {
        const res = await fetch(`${API_BASE}/features/${id}`);
        return res.json() as Promise<ApiResponse<any>>;
    },

    getForGarment: async (garmentId: string) => {
        const res = await fetch(`${API_BASE}/features/garment/${garmentId}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    },

    getByCategory: async (category: string) => {
        const res = await fetch(`${API_BASE}/features/category/${category}`);
        return res.json() as Promise<ApiResponse<any[]>>;
    }
};

// Combined API export
export const api = {
    garments: garmentsApi,
    materials: materialsApi,
    features: featuresApi
};

export default api;
