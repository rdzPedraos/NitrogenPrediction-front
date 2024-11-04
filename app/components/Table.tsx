import {
    Table as TableRoot,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";

type Props<T> = {
    columns: { label: string; key: keyof T }[];
    renderCell?: (row: T, key: keyof T) => JSX.Element;
    data: T[];
};

export default function Table<T>({ data, columns, renderCell }: Props<T>) {
    renderCell =
        renderCell ??
        ((row: T, key: keyof T) => <p>{String(row[key] ?? key)}</p>);

    return (
        <div className="overflow-x-auto">
            <TableRoot aria-label="Table" removeWrapper>
                <TableHeader>
                    {columns.map(({ key, label }) => (
                        <TableColumn align="center" key={key.toString()}>
                            {label}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map(({ key }) => (
                                <TableCell key={key.toString()}>
                                    {renderCell(row, key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableRoot>
        </div>
    );
}
