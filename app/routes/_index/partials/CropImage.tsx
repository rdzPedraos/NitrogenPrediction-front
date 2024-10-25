import { SparklesIcon } from "lucide-react";
import { ReactCrop } from "react-image-crop";
import { Button } from "@nextui-org/react";

import { ProcessingStatus } from "@/types/models";

import { useFormContext } from "@/contexts/FormContext";
import { getUrlImage } from "@/helpers/requests";

type Props = {
    option: ProcessingStatus[number];
};

export default function CropImage({ option }: Props) {
    const { data, setData, predict } = useFormContext();

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

    const activeButton =
        data.roi_coordinates.width && data.roi_coordinates.height;

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

            <Button
                isDisabled={!activeButton}
                onClick={predict}
                color="secondary"
                endContent={<SparklesIcon width={20} />}
            >
                Predecir
            </Button>
        </>
    );
}
