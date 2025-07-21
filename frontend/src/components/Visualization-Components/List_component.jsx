import React, { useState, useEffect } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import DictComponent from "./Dict_component";

const processInput = (input) => {
  if (!input || !Array.isArray(input)) return [];
  return input;
};

const ListComponent = ({ input = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(processInput(input));
  }, [input]);

  return (
    <ArcherContainer strokeColor="black">
      <div className="flex items-start">
        {/* Left Column: Table */}
        <div>
          <p className="text-gray-400 text-sm mb-2">List</p>
          <table>
            <tbody>
              <tr style={{display:"flex", margin:"-0.2px"}}>
                {data.map((item, idx) => (
                  <td
                    key={idx} 
                    className="bg-gray-800 text-[#C084FC] text-center font-mono mx-1 rounded-md animate-scaleFadeIn shadow-md"
                    style={{ padding: "15px"}}
                  >
                    {typeof item === "object" && item !== null ? (
                      <ArcherElement
                        id={`source-${idx}`}
                        relations={[
                          {
                            targetId: `child-${idx}`,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeColor: "black", strokeWidth: 1 },
                          },
                        ]}
                      >
                        <span className="underline cursor-pointer">
                          {idx}
                          <br />
                          [Object]
                        </span>
                      </ArcherElement>
                    ) : (
                      <div>
                        <span className="text-gray-400 text-xs">{idx}</span>
                        <br />
                        {String(item)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column: Nested Objects */}
        <div className="ml-12">
          {data.map((item, idx) =>
            typeof item === "object" && item !== null ? (
              <ArcherElement id={`child-${idx}`} key={`child-${idx}`}>
                <div className="p-4 border border-gray-400 bg-white mb-5 rounded-md shadow">
                  <DictComponent input={item} />
                </div>
              </ArcherElement>
            ) : null
          )}
        </div>
      </div>
    </ArcherContainer>
  );
};

export default ListComponent;
