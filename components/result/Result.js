import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import NewtonResult from "./NewtonResult";
import SecantResult from "./SecantResult";
import ModSecantResult from "./ModSecantResult";
import Loading from "../ui/Loading";
import RootResult from "./RootResult";

const DynamicPlot = dynamic(() => import("./Graph"), { ssr: false }); //dynamic import without ssr

export default function Result(props) {
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);
  const [isPlotted, setIsPlotted] = useState(false);

  return (
    !isError && (
      <div className="w-min max-w-full overflow-x-auto mx-auto p-4 border-2 border-black rounded whitespace-nowrap">
        <h4>Result</h4>
        {props.method === "newton" && <h5>Newton-Raphson Method</h5>}
        {props.method === "secant" && <h5>Secant Method</h5>}
        {props.method === "modsecant" && <h5>Modified Secant Method</h5>}
        {!result && <Loading>Calculating</Loading>}
        {props.method === "newton" && (
          <NewtonResult data={props.data} setResult={setResult} setIsError={setIsError}/>
        )}
        {props.method === "secant" && (
          <SecantResult data={props.data} setResult={setResult} setIsError={setIsError} />
        )}
        {props.method === "modsecant" && (
          <ModSecantResult data={props.data} setResult={setResult} setIsError={setIsError} />
        )}
        {result && <RootResult p={result.p} root={result.root} />}
        {!isPlotted && <Loading>Processing graph</Loading>}
        {result && (
          <DynamicPlot
            data={{ f: result.f, x: result.root }}
            setIsPlotted={setIsPlotted}
          />
        )}
      </div>
    )
  );
}
