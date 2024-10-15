import UTIF from "utif";

async function fromTifToBase64(path: string): Promise<string> {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const ifds = UTIF.decode(arrayBuffer);
    UTIF.decodeImage(arrayBuffer, ifds[0]);
    const image = UTIF.toRGBA8(ifds[0]);

    const canvas = document.createElement("canvas");
    canvas.width = ifds[0].width;
    canvas.height = ifds[0].height;
    const ctx = canvas.getContext("2d");

    const imageData = ctx!.createImageData(canvas.width, canvas.height);
    imageData.data.set(image);
    ctx!.putImageData(imageData, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    return dataUrl;
}

export { fromTifToBase64 };
