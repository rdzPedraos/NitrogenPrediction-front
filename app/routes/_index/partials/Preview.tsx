import { useState } from "react";
import { toast } from "sonner";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { RefreshCcw, SparklesIcon } from "lucide-react";

import { ProcessingStatus } from "@/types/models";

import { useFormContext } from "@/contexts/FormContext";
import Title from "@/components/Title";
import CropImage from "./CropImage";

export default function Preview() {
    const [option, setOption] = useState<ProcessingStatus[number]>();
    const { status, processing, data, predict, clearSession, setStep } =
        useFormContext();

    const onSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = status.find((s) => s.key === e.target.value);
        setOption(filter);
    };

    const activeButton =
        !processing &&
        data.roi_coordinates.width &&
        data.roi_coordinates.height;

    const onPredict = () => {
        const promise = predict();
        toast.promise(promise, {
            loading: "Prediciendo",
            success: "Predicción completada",
            error: "Error al predecir",
        });
        promise.then(() => setStep("processing"));
    };

    return (
        <>
            <button onClick={clearSession}>Clear</button>
            <Title>Indices de vegetación</Title>

            <p className="mb-8">
                En esta pantalla podrás visualizar distintos formatos obtenidos
                de la cámara multiespectral. Una vez que encuentre la zona a
                estudiar, selecciónela con el cursor encima de la imagen y dele
                en el botón 'procesar'.
            </p>

            <div className="flex flex-col gap-6 mt-4 max-w-xl mx-auto">
                <div>
                    {processing && (
                        <p className="text-sm text-secondary flex items-center gap-2 animate-pulse">
                            <RefreshCcw className="animate-spin" size={15} />
                            Procesando imágenes
                        </p>
                    )}

                    <Select
                        label="Seleccione el tipo de formato a visualizar"
                        onChange={onSelectFilter}
                        isDisabled={status.every((s) => !s.status)}
                        disabledKeys={status
                            .filter((s) => !s.status)
                            .map((s) => s.key)}
                        disallowEmptySelection
                    >
                        {status.map(({ key, label }) => {
                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    textValue={label}
                                >
                                    {key.toUpperCase()}: {label}
                                </SelectItem>
                            );
                        })}
                    </Select>
                </div>

                {option && (
                    <>
                        <CropImage option={option} />
                        <Button
                            isDisabled={!activeButton}
                            onClick={onPredict}
                            color="secondary"
                            endContent={<SparklesIcon width={20} />}
                        >
                            Predecir
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
