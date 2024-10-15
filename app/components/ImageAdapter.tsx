import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { fromTifToBase64 } from "@/helpers/converter";

type Props = { from: "tif" } & React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageAdapter({ from, src, alt, ...props }: Props) {
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        const converter = async () => {
            setLoading(true);

            if (!src) setImageSrc(undefined);
            else
                switch (from) {
                    case "tif": {
                        const data = await fromTifToBase64(src);
                        setImageSrc(data);
                        break;
                    }
                    default:
                        setImageSrc(src);
                }

            setLoading(false);
        };

        converter();
    }, [src, from]);

    if (loading) return <Skeleton className="h-full" />;
    return imageSrc ? <img src={imageSrc} alt={alt} {...props} /> : null;
}
