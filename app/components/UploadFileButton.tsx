import { Button, ButtonProps } from "@nextui-org/react";

type Props = {
    onUpload: (files: FileList) => void;
    children: React.ReactNode;
    accept: string;
} & ButtonProps;

export default function UploadFileButton({
    onUpload,
    children,
    accept,
    ...props
}: Props) {
    const onClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.multiple = true;

        input.onchange = () => {
            if (input.files) onUpload(input.files);
        };
        input.click();
    };

    return (
        <Button onClick={onClick} {...props}>
            {children}
        </Button>
    );
}
