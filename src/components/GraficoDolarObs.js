import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import React from "react";

const data = {
  values: [
    ["2017-01-24T00:00", 0.01],
    ["2017-01-24T01:00", 0.13],
    ["2017-01-24T02:00", 0.07],
    ["2017-01-24T03:00", 0.04],
    ["2017-01-24T04:00", 0.33],
    ["2017-01-24T05:00", 0],
    ["2017-01-24T06:00", 0],
    ["2017-01-24T07:00", 0],
    ["2017-01-24T08:00", 0.95],
    ["2017-01-24T09:00", 1.12],
    ["2017-01-24T10:00", 0.66],
    ["2017-01-24T11:00", 0.06],
    ["2017-01-24T12:00", 0.3],
    ["2017-01-24T13:00", 0.05],
    ["2017-01-24T14:00", 0.5],
    ["2017-01-24T15:00", 0.24],
    ["2017-01-24T16:00", 0.02],
    ["2017-01-24T17:00", 0.98],
    ["2017-01-24T18:00", 0.46],
    ["2017-01-24T19:00", 0.8],
    ["2017-01-24T20:00", 0.39],
    ["2017-01-24T21:00", 0.4],
    ["2017-01-24T22:00", 0.39],
    ["2017-01-24T23:00", 0.28]
  ]
};

export default class SimpleChart extends React.Component {
  render() {
    const series = new TimeSeries({
      name: "hilo_rainfall",
      columns: ["index", "precip"],
      points: data.values.map(([d, value]) => [
        Index.getIndexString("1h", new Date(d)),
        value
      ])
    });

    console.log("series is ", series);
    const style = styler([
      {
        key: "precip",
        color: "#A5C8E1",
        selected: "#2CB1CF"
      }
    ]);

    return (
      <Resizable>
        <ChartContainer timeRange={series.range()}>
          <ChartRow height="150">
            <YAxis
              id="rain"
              label="Rainfall (inches/hr)"
              min={0}
              max={2}
              format=".2f"
              width="70"
              type="linear"
            />
            <Charts>
              <LineChart
                axis="rain"
                style={style}
                spacing={1}
                columns={["precip"]}
                series={series}
                minBarHeight={1}
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}
