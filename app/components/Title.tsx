import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function Title({ children }: Props) {
    return (
        <h1 className="text-6xl font-bold mb-4 text-gradient-primary pb-2">
            {children}
        </h1>
    );
}
