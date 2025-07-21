import { ArcherElement } from "react-archer";
import ListComponent from "./List_component";
import SetComponent from "./Set_component";
import TuplesComponent from "./Tuples_component";

const ArcherGenericObjectNode = ({ data, nodeId, type }) => {
  const filteredEntries = Object.entries(data).filter(([key]) => key !== "type");
  const rowCount = filteredEntries.length;
  const isHorizontal = rowCount <= 2;

  const childKeys = Object.keys(data).filter(
    (key) => key !== "type" && data[key] && typeof data[key] === "object"
  );

  return (
    <div className="flex items-start mb-4">
      {/* Left Column */}
      <div>
        <p className="text-gray-400 text-sm font-semibold">{type || "Object"}</p>

        {/* Horizontal layout (2 items or less) */}
        {isHorizontal ? (
          <div className="flex gap-1 rounded-md p-2 animate-scaleFadeIn">
            {filteredEntries.map(([key, value]) => {
              let componentType = null;
              if (typeof value === "string") {
                if (value.startsWith("[")) componentType = "list";
                else if (value.startsWith("(")) componentType = "tuple";
                else if (value.startsWith("{")) componentType = "set";
              }

              const content =
                componentType ? (
                  <ArcherElement
                    id={`source-${nodeId}-${key}`}
                    relations={[
                      {
                        targetId: `${componentType}-${nodeId}-${key}`,
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: { strokeColor: "#C084FC", strokeWidth: 2 },
                      },
                    ]}
                  >
                    <span className="underline cursor-pointer text-purple-400">
                      {componentType === "list"
                        ? "[List]"
                        : componentType === "tuple"
                        ? "(Tuple)"
                        : "{Set}"}
                    </span>
                  </ArcherElement>
                ) : typeof value === "object" ? (
                  <ArcherElement
                    id={`source-${nodeId}-${key}`}
                    relations={[
                      {
                        targetId: `child-${nodeId}-${key}`,
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: { strokeColor: "#C084FC", strokeWidth: 2 },
                      },
                    ]}
                  >
                    <span className="cursor-pointer text-purple-400 font-bold">
                      {value == null ? "null" : "•"}
                    </span>
                  </ArcherElement>
                ) : (
                  <span className="text-white">{String(value)}</span>
                );

              return (
                <div
                  key={key}
                  className="text-center font-mono text-purple-400 pr-6 pl-6 rounded-md px-4 py-4 animate-scaleFadeIn bg-gray-800"
                >
                  {content}
                </div>
              );
            })}
          </div>
        ) : (
          // Vertical key-value table wrapped in styled background
          <div className="bg-gray-800 animate-scaleFadeIn rounded-md px-3 py-3 max-w-fit">
            <table className="border-collapse border-spacing-0 border border-gray-500 text-sm w-fit min-w-[180px] max-w-fit">
              <thead>
                <tr className="text-gray-300">
                  <th className="border border-gray-500 px-3 py-2 bg-gray-900 w-1/2">Key</th>
                  <th className="border border-gray-500 px-3 py-2 bg-gray-900 w-1/2">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map(([key, value]) => {
                  let componentType = null;
                  if (typeof value === "string") {
                    if (value.startsWith("[")) componentType = "list";
                    else if (value.startsWith("(")) componentType = "tuple";
                    else if (value.startsWith("{")) componentType = "set";
                  }

                  const content =
                    componentType ? (
                      <ArcherElement
                        id={`source-${nodeId}-${key}`}
                        relations={[
                          {
                            targetId: `${componentType}-${nodeId}-${key}`,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeColor: "#C084FC", strokeWidth: 2 },
                          },
                        ]}
                      >
                        <span className="underline cursor-pointer text-purple-400">
                          {componentType === "list"
                            ? "[List]"
                            : componentType === "tuple"
                            ? "(Tuple)"
                            : "{Set}"}
                        </span>
                      </ArcherElement>
                    ) : typeof value === "object" ? (
                      <ArcherElement
                        id={`source-${nodeId}-${key}`}
                        relations={[
                          {
                            targetId: `child-${nodeId}-${key}`,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeColor: "black", strokeWidth: 2 },
                          },
                        ]}
                      >
                        <span className="underline cursor-pointer text-purple-400">[Object]</span>
                      </ArcherElement>
                    ) : (
                      <span className="text-[#C084FC]">{String(value)}</span>
                    );

                  return (
                    <tr
                      key={key}
                      className="hover:bg-gray-700 transition-colors border-b text-[#C084FC] border-r border-gray-500"
                    >
                      <td className="border border-gray-500 px-3 py-2 text-[#C084FC] w-1/2">{key}</td>
                      <td className="border border-gray-500 px-3 py-2 text-center w-1/2">{content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Column: Children */}
      <div className="ml-12 flex flex-col gap-5">
        {/* List / Tuple / Set children */}
        {Object.entries(data)
          .filter(
            ([_, value]) =>
              typeof value === "string" &&
              (value.startsWith("[") || value.startsWith("(") || value.startsWith("{"))
          )
          .map(([key, value]) => {
            const Component = value.startsWith("[")
              ? ListComponent
              : value.startsWith("(")
              ? TuplesComponent
              : SetComponent;

            return (
              <ArcherElement
                key={key}
                id={`${
                  value.startsWith("[") ? "list" : value.startsWith("(") ? "tuple" : "set"
                }-${nodeId}-${key}`}
              >
                <div className="rounded-md animate-scaleFadeIn bg-white">
                  <Component input={value} />
                </div>
              </ArcherElement>
            );
          })}

        {/* Nested object children */}
        {childKeys.map((childKey) => (
          <ArcherElement id={`child-${nodeId}-${childKey}`} key={childKey}>
            <div className="rounded-md animate-scaleFadeIn bg-white">
              <ArcherGenericObjectNode
                data={data[childKey]}
                nodeId={`child-${nodeId}-${childKey}`}
                type={(data[childKey] && data[childKey].type) || type}
              />
            </div>
          </ArcherElement>
        ))}
      </div>
    </div>
  );
};

export default ArcherGenericObjectNode;
