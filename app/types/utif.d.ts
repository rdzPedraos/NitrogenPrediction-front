declare module "utif" {
    export function decode(buffer: ArrayBuffer): any[];
    export function decodeImage(buffer: ArrayBuffer, ifds: any[]): void;
    export function toRGBA8(ifd: any): Uint8Array;
}

declare module "react-thermometer-chart" {
    export default function Thermometer(props: {
        width: string;
        height: string;
        steps: number;
        minValue: number;
        maxValue: number;
        currentValue: number;
        showGoalline?: boolean;
        color?: string;
    }): JSX.Element;
}
