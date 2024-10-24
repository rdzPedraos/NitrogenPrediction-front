type Image = File | null;

type FilterImage = {
    key: string;
    label: string;
    histogram?: string;
    preview: string;
};

type BasicForm = {
    clorofila: number;
    startDate: CalendarDate;
    captureDate: CalendarDate;
};

type NitrogenPredict = {
    nitrogen: number;
};

export type { Image, FilterImage, BasicForm, NitrogenPredict };
