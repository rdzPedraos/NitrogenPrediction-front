import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";

import { ProcessingStatus } from "@/types/models";

import { useFormContext } from "@/contexts/FormContext";
import Title from "@/components/Title";
import ImageInfo from "./ImageInfo";

export default function Preview() {
    const { t } = useTranslation("processed-images");
    const [option, setOption] = useState<ProcessingStatus[number] | null>(null);
    const { status, processing } = useFormContext();

    const onSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = status.find((s) => s.key === e.target.value) ?? null;
        setOption(filter);
    };

    return (
        <>
            <Title>{t("title")}</Title>

            <p className="mb-8">{t("description")}</p>

            <div className="flex flex-col gap-6 mt-4 max-w-2xl mx-auto">
                <div>
                    {processing && (
                        <p className="text-sm text-primary flex items-center gap-2 animate-pulse">
                            <RefreshCcw className="animate-spin" size={15} />
                            {t("actions.processing")}
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
                                    {key.toUpperCase()}:{" "}
                                    {t(`filter.${key.toLowerCase()}`)}
                                </SelectItem>
                            );
                        })}
                    </Select>
                </div>

                <ImageInfo option={option} />
            </div>
        </>
    );
}
