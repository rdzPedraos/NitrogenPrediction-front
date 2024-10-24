import { useMemo, useState } from "react";
import { use_mockup } from "@/env";

import { Image } from "@/types/models";
import { ImageMockup, BandTypes } from "@/helpers/mockups";

type UploadImagesReturn = {
    images: Image[];
    setImages: (images: Image[]) => void;
    upload: (files: File) => void;
    removeImage: (id: string) => void;
    uploadedImages: boolean;
};

function useBandImages(type: "bands" | "panels"): UploadImagesReturn {
    const [images, setImages] = useState(ImageMockup(use_mockup, type));

    const upload = (file: File) => {
        setImages((images) => {
            const emptyIndex = images.findIndex((img) => !img.src);
            if (emptyIndex === -1) return images;

            const newImages = [...images];
            newImages[emptyIndex].src = window.URL.createObjectURL(file);
            return newImages;
        });
    };

    const removeImage = (id: string) => {
        const newArray = [...images];
        const index = newArray.findIndex((img) => img.id === id);
        newArray[index].src = null;

        setImages(newArray);
    };

    const uploadedImages = useMemo(() => {
        return images.every((i) => i.src);
    }, [images]);

    return {
        images,
        upload,
        setImages,
        removeImage,
        uploadedImages,
    };
}

export default useBandImages;
export { BandTypes };
