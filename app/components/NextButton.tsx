import { ArrowRightIcon } from "lucide-react";
import { Button, ButtonProps } from "@nextui-org/react";

type Props = {
    children?: string | React.ReactNode;
    className?: string;
} & ButtonProps;

export default function NextButton({ children, className, ...props }: Props) {
    return (
        <Button
            className={`font-bold bg-gradient-primary shadow-lg ${className}`}
            endContent={<ArrowRightIcon width={20} />}
            {...props}
        >
            {children ?? "Siguiente"}
        </Button>
    );
}
