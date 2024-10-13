import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { MoveLeftIcon } from "lucide-react";

import { useStepperContext } from "@/contexts/StepperContext";
import { useFormContext } from "@/contexts/FormContext";
import Title from "@/components/Title";
import CropImage from "./CropImage";

export default function Preview() {
    const { prev } = useStepperContext();
    const { filterImages } = useFormContext();
    const [option, setOption] = useState<string>("default");

    return (
        <>
            <MoveLeftIcon
                onClick={prev}
                className="text-secondary cursor-pointer"
                size={30}
            />

            <Title>Indices de vegetación</Title>

            <p className="mb-8">
                En esta pantalla podrás visualizar distintos formatos obtenidos
                de la cámara multiespectral. Una vez que encuentre la zona a
                estudiar, selecciónela con el cursor encima de la imagen y dele
                en el botón 'procesar'.
            </p>

            <div className="flex flex-col gap-6 mt-4 max-w-xl mx-auto">
                <Select
                    label="Seleccione el tipo de formato a visualizar"
                    defaultSelectedKeys={[option]}
                    onChange={(e) => setOption(e.target.value)}
                    disallowEmptySelection
                >
                    {filterImages.map((image) => (
                        <SelectItem key={image.key} value={image.key}>
                            {image.label}
                        </SelectItem>
                    ))}
                </Select>

                <CropImage option={option} />
            </div>
        </>
    );
}
