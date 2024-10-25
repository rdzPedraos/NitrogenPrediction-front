import { BasicForm, FilterImage, Image } from "@/types/models";

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
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
        },
        data_iot: {
            soil_humedity: 2,
            soil_temperature: 29,
            pH: 6.6,
            avg_spad: 8.33,
        },
    };
}

function FilterImageMockup(): FilterImage[] {
    return [
        {
            key: "default",
            label: "Imagen original",
            preview: "/mockup/preview/normal.png",
        },
        {
            key: "GNDVI",
            label: "Green Normalized Difference Vegetation Index",
            histogram: "/mockup/histograms/GNDVI.png",
            preview: "/mockup/preview/GNDVI.png",
        },
        {
            key: "NDVI",
            label: "Normalized difference vegetation index",
            histogram: "/mockup/histograms/NDVI.png",
            preview: "/mockup/preview/NDVI.png",
        },
    ];
}

export { BandTypes, ImageMockup, FormMockup, FilterImageMockup };
