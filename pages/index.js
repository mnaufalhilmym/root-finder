import Head from "next/head";
import { useState } from "react";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

import Header from "../components/UI/Header";
import Result from "../components/Result/Result";
import Footer from "../components/UI/Footer";
import Form from "../components/UI/Form";

export default function Home() {
  const [calculate, setCalculate] = useState(false);
  const [method, setMethod] = useState(null);
  const [data, setData] = useState(null);
  const [expertMode, setExpertMode] = useState(false);

  function changeMode(event) {
    setExpertMode(event.target.checked);
  }

  function generateResult(event) {
    const f = math.parse(event.target["main-function"].value.trim());
    let df = event.target["derivative-function"].value.trim();
    let x_1 = event.target["guess-root-1"].value.trim();
    let x0 = event.target["guess-root0"].value.trim();
    x0 = expertMode ? x0 : 1;
    let e = event.target["error"].value.trim();
    e = e ? e : 0.001;
    let p = event.target["precision"].value.trim();
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
      <div className="flex flex-col min-h-screen px-10 pt-10 pb-20 font-sans">
        <Header changeMode={changeMode} />
        <main className="text-center">
          <div className="w-min mx-auto my-10 whitespace-nowrap">
            <h2 className="font-black text-7xl">Root Finder</h2>
            <h3 className="text-xl">Using Newton-Raphson or Secant Method</h3>
          </div>
          <form className="w-min mx-auto my-5 transition-all" onSubmit={submitHandler}>
            <div className="my-1 transition-all">
              <Form display={expertMode}/>
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
      </div>
      <Footer />
    </>
  );
}
