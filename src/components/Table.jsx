import { Icon } from "@iconify/react";

const Table = ({
    columns = [],
    data,
    pagination,
    headerExtra,
    rowExtra,
    styles = {}
}) => {
    return (
        <div className={`${styles.wrapper || "w-full overflow-x-auto"}`}>
            <div className="relative w-full">
                <table
                    className={`${styles.table || "w-full border-collapse min-w-[600px]"}`}
                >
                    <thead className={`${styles.thead || ""}`}>
                        <tr
                            className={`${styles.headerRow || "bg-gray-100 text-left text-gray-600 text-xs sm:text-sm"}`}
                        >
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`${styles.headerCell || "p-2 sm:p-3 font-semibold"} ${col.className || ""}`}
                                    style={{ width: col.width || "auto" }}
                                >
                                    {col.label}
                                </th>
                            ))}

                            {/* 🔹 Extra Header Slot */}
                            {headerExtra && (
                                <th className={`${styles.headerExtra || "p-2 sm:p-3"}`}>
                                    {headerExtra}
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className={`${styles.tbody || ""}`}>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${styles.row || "border-b hover:bg-gray-50 text-xs sm:text-sm"}`}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`${styles.cell || "p-2 sm:p-3"} ${col.cellClass || ""}`}
                                        >
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}

                                    {/* 🔹 Extra Row Slot */}
                                    {rowExtra && (
                                        <td className={`${styles.rowExtra || "p-2 sm:p-3"}`}>
                                            {rowExtra(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr className={`${styles.emptyRow || ""}`}>
                                <td
                                    colSpan={columns.length + (rowExtra ? 1 : 0)}
                                    className="p-3 text-center"
                                >
                                    <div
                                        className={`${
                                            styles.emptyWrapper ||
                                            "flex flex-col items-center justify-center py-10 sm:py-20 text-center"
                                        }`}
                                    >
                                        {/* ✅ Allow custom icon component or icon string */}
                                        {typeof styles.emptyIcon === "string" ? (
                                            <Icon
                                                icon={styles.emptyIcon}
                                                className={`${
                                                    styles.icon ||
                                                    "w-12 h-12 sm:w-16 sm:h-16 mb-4 text-gray-400"
                                                }`}
                                            />
                                        ) : (
                                            styles.emptyIcon || (
                                                <Icon
                                                    icon="uil:calender"
                                                    className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-gray-400"
                                                />
                                            )
                                        )}
                                        <h3
                                            className={`${
                                                styles.emptyTitle ||
                                                "text-base sm:text-lg font-semibold text-gray-800"
                                            }`}
                                        >
                                            {styles.emptyTitleText || "No bookings to display"}
                                        </h3>
                                        <p
                                            className={`${
                                                styles.emptyText ||
                                                "text-xs sm:text-sm text-gray-500"
                                            }`}
                                        >
                                            {styles.emptySubText ||
                                                "You do not have any bookings"}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 🔹 Custom Pagination */}
            {pagination && (
                <div
                    className={`w-full flex-1 ${styles.paginationWrapper || "mt-4"}`}
                >
                    {pagination}
                </div>
            )}
        </div>
    );
};

export default Table;
