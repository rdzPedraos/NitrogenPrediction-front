import { Crop } from "react-image-crop";

type Image = File | null;

type BasicForm = {
    session_id: string | null;

    roi_coordinates: Crop;

    data_iot: {
        soil_humedity: number;
        soil_temperature: number;
        pH: number;
        avg_spad: number;
    };
};

type ProcessingStatus = { key: string; label: string; status: boolean }[];
type ImageType = "histograms" | "images";

type NitrogenPrediction = {
    nitrogen: number;
};

export type {
    Image,
    ImageType,
    ProcessingStatus,
    BasicForm,
    NitrogenPrediction,
};
