import { useMemo } from "react";
import DonutChart from "./components/DonutChart/DonutChart";
import data from "./data/grouped_findings.json";
import colorHash from "./helper/colorHash";
import Table from "./components/Table/Table";

function App() {
  const mappedData = useMemo(() => {
    const d = {};
    data.features.forEach((f) => {
      if (!d[f.properties.severity]) {
        d[f.properties.severity] = {
          name: f.properties.severity,
          value: 0,
          itemStyle: {
            color: colorHash[f.properties.severity],
          },
        };
      }
      d[f.properties.severity].value += f.properties.progress;
    });
    return Object.values(d);
  }, []);
  return (
    <>
      <Table />
      <DonutChart data={mappedData} />
    </>
  );
}

export default App;
