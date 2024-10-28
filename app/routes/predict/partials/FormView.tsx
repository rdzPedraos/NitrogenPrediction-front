import { useTranslation } from "react-i18next";
import { Button } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { toast } from "sonner";
import { ArrowRightIcon, Upload } from "lucide-react";

import { useFormContext } from "@/contexts/FormContext";

import { RenderSquare, UploadFileButton, Title } from "@/components";

export default function FormView() {
    const { t } = useTranslation("load-variables");
    const { images, BandTypes, alreadyUploadImages, processImages } =
        useFormContext();

    const onSubmit = () => {
        const promise = processImages();
        toast.promise(promise, {
            loading: t("process.loading"),
            success: t("process.success"),
            error: t("process.error"),
        });
    };

    return (
        <>
            <Title>{t("title")}</Title>

            <p className="mb-8">{t("description")}</p>

            <div className="flex flex-wrap justify-end gap-2 mb-6">
                <UploadFileButton
                    accept="image/tiff"
                    isDisabled={images.multispectral.uploadedImages}
                    onUpload={images.multispectral.upload}
                    color="primary"
                    endContent={<Upload width={20} />}
                >
                    {t("actions.upload.bands")}
                </UploadFileButton>

                <UploadFileButton
                    accept="image/tiff"
                    isDisabled={images.refractance.uploadedImages}
                    onUpload={images.refractance.upload}
                    color="primary"
                    variant="flat"
                    endContent={<Upload width={20} />}
                >
                    {t("actions.upload.refractance")}
                </UploadFileButton>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                    {BandTypes.map((column) => (
                        <p
                            key={column}
                            className="uppercase text-center font-bold flex-1"
                        >
                            {t(`bands.${column}`)}
                        </p>
                    ))}
                </div>

                {Object.values(images).map(
                    ({ setImages, images, removeImage }, i) => (
                        <Reorder.Group
                            key={i}
                            axis="x"
                            onReorder={setImages}
                            values={images}
                            className="flex gap-6"
                        >
                            {images.map((image, id) => (
                                <Reorder.Item
                                    key={id}
                                    value={image}
                                    className="flex-1"
                                >
                                    <RenderSquare
                                        image={image}
                                        onRemove={() => removeImage(id)}
                                    />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    )
                )}
            </div>

            <Button
                onClick={onSubmit}
                endContent={<ArrowRightIcon width={20} />}
                isDisabled={!alreadyUploadImages}
                className="bg-gradient-primary mt-6 w-full"
            >
                {t("actions.process")}
            </Button>
        </>
    );
}
