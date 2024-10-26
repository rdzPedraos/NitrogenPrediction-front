import { Chart } from "react-google-charts";
import ReactSpeedometer from "react-d3-speedometer";

import { useFormContext } from "@/contexts/FormContext";
import Thermometer from "@/components/Thermometer";
import { Title } from "@/components";

export default function Prediction() {
    const { prediction, data } = useFormContext();

    return (
        <>
            <Title>Predicción de nitrogeno</Title>

            <div className="grid md:grid-cols-2 xl:flex gap-16 justify-center items-center mt-8">
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
                    <p className="text-xl font-bold">Valor esperado</p>
                </div>

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
                    <p className="text-xl font-bold">Predicción</p>
                </div>

                <div className="flex flex-col items-center">
                    <Chart
                        height={200}
                        chartType="Gauge"
                        loader={<div></div>}
                        data={[
                            ["Label", "Value"],
                            ["Humedad", data.data_iot.soil_humedity],
                        ]}
                        options={{
                            redFrom: 90,
                            redTo: 200,
                            yellowFrom: 50,
                            yellowTo: 90,
                            minorTicks: 5,
                            min: 0,
                            max: 100,
                        }}
                    />
                    <p className="text-xl font-bold">Humedad</p>
                </div>

                <div className="flex flex-col items-center">
                    <Thermometer
                        width="100%"
                        height="250px"
                        steps={1}
                        minValue={-55}
                        maxValue={55}
                        currentValue={80}
                        color="red"
                    />
                    <p className="text-xl font-bold">Temperatura</p>
                </div>
            </div>
        </>
    );
}
