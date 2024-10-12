import { useState } from "react";

const BandTypes = ["BANDA 1", "BANDA 2", "BANDA 3", "BANDA 4", "BANDA 5"];

function initializeImages(): Image[] {
    return Array.from({ length: BandTypes.length }, () => ({
        id: Math.random().toString(36).substring(7),
        src: "/img/logo.png",
    }));
}

type UploadImagesReturn = {
    images: Image[];
    setImages: (images: Image[]) => void;
    upload: (files: FileList) => void;
    removeImage: (id: string) => void;
    uploadedImages: () => boolean;
};

function useBandImages(): UploadImagesReturn {
    const [images, setImages] = useState(initializeImages());

    const upload = (files: FileList) => {
        const f = Array.from(files);
        const newImages = [...images];

        // Add image from filelist if not exists in images state
        newImages.forEach((img) => {
            if (!img.src && f.length > 0) {
                const file: File = f.shift()!;
                img.src = window.URL.createObjectURL(file);
            }
        });

        setImages(newImages);
    };

    const removeImage = (id: string) => {
        const newArray = [...images];
        const index = newArray.findIndex((img) => img.id === id);
        newArray[index].src = null;

        setImages(newArray);
    };

    const uploadedImages = () => {
        return images.every((i) => i.src);
    };

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
