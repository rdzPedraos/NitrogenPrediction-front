import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ReactCrop } from "react-image-crop";
import { ChartNoAxesCombinedIcon, ImageIcon } from "lucide-react";

import { ProcessingStatus } from "@/types/models";

import { getUrlImage } from "@/helpers/requests";
import { useFormContext } from "@/contexts/FormContext";

type Props = {
    option: ProcessingStatus[number];
};

export default function ImageInfo({ option }: Props) {
    const { t } = useTranslation("processed-images");
    const [section, setSection] = useState<keyof typeof tabs>("image");
    const { data, setData } = useFormContext();

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

    const tabs = useMemo(
        () => ({
            image: {
                label: t("tabs.image"),
                Icon: ImageIcon,
            },
            histogram: {
                label: t("tabs.histogram"),
                Icon: ChartNoAxesCombinedIcon,
            },
        }),
        [t]
    );

    return (
        <>
            <nav>
                <ul className="flex border-b-1">
                    {Object.keys(tabs).map((key) => {
                        const item = tabs[key as keyof typeof tabs];
                        const active = section === key;

                        return (
                            <li key={key} className="flex-grow">
                                <button
                                    onClick={() =>
                                        setSection(key as keyof typeof tabs)
                                    }
                                    className={`flex gap-2 w-full p-2 text-left rounded-t ${
                                        active
                                            ? "bg-gray-100"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <item.Icon className="text-primary" />
                                    {item.label}
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
                                onChange={(crop) =>
                                    setData("roi_coordinates", crop)
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
        </>
    );
}
