import {
    BasicForm,
    ImageType,
    NitrogenPrediction,
    ProcessingStatus,
} from "@/types/models";
import api from "./api";

async function uploadRequest(
    multispectral: File[],
    refranctacy: File[]
): Promise<string> {
    const formData = new FormData();

    multispectral.forEach((file) => {
        formData.append("bands", file);
    });

    refranctacy.forEach((file) => {
        formData.append("panels", file);
    });

    const { data } = await api.post("/upload-images", formData);
    return data.session_id;
}

function processRequest(session_id: string): Promise<void> {
    return api.post(`/${session_id}/process`);
}

async function statusRequest(session_id: string): Promise<ProcessingStatus> {
    const { data } = await api.get(`/${session_id}/status`);
    return data;
}

async function predictRequest(
    session_id: string,
    form: any
): Promise<NitrogenPrediction> {
    const { data } = await api.post(`/${session_id}/predict`, form);
    return parseFloat(data);
}

function getUrlImage(
    session_id: string,
    type: ImageType,
    band: string,
    crop?: BasicForm["roi_coordinates"]
): string {
    const url = `${api.getUri()}/${session_id}/storage/${type}/${band}`;

    if (crop) {
        const { x, y, width, height } = crop;
        return `${url}?crop&x=${x}&y=${y}&width=${width}&height=${height}`;
    }

    return url;
}

export {
    uploadRequest,
    processRequest,
    statusRequest,
    predictRequest,
    getUrlImage,
};
