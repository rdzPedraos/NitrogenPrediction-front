import { Sidebar } from "react-pro-sidebar";
import { Button, Input } from "@nextui-org/react";
import { ArrowLeftIcon, SettingsIcon, XIcon } from "lucide-react";

import { DataIOT } from "@/types/models";
import { useFormContext } from "@/contexts/FormContext";

export default function Drawable() {
    const { isOpen, setIsOpen, step, setStep } = useFormContext();

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="absolute top-8 left-0"
                isIconOnly
                variant="flat"
                size="sm"
            >
                <SettingsIcon />
            </Button>

            <Sidebar
                collapsed={!isOpen}
                toggled={isOpen}
                onBackdropClick={() => setIsOpen(false)}
                breakPoint="md"
                backgroundColor="#fafafa"
                collapsedWidth="0px"
                className="overflow-hidden shadow"
            >
                <div className="overflow-y-auto h-full p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Configuración</h2>
                        <Button
                            onClick={() => setIsOpen(false)}
                            isIconOnly
                            variant="flat"
                            size="sm"
                        >
                            <XIcon />
                        </Button>
                    </div>

                    {step !== "result" ? (
                        <GlobalConfig />
                    ) : (
                        <Button
                            variant="flat"
                            onClick={() => setStep("processing")}
                            startContent={<ArrowLeftIcon />}
                        >
                            Volver atrás
                        </Button>
                    )}
                </div>
            </Sidebar>
        </>
    );
}

function GlobalConfig() {
    const { data, setData, clearSession } = useFormContext();

    const registerIOT = (key: keyof DataIOT) => {
        return {
            type: "number",
            value: data.data_iot[key].toString(),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setData("data_iot", {
                    ...data.data_iot,
                    [key]: e.target.value,
                });
            },
        };
    };

    return (
        <>
            {data.session_id && (
                <Button
                    onClick={clearSession}
                    variant="flat"
                    startContent={<XIcon />}
                >
                    Borrar sessión
                </Button>
            )}

            <Input
                value={data.session_id?.toString()}
                color="primary"
                label="ID de sesión"
                isDisabled
            />

            <Input
                {...registerIOT("nitrogen_hoped")}
                color="primary"
                label="Nitrogeno real"
            />

            <Input
                {...registerIOT("soil_humedity")}
                color="primary"
                label="Humedad del suelo"
            />
            <Input
                {...registerIOT("soil_temperature")}
                color="primary"
                label="Temperatura del suelo (°C)"
            />
            <Input
                {...registerIOT("pH")}
                color="primary"
                label="pH del suelo"
            />
            <Input
                {...registerIOT("avg_spad")}
                color="primary"
                label="Promedio de clorofila"
            />
        </>
    );
}
