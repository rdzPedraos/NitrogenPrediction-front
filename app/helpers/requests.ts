import api from "./api";

function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
        return Promise.resolve(token);
    }

    return api.get("/get-token").then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        return token;
    });
}

type uploadImagesProps = {
    multiespectral: {
        content: string;
        bandType: string;
    }[];

    refractancia: {
        content: string;
        bandType: string;
    }[];
};

function uploadImages(images: uploadImagesProps): Promise<string[]> {
    return getToken().then((token) => {
        return api
            .post("/process-images", { token, images })
            .then((response) => response.data);
    });
}

export { getToken, uploadImages };
