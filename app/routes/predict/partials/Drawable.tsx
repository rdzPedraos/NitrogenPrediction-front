import { useTranslation } from "react-i18next";
import { Sidebar } from "react-pro-sidebar";
import { Button, Input, Slider } from "@nextui-org/react";
import { ArrowLeftIcon, SettingsIcon, XIcon } from "lucide-react";

import { DataIOT } from "@/types/models";
import { useFormContext } from "@/contexts/FormContext";
import Credits from "@/components/Credits";

export default function Drawable() {
    const { t, i18n } = useTranslation("menu");
    const { isOpen, setIsOpen, step, setStep } = useFormContext();

    const changeLanguage = (lang: string) => {
        return () => i18n.changeLanguage(lang);
    };

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
                breakPoint="xl"
                backgroundColor="#fafafa"
                collapsedWidth="0px"
                className="overflow-hidden shadow"
            >
                <div className="overflow-y-auto p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{t("title")}</h2>
                        <Button
                            onClick={() => setIsOpen(false)}
                            isIconOnly
                            variant="flat"
                            size="sm"
                        >
                            <XIcon />
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        {["es", "en"].map((lang) => {
                            const active = i18n.language === lang;
                            return (
                                <button
                                    key={lang}
                                    onClick={changeLanguage(lang)}
                                    className={
                                        active ? "shadow shadow-secondary" : ""
                                    }
                                >
                                    <img
                                        className="cursor-pointer w-8 h-5"
                                        src={`/flags/${lang}.png`}
                                        alt={lang}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {step !== "result" ? (
                        <GlobalConfig />
                    ) : (
                        <Button
                            variant="flat"
                            onClick={() => setStep("processing")}
                            startContent={<ArrowLeftIcon />}
                        >
                            {t("actions.back")}
                        </Button>
                    )}

                    <Credits />
                </div>
            </Sidebar>
        </>
    );
}

function GlobalConfig() {
    const { t } = useTranslation("menu");
    const { data, setData, clearSession } = useFormContext();

    const setIOTData = (key: keyof DataIOT, value: any) => {
        setData("data_iot", {
            ...data.data_iot,
            [key]: value,
        });
    };

    const registerIOT = (key: keyof DataIOT) => {
        return {
            type: "number",
            value: data.data_iot[key].toString(),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setIOTData(key, e.target.value),
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
                    {t("actions.clear-session")}
                </Button>
            )}

            <Input
                value={data.session_id?.toString()}
                color="primary"
                label={t("session_id")}
                isDisabled
            />

            <Input
                {...registerIOT("nitrogen_hoped")}
                color="primary"
                label={t("nitrogen_hoped")}
            />

            <Input
                {...registerIOT("soil_temperature")}
                color="primary"
                label={t("soil_temperature")}
            />

            <Slider
                label={t("soil_pH")}
                step={0.1}
                maxValue={7}
                minValue={0}
                value={data.data_iot.pH}
                onChange={(value) => setIOTData("pH", value)}
                className="px-2"
                color="danger"
            />

            <Slider
                label={t("soil_humidity")}
                maxValue={100}
                minValue={0}
                value={data.data_iot.soil_humedity}
                onChange={(value) => setIOTData("soil_humedity", value)}
                className="px-2"
                color="primary"
            />

            <Slider
                label={t("avg_spad")}
                maxValue={50}
                minValue={0}
                value={data.data_iot.avg_spad}
                onChange={(value) => setIOTData("avg_spad", value)}
                className="px-2"
                color="success"
            />
        </>
    );
}
