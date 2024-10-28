import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import SimpleImageSlider from "react-simple-image-slider";
import { TestTubeDiagonalIcon } from "lucide-react";
import { Link } from "@remix-run/react";
import ChangeLanguage from "@/components/ChangeLanguage";

export default function Index() {
    const { t } = useTranslation("welcome");

    return (
        <div className="h-screen grid lg:grid-cols-2">
            <div className="hidden lg:block">
                <SimpleImageSlider
                    width="50%"
                    height="100%"
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}
                    images={[
                        { url: "/stock/person_with_dron.png" },
                        { url: "/stock/panel.png" },
                        { url: "/stock/iot.png" },
                    ]}
                />
            </div>
            <div className="overflow-y-auto flex flex-col">
                <div className="flex-1 flex flex-col justify-center px-12 pt-12 pb-4 gap-4 max-w-4xl mx-auto">
                    <ChangeLanguage />

                    <p className="text-7xl pb-2 text-gradient-primary">
                        Nitrogen Prediction AI
                    </p>

                    <Link to="/predict">
                        <Button
                            color="primary"
                            className="w-fit"
                            endContent={<TestTubeDiagonalIcon />}
                        >
                            {t("cta")}
                        </Button>
                    </Link>

                    <p className="text-xl">{t("resume")}</p>
                    <p className="text-default-500">{t("explanation")}</p>
                </div>

                <div className="flex justify-center items-center gap-8 p-4 opacity-60">
                    <img
                        className="w-36"
                        src="/logos/udea.png"
                        alt="Universidad de Antioquia"
                    />
                    <img
                        className="w-20"
                        src="/logos/uab.png"
                        alt="Universidad autonóma de Barcelona"
                    />

                    <div className="flex items-center gap-2">
                        <img
                            className="h-6"
                            src="/logos/github.png"
                            alt="Github"
                        />
                        <p className="flex-grow">rdzPedraos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
