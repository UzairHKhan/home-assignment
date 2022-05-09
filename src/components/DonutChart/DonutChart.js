import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";

function DonutChart({ data }) {
  const option = {
    title: {
      text: "Grouped Findings By Severity",
      subtext: "Grouped Findings By Severity that are on me",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 10,
      left: "center",
      data: ["critical", "high", "medium", "low"],
    },
    series: [
      {
        type: "pie",
        radius: ["20%", "60%"],
        areaStyle: {
          backgroundColor: "red",
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          formatter: "{c}",
          position: "inside",
          fontWeight: "bold",
        },
        labelLine: {
          show: true,
        },
        data,
        colorBy: "data",
      },
    ],
  };
  const onReady = (e) => {
    console.log(e);
    e.resize({
      width: "auto",
      height: "500px",
    });
  };
  return (
    <PieChartContainer>
      <ReactEcharts option={option} onChartReady={onReady} />
    </PieChartContainer>
  );
}

const PieChartContainer = styled(Paper)`
  margin-top: 20px;
  height: 500px;
`;

export default DonutChart;
