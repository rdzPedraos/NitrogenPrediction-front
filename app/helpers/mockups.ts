import { BasicForm, ProcessingStatus, Image } from "@/types/models";

const BandTypes = [
    "Blue band",
    "Green Band",
    "Red Band",
    "NIR Band",
    "Red edge Band",
];

function ImageMockup(addImage: boolean, prefix: string = "bands"): Image[] {
    return Array.from({ length: BandTypes.length }, (_, i) => {
        if (!addImage) return null;

        const file = new File([""], `${prefix}-${i}.png`, {
            type: "image/png",
        });

        return file;
    });
}

function FormMockup(): BasicForm {
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
            soil_humedity: 2,
            soil_temperature: 29,
            pH: 6.6,
            avg_spad: 8.33,
        },
    };
}

function ProcessingStatusMockup(): ProcessingStatus {
    return [];
}

export { BandTypes, ImageMockup, FormMockup, ProcessingStatusMockup };
