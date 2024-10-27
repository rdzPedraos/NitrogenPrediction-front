import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { ReactCrop } from "react-image-crop";
import { AnimatePresence, motion } from "framer-motion";
import { ChartNoAxesCombinedIcon, ImageIcon, SparklesIcon } from "lucide-react";

import { ProcessingStatus } from "@/types/models";

import { getUrlImage } from "@/helpers/requests";
import { useFormContext } from "@/contexts/FormContext";

type Props = {
    option: ProcessingStatus[number] | null;
};

const tabs = {
    image: ImageIcon,
    histogram: ChartNoAxesCombinedIcon,
};

export default function ImageInfo({ option }: Props) {
    const { t } = useTranslation("processed-images");
    const [section, setSection] = useState<keyof typeof tabs>("image");
    const { data, setData, predict, setStep, processing } = useFormContext();

    if (!option) {
        return null;
    }

    const histogramUrl = getUrlImage(
        data.session_id as string,
        "histograms",
        option.key
    );

    const imageUrl = getUrlImage(
        data.session_id as string,
        "images",
        option.key
    );

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
            <nav>
                <ul className="flex border-b-1">
                    {Object.keys(tabs).map((key) => {
                        const Icon = tabs[key as keyof typeof tabs];
                        //const label = t(`actions.show.${key}`);
                        const active = section === key;

                        return (
                            <li key={key} className="flex-grow">
                                <button
                                    onClick={() =>
                                        setSection(key as keyof typeof tabs)
                                    }
                                    className={`w-full flex justify-center p-2 rounded-t ${
                                        active
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <Icon className="text-primary" />
                                </button>

                                {active && (
                                    <motion.div
                                        className="border-b-2 border-primary"
                                        layoutId="underline-nav"
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={section}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {section === "image" && (
                            <ReactCrop
                                className="rounded overflow-hidden shadow w-full"
                                crop={data.roi_coordinates}
                                onChange={(crop, percentageCrop) =>
                                    setData("roi_coordinates", percentageCrop)
                                }
                            >
                                <img
                                    className="w-full"
                                    alt="preview"
                                    src={imageUrl}
                                />
                            </ReactCrop>
                        )}

                        {section === "histogram" && (
                            <img
                                alt="histogram"
                                className="rounded shadow"
                                src={histogramUrl}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {section === "image" && (
                <Button
                    isDisabled={!activeButton}
                    onClick={onPredict}
                    className="bg-gradient-primary"
                    endContent={<SparklesIcon width={20} />}
                >
                    {t("actions.predict")}
                </Button>
            )}
        </>
    );
}
