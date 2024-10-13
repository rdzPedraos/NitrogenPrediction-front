import api from "./api";
import { use_mockup } from "@/env";
import { FilterImage } from "@/types/models";
import { FilterImageMockup } from "@/helpers/mockups";

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

async function processImages(): Promise<FilterImage[]> {
    if (use_mockup) {
        return FilterImageMockup();
    }

    return [];
}

export { getToken, processImages };
