import { Sidebar } from "react-pro-sidebar";
import { Button, Input } from "@nextui-org/react";
import { SettingsIcon, XIcon } from "lucide-react";

import { DataIOT } from "@/types/models";
import { useFormContext } from "@/contexts/FormContext";

export default function Drawable() {
    const { isOpen, setIsOpen, data, setData, clearSession } = useFormContext();

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
        <div>
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
                className="h-full shadow"
            >
                <div className="p-4 w-64">
                    <div className="flex flex-col gap-4">
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
                            {...registerIOT("soil_humedity")}
                            color="primary"
                            label="Humedad del suelo"
                        />
                        <Input
                            {...registerIOT("soil_temperature")}
                            color="primary"
                            label="Temperatura del suelo"
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
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}
