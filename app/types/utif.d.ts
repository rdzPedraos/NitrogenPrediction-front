declare module "utif" {
    export function decode(buffer: ArrayBuffer): any[];
    export function decodeImage(buffer: ArrayBuffer, ifds: any[]): void;
    export function toRGBA8(ifd: any): Uint8Array;
}
