import React from "react";

const SetComponent = ({ input }) => {
  const result = input;
  const rows = Math.ceil(Math.sqrt(result.length)); // Auto-calculate rows
  const cols = Math.ceil(result.length / rows); // Auto-calculate columns

  const tableData = Array.from({ length: rows }, (_, rowIndex) =>
    result.slice(rowIndex * cols, (rowIndex + 1) * cols)
  );

  return (
    <div className="text-left mt-2">
      <p className="mb-1 text-lg text-gray-400 font-semibold">set</p>
      <div className="bg-gray-800 rounded-md py-6 px-[-5px] animate-scaleFadeIn max-w-fit">
        <table className="border-separate border-spacing-0 text-sm w-fit min-w-[180px]">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-600 hover:bg-gray-700 transition-colors ">
                {row.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-600 text-[#C084FC] text-center"
                  >
                    {String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SetComponent;
