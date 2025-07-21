import React from "react";

const TuplesComponent = ({ input = [] }) => {
  const values = input;

  return (
    <div className="text-left mt-2">
      <p className="mb-1 text-lg text-gray-400 font-semibold">tuple</p>
      {values.length > 0 ? (
        <div className="bg-gray-800 rounded-md px-3 py-3 animate-scaleFadeIn max-w-fit">
          <table className="border-separate border-spacing-0 text-sm w-fit min-w-[180px]">
            <tbody>
              <tr>
                {values.map((value, index) => (
                  <td
                    key={index}
                    className="border border-gray-600 px-3 py-1 text-white text-center"
                  >
                    <div>
                      <span className="text-xs text-gray-400">{index}</span>
                      <br />
                      <span className="text-[#C084FC]">{JSON.stringify(value)}</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-red-500">Empty Tuple</p>
      )}
    </div>
  );
};

export default TuplesComponent;
