import {
    BasicForm,
    ProcessingStatus,
    Image,
    NitrogenPrediction,
} from "@/types/models";

const BandTypes = [
    "Blue band",
    "Green Band",
    "Red Band",
    "NIR Band",
    "Red edge Band",
];

function defaultImages(): Image[] {
    return Array.from({ length: BandTypes.length }, () => null);
}

function defaultForm(): BasicForm {
    return {
        session_id: null,
        roi_coordinates: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            unit: "px",
        },
        data_iot: {
            nitrogen_hoped: 1.73,
            soil_humedity: 2,
            soil_temperature: 29,
            pH: 6.6,
            avg_spad: 8.33,
        },
    };
}

function defaultProcessingStatus(): ProcessingStatus {
    return [];
}

function defaultPrediction(): NitrogenPrediction {
    return 0;
}

export {
    BandTypes,
    defaultImages,
    defaultForm,
    defaultProcessingStatus,
    defaultPrediction,
};
