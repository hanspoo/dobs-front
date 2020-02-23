import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";
import React from "react";

export default function GraficoDolarObs({ dolares }) {
  const normalizado = dolares.map(({ fecha, paridad }) => [
    new Date(fecha).getTime(),
    paridad
  ]);

  console.log(normalizado);
  const series = new TimeSeries({
    name: "hilo_rainfall",
    columns: ["time", "paridad"],
    points: normalizado
  });

  const style = styler([{ key: "paridad", color: "steelblue", width: 2 }]);

  return (
    <Resizable>
      <ChartContainer timeRange={series.range()}>
        <ChartRow height="600">
          <YAxis
            id="paridad"
            label="US$"
            min={0}
            max={1000}
            width="70"
            type="linear"
          />
          <Charts>
            <LineChart
              columns={["paridad"]}
              series={series}
              axis="paridad"
              style={style}
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    </Resizable>
  );
}
