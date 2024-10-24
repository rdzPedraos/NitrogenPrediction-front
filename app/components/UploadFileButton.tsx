import { Button, ButtonProps } from "@nextui-org/react";

type Props = {
    onUpload: (files: File) => void;
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
            const files = input.files ?? [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type !== accept) {
                    alert("El archivo no es compatible");
                    return;
                }

                onUpload(file);
            }
        };
        input.click();
    };

    return (
        <Button onClick={onClick} {...props}>
            {children}
        </Button>
    );
}
