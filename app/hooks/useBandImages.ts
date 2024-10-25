import { useMemo, useState } from "react";

import { Image } from "@/types/models";
import { BandTypes, defaultImages } from "@/helpers/mockups";

type UploadImagesReturn = {
    images: Image[];
    setImages: (images: Image[]) => void;
    upload: (files: File) => void;
    removeImage: (id: number) => void;
    uploadedImages: boolean;
};

function useBandImages(): UploadImagesReturn {
    const [images, setImages] = useState(defaultImages());

    const upload = (file: File) => {
        setImages((images) => {
            const emptyIndex = images.findIndex((img) => !img);
            if (emptyIndex === -1) return images;

            const newImages = [...images];
            newImages[emptyIndex] = file;
            return newImages;
        });
    };

    const removeImage = (index: number) => {
        const newArray = [...images];
        newArray[index] = null;

        setImages(newArray);
    };

    const uploadedImages = useMemo(() => {
        return images.every((i) => i);
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
