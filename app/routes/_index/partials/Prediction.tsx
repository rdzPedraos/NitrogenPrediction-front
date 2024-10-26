import ReactSpeedometer from "react-d3-speedometer";

import { useFormContext } from "@/contexts/FormContext";
import Thermometer from "@/components/Thermometer";
import { Title } from "@/components";
import { getUrlImage } from "@/helpers/requests";
import { useTranslation } from "react-i18next";
import { CircularProgressbar } from "react-circular-progressbar";

export default function Prediction() {
    const { t } = useTranslation("result-prediction");
    const { prediction, data } = useFormContext();

    return (
        <>
            <Title>{t("title")}</Title>

            <p>{t("description")}</p>

            <div className="flex flex-col md:flex-row justify-center gap-16 my-8">
                <div className="flex flex-col items-center">
                    <ReactSpeedometer
                        value={prediction}
                        maxValue={3}
                        minValue={0}
                        height={180}
                        width={290}
                        needleTransitionDuration={1000}
                        segments={9}
                        startColor="green"
                        endColor="#ec4899"
                        needleColor="black"
                    />
                    <p className="text-xl font-bold">
                        {t("variable.prediction")}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <ReactSpeedometer
                        value={data.data_iot.nitrogen_hoped}
                        maxValue={3}
                        minValue={0}
                        height={180}
                        width={290}
                        needleTransitionDuration={1000}
                        segments={9}
                        startColor="green"
                        endColor="#ec4899"
                        needleColor="black"
                    />
                    <p className="text-xl font-bold">
                        {t("variable.nitrogen")}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-16 justify-center items-center my-8">
                <div className="flex flex-col items-center h-52">
                    <Thermometer
                        ulidKey="humidity"
                        minValue={0}
                        maxValue={10}
                        currentValue={data.data_iot.soil_humedity}
                        color="#1f68fc"
                    />

                    <p className="text-xl font-bold">
                        {t("variable.humidity")}
                    </p>
                </div>

                <div className="flex flex-col items-center h-52">
                    <Thermometer
                        ulidKey="temperature"
                        minValue={-55}
                        maxValue={55}
                        label={`${data.data_iot.soil_temperature}°`}
                        currentValue={data.data_iot.soil_temperature}
                        color="#ff5f5f"
                    />

                    <p className="text-xl font-bold">
                        {t("variable.temperature")}
                    </p>
                </div>

                <div className="flex flex-col items-center h-52">
                    <CircularProgressbar
                        value={data.data_iot.pH}
                        maxValue={7}
                        text={`${data.data_iot.pH} pH`}
                        styles={{
                            root: {
                                width: "auto",
                                height: "100%",
                                aspectRatio: "1",
                            },
                            path: {
                                stroke: "#ec4899",
                            },
                            text: {
                                stroke: "#ec4899",
                            },
                        }}
                    />

                    <p className="text-xl font-bold">{t("variable.ph")}</p>
                </div>

                <div className="flex flex-col items-center h-52">
                    <CircularProgressbar
                        value={data.data_iot.avg_spad}
                        maxValue={100}
                        text={`${data.data_iot.avg_spad}`}
                        styles={{
                            root: {
                                width: "auto",
                                height: "100%",
                                aspectRatio: "1",
                            },
                            path: {
                                stroke: "#49ec99",
                            },
                            text: {
                                stroke: "#48ec99",
                            },
                        }}
                    />

                    <p className="text-xl font-bold">
                        {t("variable.svg_spad")}
                    </p>
                </div>
            </div>

            <p>{t("description.cropped-image")}</p>

            <img
                className="mt-8 mx-auto min-h-[200px] min-w-[200px] object-contain shadow"
                alt="cropped"
                src={getUrlImage(
                    data.session_id as string,
                    "images",
                    "rgb",
                    data.roi_coordinates
                )}
            />
        </>
    );
}
