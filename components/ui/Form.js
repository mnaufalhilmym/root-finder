import { createRef, useEffect } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

import Input from "./Input";

export default function ExpertForm(props) {
  const fElement = createRef();

  useEffect(() => {
    if (fElement.current) {
      fElement.current.focus();
    }
  }, []);

  async function generateResult(event) {
    const f = math.parse(event.target["main-function"].value.trim());
    let df = event.target["derivative-function"].value.trim();
    let x_1 = event.target["guess-root-1"].value.trim();
    let x0 = event.target["guess-root0"].value.trim();
    x0 = x0 ? x0 : 1;
    let e = event.target["error"].value.trim();
    e = e ? e : 0.001;
    let p = event.target["precision"].value.trim();
    let i = event.target["iterate"].value.trim();
    i = i ? i : 40;

    if (x_1 !== "") {
      props.setMethod("secant");
    } else {
      props.setMethod("newton");
      if (df === "") {
        try {
          const x = math.parse("x");
          df = math.derivative(f, x);
        } catch (e) {
          console.log(e);
        }
        if (df === null) {
          props.setMethod("modsecant");
        }
      } else {
        try {
          df = math.parse(df);
        } catch (e) {
          console.log(e);
        }
        if (df === null) {
          props.setMethod("modsecant");
        }
      }
    }

    props.setData({
      f: f,
      df: df,
      x_1: x_1,
      x0: x0,
      e: e,
      p: p,
      i: i,
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    props.setShowResult(false);
    generateResult(event);
  }

  return (
    <>
      <form
        className="w-min mx-auto my-5"
        onSubmit={submitHandler}
      >
        <div className="my-1">
          <Input
            display={true}
            label="f(x)="
            id="main-function"
            type="text"
            placeholder="25e^(-0.2x)cos(3x-0.312)"
            required={true}
            ref={fElement}
          ></Input>
          <Input
            display={props.display}
            label="f'(x)="
            id="derivative-function"
            type="text"
            placeholder="If any"
          ></Input>
          <Input
            display={props.display}
            label="Guess root x<sub>-1</sub>="
            id="guess-root-1"
            type="number"
            step="any"
            placeholder="For Secant method"
          ></Input>
          <Input
            display={props.display}
            label="Guess root x<sub>0</sub>="
            id="guess-root0"
            type="number"
            step="any"
            placeholder="Default is 1"
            defaultValue={1}
          />
          <Input
            display={props.display}
            label="Error(ε)="
            id="error"
            type="number"
            min="0"
            step="any"
            placeholder="Default is 0.001"
            defaultValue={0.001}
          />
          <Input
            display={props.display}
            label="Precision="
            id="precision"
            type="number"
            min="1"
            step="any"
            placeholder="Significant figures"
          />
          <Input
            display={props.display}
            label="Iterate="
            id="iterate"
            type="number"
            min="1"
            step="1"
            placeholder="Default is 40"
          />
        </div>
        <button
          className="my-1 px-1 border-2 border-black rounded"
          type="submit"
        >
          Proceed
        </button>
      </form>
    </>
  );
}
