import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import { ReactCrop, Crop } from "react-image-crop";
import { Button } from "@nextui-org/react";

import { useFormContext } from "@/contexts/FormContext";

type Props = {
    option?: string;
};

export default function CropImage({ option }: Props) {
    const { filterImages, predict } = useFormContext();
    const [crop, setCrop] = useState<Crop>();
    const image = filterImages.find((o) => o.key === option);

    if (!image) return null;

    const activeButton = Boolean(crop?.width) && Boolean(crop?.height);

    return (
        <>
            {image.histogram && (
                <img
                    alt="histogram"
                    className="rounded shadow"
                    src={image.histogram}
                />
            )}

            <ReactCrop
                className="rounded overflow-hidden shadow w-full"
                crop={crop}
                onChange={(c) => setCrop(c)}
            >
                <img className="w-full" alt="preview" src={image.preview} />
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
