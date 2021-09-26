import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export default function Graph(props) {
  useEffect(() => {
    props.setIsPlotted(true);
  }, []);
  let { f, x } = props.data;

  const [xPlot, setXPlot] = useState({
    min: x - 0.5 * x,
    max: x + 0.5 * x,
    scale: x ? x / 50 : 100,
  });

  let xValues = math.range(xPlot.min, xPlot.max, xPlot.scale).toArray();
  let yValues = xValues.map((xVal) => f.evaluate({ x: xVal }));

  function updateHandler(figure) {
    const xplot = {
      min: figure.layout.xaxis.range[0],
      max: figure.layout.xaxis.range[1],
      scale:
        (figure.layout.xaxis.range[0] + figure.layout.xaxis.range[1]) / 500,
    };

    if (
      math.abs(xPlot.min - xplot.min) % 10 >
        0.01 * (math.abs(xPlot.min) % 10) &&
      math.abs(xPlot.max - xplot.max) % 10 > 0.01 * (math.abs(xPlot.max) % 10)
    ) {
      setXPlot({
        min: xplot.min,
        max: xplot.max,
        scale:
          xplot.min - xplot.max ? math.abs(xplot.min - xplot.max) / 100 : 100,
      });
    }
  }

  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: "scatter",
          mode: "lines",
          marker: { color: "red" },
        },
      ]}
      layout={{
        uirevision: true,
        dragmode: "pan",
      }}
      onUpdate={(figure) => updateHandler(figure)}
    />
  );
}
