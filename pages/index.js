import Head from "next/head";
import { useState } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

import Input from "../components/UI/Input";
import Result from "../components/Result";

export default function Home() {
  const [calculate, setCalculate] = useState(false);
  const [method, setMethod] = useState(null);
  const [data, setData] = useState(null);

  function generateResult(event) {
    const f = math.parse(event.target["main-function"].value.trim());
    let df = event.target["derivative-function"].value.trim();
    const x_1 = event.target["guess-root-1"].value.trim();
    const x0 = event.target["guess-root0"].value.trim();
    let e = event.target["error"].value.trim();
    e = e ? e : 0.001;
    const p = event.target["precision"].value.trim();
    let i = event.target["iterate"].value.trim();
    i = i ? i : 40;

    if (x_1 !== "") {
      setMethod("secant");
    } else {
      setMethod("newton");
      if (df === "") {
        try {
          const x = math.parse("x");
          df = math.derivative(f, x);
        } catch (e) {
          alert(e);
        }
        if (df === null) {
          setMethod("modsecant");
        }
      } else {
        try {
          df = math.parse(df);
        } catch (e) {
          alert(e);
          return;
        }
        if (df === null) {
          setMethod("modsecant");
        }
      }
    }

    setData({
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
    setCalculate(true);
    generateResult(event);
  }

  return (
    <>
      <Head>
        <title>Root Finder</title>
      </Head>

      <div className="flex flex-col min-h-screen p-10 font-sans">
        <header className="mb-16">
          <h1 className="table-caption font-black">Root Finder</h1>
        </header>
        <main className="text-center">
          <div className="w-min mx-auto my-10 whitespace-nowrap">
            <h2 className="font-black text-7xl">Root Finder</h2>
            <h3 className="text-xl">Using Newton-Raphson or Secant Method</h3>
          </div>
          <form className="w-min mx-auto my-5" onSubmit={submitHandler}>
            <div className="my-1">
              <Input
                label="f(x)="
                id="main-function"
                type="text"
                placeholder="e^(-x)-x"
                required={true}
              ></Input>
              <Input
                label="f'(x)="
                id="derivative-function"
                type="text"
                placeholder="If any"
              ></Input>
              <Input
                label="Guess root x<sub>-1</sub>="
                id="guess-root-1"
                type="number"
                step="any"
                placeholder="For Secant method"
              ></Input>
              <Input
                label="Guess root x<sub>0</sub>="
                id="guess-root0"
                type="number"
                step="any"
                placeholder="Required"
                required={true}
              />
              <Input
                label="Error(ε)="
                id="error"
                type="number"
                min="0"
                step="any"
                placeholder="Default is 0.001"
              />
              <Input
                label="Precision="
                id="precision"
                type="number"
                min="1"
                step="any"
                placeholder="Significant figures"
              />
              <Input
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

          {calculate && <Result method={method} data={data} />}
        </main>

        <footer className="w-min mx-auto mt-20 -mb-5 whitespace-nowrap">
          Made with 🐧 by&nbsp;
          <a href="https://hilmy.dev" target="_blank" rel="noopener noreferrer">
            Muhammad Naufal Hilmy Makarim
          </a>
        </footer>
      </div>
    </>
  );
}
