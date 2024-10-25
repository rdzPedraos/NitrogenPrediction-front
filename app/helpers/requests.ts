import api from "./api";

async function uploadRequest(
    multispectral: File[],
    refranctacy: File[]
): Promise<string> {
    const formData = new FormData();

    multispectral.forEach((file) => {
        formData.append("multispectral", file);
    });

    refranctacy.forEach((file) => {
        formData.append("refranctacy", file);
    });

    const { data } = await api.post("/upload-images", formData);
    return data.session_id;
}

function processRequest(session_id: string) {
    return api.post(`/${session_id}/process`);
}

function statusRequest(session_id: string) {
    return api.get(`/${session_id}/status`);
}

function predictRequest(session_id: string, data: any) {
    return api.post(`/${session_id}/predict`, data);
}

export { uploadRequest, processRequest, statusRequest, predictRequest };
