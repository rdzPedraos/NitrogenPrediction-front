import { CalendarDate } from "@nextui-org/react";

/* eslint-disable @typescript-eslint/no-unused-vars */
type Image = {
    id: string;
    src: null | string;
};

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
