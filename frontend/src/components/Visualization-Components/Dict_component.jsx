import React from "react";

const DictComponent = (props) => {
  const dict = props.input;
  const result = dict;

  return (
    <div>
      <p className="mb-2 text-lg text-gray-400 font-semibold">dict</p>
      <div className="bg-gray-800 rounded-md px-3 py-3 animate-scaleFadeIn max-w-fit">
        <table className="border-separate border-spacing-0 text-sm w-fit min-w-[180px]">
          <thead>
            <tr className="text-gray-300">
              <th className="border-b border-gray-600 px-3 py-1 text-left bg-gray-800">KEY</th>
              <th className="border-b border-gray-600 px-3 py-1 text-left bg-gray-800">VALUE</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(result).map(([key, value], index) => (
              <tr key={index} className="hover:bg-gray-700 transition-colors">
                <td className="border-b border-r border-gray-600 px-3 py-1 text-[#C084FC] bg-gray-800">{key}</td>
                <td className="border-b border-r border-gray-600 px-3 py-1 text-[#C084FC] bg-gray-800">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DictComponent;
