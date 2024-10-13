import { CalendarDate } from "@internationalized/date";
import { BasicForm, FilterImage, Image } from "@/types/models";

const BandTypes = [
    "Blue band",
    "Green Band",
    "Red Band",
    "NIR Band",
    "Red edge Band",
];

function ImageMockup(addImage: boolean): Image[] {
    return Array.from({ length: BandTypes.length }, (_, i) => {
        const id = Math.random().toString(36).substring(7);
        const src = addImage ? `/mockup/bands/${i + 1}.png` : null;

        return { id, src };
    });
}

function FormMockup(): BasicForm {
    const now = new Date();

    return {
        clorofila: 1,
        startDate: new CalendarDate(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ),
        captureDate: new CalendarDate(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate()
        ),
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
