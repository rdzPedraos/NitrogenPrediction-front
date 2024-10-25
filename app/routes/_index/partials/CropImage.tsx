import { ReactCrop } from "react-image-crop";

import { ProcessingStatus } from "@/types/models";

import { useFormContext } from "@/contexts/FormContext";
import { getUrlImage } from "@/helpers/requests";

type Props = {
    option: ProcessingStatus[number];
};

export default function CropImage({ option }: Props) {
    const { data, setData } = useFormContext();

    const histogramUrl = getUrlImage(
        data.session_id as string,
        "histograms",
        option.key
    );

    const imageUrl = getUrlImage(
        data.session_id as string,
        "images",
        option.key
    );

    return (
        <>
            <img
                alt="histogram"
                className="rounded shadow"
                src={histogramUrl}
            />

            <ReactCrop
                className="rounded overflow-hidden shadow w-full"
                crop={data.roi_coordinates}
                onChange={(crop) => setData("roi_coordinates", crop)}
            >
                <img className="w-full" alt="preview" src={imageUrl} />
            </ReactCrop>
        </>
    );
}
