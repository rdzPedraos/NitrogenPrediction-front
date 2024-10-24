import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { fromTifToBase64 } from "@/helpers/converter";

type Props = {
    from: "tif";
    image: File;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageAdapter({ from, image, alt, ...props }: Props) {
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        const converter = async () => {
            setLoading(true);

            if (!image) setImageSrc(undefined);
            else
                switch (from) {
                    case "tif": {
                        const data = await fromTifToBase64(image);
                        setImageSrc(data);
                        break;
                    }
                    default:
                        setImageSrc(URL.createObjectURL(image));
                }

            setLoading(false);
        };

        converter();
    }, [image, from]);

    if (loading) return <Skeleton className="h-full" />;
    return imageSrc ? <img src={imageSrc} alt={alt} {...props} /> : null;
}
