import Table from "@/components/Table";
import { useFormContext } from "@/contexts/FormContext";
import useDebouncedEffect from "@/hooks/useDebouncedEffect";
import { RoiStatistics } from "@/types/models";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    band: string;
};

export default function GetStatistics({ band }: Props) {
    const { t } = useTranslation("processed-images");
    const {
        data: { roi_coordinates },
        getStatistics,
    } = useFormContext();

    const [statistics, setStatistics] = useState<RoiStatistics>(
        {} as RoiStatistics
    );

    useDebouncedEffect(
        () => {
            if (!roi_coordinates.width || !roi_coordinates.height) return;

            getStatistics(roi_coordinates, band).then(setStatistics);
        },
        200,
        [getStatistics, roi_coordinates, band]
    );

    return (
        <Table
            columns={[
                { key: "avg", label: t("statistics.avg") },
                { key: "max", label: t("statistics.max") },
                { key: "min", label: t("statistics.min") },
                { key: "std", label: t("statistics.std") },
                { key: "var", label: t("statistics.var") },
            ]}
            data={[statistics]}
            renderCell={(row, key) => {
                const value = row[key];
                if (!value) return <p>...</p>;
                return <p>{value.toFixed(6)}</p>;
            }}
        />
    );
}
