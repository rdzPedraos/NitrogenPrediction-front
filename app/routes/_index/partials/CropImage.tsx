import { useState } from "react";
import { Button } from "@nextui-org/react";
import { SparklesIcon } from "lucide-react";
import { ReactCrop, Crop } from "react-image-crop";

import { useFormContext } from "@/contexts/FormContext";

type Props = {
    option?: string;
};

export default function CropImage({ option }: Props) {
    const [crop, setCrop] = useState<Crop>();
    const { filterImages } = useFormContext();
    const image = filterImages.find((o) => o.key === option);
    const activeButton = Boolean(crop?.width) && Boolean(crop?.height);

    if (!image) return null;

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
                className="rounded shadow w-full"
                crop={crop}
                onChange={(c) => setCrop(c)}
            >
                <img className="w-full" alt="preview" src={image.preview} />
            </ReactCrop>

            {activeButton && (
                <Button
                    color="secondary"
                    endContent={<SparklesIcon width={20} />}
                >
                    Predecir
                </Button>
            )}
        </>
    );
}
