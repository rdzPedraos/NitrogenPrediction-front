import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { RefreshCcw, SparklesIcon } from "lucide-react";

import { ProcessingStatus } from "@/types/models";

import { useFormContext } from "@/contexts/FormContext";
import Title from "@/components/Title";
import ImageInfo from "./ImageInfo";

export default function Preview() {
    const { t } = useTranslation("processed-images");
    const [option, setOption] = useState<ProcessingStatus[number]>();
    const { status, processing, data, predict, setStep } = useFormContext();

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
            loading: t("prediction.loading"),
            success: t("prediction.success"),
            error: t("prediction.error"),
        });
        promise.then(() => setStep("result"));
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

                {option && (
                    <>
                        <ImageInfo option={option} />
                        <Button
                            isDisabled={!activeButton}
                            onClick={onPredict}
                            className="bg-gradient-primary"
                            endContent={<SparklesIcon width={20} />}
                        >
                            {t("actions.predict")}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
}
