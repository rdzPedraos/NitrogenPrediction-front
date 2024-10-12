import { ArrowLeftIcon } from "lucide-react";
import { Button, ButtonProps } from "@nextui-org/react";

type Props = {
    children?: string | React.ReactNode;
} & ButtonProps;

export default function PrevButton({ children, ...props }: Props) {
    return (
        <Button
            startContent={<ArrowLeftIcon width={20} />}
            color="warning"
            variant="flat"
            {...props}
        >
            {children ?? "Atrás"}
        </Button>
    );
}
