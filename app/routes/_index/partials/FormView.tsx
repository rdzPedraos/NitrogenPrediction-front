import { DatePicker, Input } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { Upload } from "lucide-react";

import { useFormContext } from "@/contexts/FormContext";
import { useStepperContext } from "@/contexts/StepperContext";
import { NextButton, RenderSquare, UploadFileButton } from "@/components";
import Title from "@/components/Title";

export default function FormView() {
    const { next } = useStepperContext();
    const { images, BandTypes, register, alreadyUploadImages } =
        useFormContext();

    return (
        <>
            <Title>Ingreso de variables</Title>
            <p className="mb-8">
                Para usar este modelo se requiere cargar una imagen tomada con
                una cámara multiespectral del terreno a estudiar. Las cámaras
                multiespectrales te permiten obtener la información en 5
                canales, por favor, cargue dicha información y posicionelo
                correctamente, lo mismo para los paneles de refractancia. Y
                adjunte la información solicitada a continuación.
            </p>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-5">
                    <Input
                        isRequired
                        label="Niveles de clorofila"
                        {...register("clorofila")}
                        type="number"
                    />

                    <DatePicker
                        isRequired
                        label="Fecha inicial del cultivo"
                        {...register("startDate", "date")}
                    />
                    <DatePicker
                        isRequired
                        label="Fecha de la toma de muestras (fotos)"
                        {...register("captureDate", "date")}
                    />
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                    <UploadFileButton
                        isDisabled={images.multispectral.uploadedImages}
                        onUpload={images.multispectral.upload}
                        color="primary"
                        endContent={<Upload width={20} />}
                    >
                        Subir imágenes
                    </UploadFileButton>

                    <UploadFileButton
                        isDisabled={images.refractance.uploadedImages}
                        onUpload={images.refractance.upload}
                        color="primary"
                        variant="flat"
                        endContent={<Upload width={20} />}
                    >
                        Subir imágenes panel de refractancia
                    </UploadFileButton>
                </div>

                <div className="flex flex-col gap-6">
                    <div className={`flex gap-4`}>
                        {BandTypes.map((column) => (
                            <p
                                key={column}
                                className="uppercase text-center font-bold flex-1"
                            >
                                {column}
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
                                {images.map((image) => (
                                    <Reorder.Item
                                        key={image.id}
                                        value={image}
                                        className="flex-1"
                                    >
                                        <RenderSquare
                                            {...image}
                                            onRemove={removeImage}
                                        />
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        )
                    )}
                </div>

                <div>
                    <NextButton
                        onClick={next}
                        isDisabled={!alreadyUploadImages}
                        className="float-right"
                    >
                        Procesar
                    </NextButton>
                </div>
            </div>
        </>
    );
}
