import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { useFormContext } from "@/contexts/FormContext";
import { useEffect } from "react";

export default function PredictModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { prediction } = useFormContext();

    useEffect(() => {
        if (prediction) onOpen();
    }, [onOpen, prediction]);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Predicción de nitrogeno</ModalHeader>
                <ModalBody>
                    <p>El valor de nitrogeno es: {prediction?.nitrogen}</p>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
