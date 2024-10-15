import { Button } from "@nextui-org/react";
import { XIcon } from "lucide-react";
import { Image } from "@/types/models";
import ImageAdapter from "./ImageAdapter";

type Props = {
    onRemove: (index: string) => void;
} & Image;

export default function RenderSquare({ id, src, onRemove }: Props) {
    return (
        <div className="group relative bg-gray-200 aspect-square rounded-lg transition hover:scale-105 hover:cursor-pointer hover:shadow-lg shadow">
            {src && (
                <>
                    <Button
                        isIconOnly
                        color="danger"
                        onClick={() => onRemove(id)}
                        className="hidden group-hover:flex absolute -top-2 -right-2 z-50"
                    >
                        <XIcon width={20} />
                    </Button>

                    <ImageAdapter
                        from="tif"
                        draggable={false}
                        src={src}
                        alt="Imagen de muestra"
                        className="object-cover h-full w-full rounded-lg"
                    />
                </>
            )}
        </div>
    );
}
