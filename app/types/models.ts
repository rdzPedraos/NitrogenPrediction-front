type Image = File | null;

type FilterImage = {
    key: string;
    label: string;
    histogram?: string;
    preview: string;
};

type BasicForm = {
    session_id: string | null;

    roi_coordinates: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };

    data_iot: {
        soil_humedity: number;
        soil_temperature: number;
        pH: number;
        avg_spad: number;
    };
};

type NitrogenPredict = {
    nitrogen: number;
};

export type { Image, FilterImage, BasicForm, NitrogenPredict };
