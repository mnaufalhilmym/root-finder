import NewtonResult from "./NewtonResult";
import SecantResult from "./SecantResult";
import ModSecantResult from "./ModSecantResult";

export default function Result(props) {
  return (
    <div className="w-min max-w-full overflow-x-auto mx-auto p-4 border-2 border-black rounded whitespace-nowrap">
      <h4>Result</h4>
      {props.method === "newton" && <h5>Newton-Raphson Method</h5>}
      {props.method === "secant" && <h5>Secant Method</h5>}
      {props.method === "modsecant" && <h5>Modified Secant Method</h5>}
      {props.result === null && (
        <div className="flex w-min mx-auto mt-4">
          <svg
            className="animate-spin h-5 self-center"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h5 className="ml-3">Calculating</h5>
        </div>
      )}
      {props.result !== null && props.method === "newton" && (
        <NewtonResult data={props.data}/>
      )}
      {props.result !== null && props.method === "secant" && (
        <SecantResult data={props.data}/>
      )}
      {props.result !== null && props.method === "modsecant" && (
        <ModSecantResult data={props.data}/>
      )}
    </div>
  );
}
