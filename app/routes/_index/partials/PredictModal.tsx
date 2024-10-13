import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useFormContext } from "@/contexts/FormContext";

export default function PredictModal() {
    const { prediction, modalDisclosure } = useFormContext();

    return (
        <Modal
            isOpen={modalDisclosure.isOpen}
            onOpenChange={modalDisclosure.onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Predicción de nitrogeno</ModalHeader>
                <ModalBody>
                    <p>El valor de nitrogeno es: {prediction?.nitrogen}</p>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
