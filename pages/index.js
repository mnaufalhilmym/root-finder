import Head from "next/head";
import { useState } from "react";

import Header from "../components/ui/Header";
import Result from "../components/result/Result";
import Footer from "../components/ui/Footer";
import Form from "../components/ui/Form";
import RemountResult from "../components/helper/RemountResult";

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [method, setMethod] = useState(null);
  const [data, setData] = useState(null);
  const [expertMode, setExpertMode] = useState(false);

  return (
    <>
      <Head>
        <title>Root Finder</title>
      </Head>
      <div className="w-screen overflow-x-auto">
        <div className="flex flex-col min-h-screen px-10 pt-10 pb-20 font-sans">
          <Header setExpertMode={setExpertMode} />
          <main className="text-center">
            <div className="w-min mx-auto my-10 whitespace-nowrap">
              <h2 className="font-black text-5xl sm:text-7xl">Root Finder</h2>
              <h3 className="sm:text-xl">
                Using Newton-Raphson or Secant Method
              </h3>
            </div>
            <Form
              setShowResult={setShowResult}
              setMethod={setMethod}
              setData={setData}
              expertMode={expertMode}
              display={expertMode}
            />
            {!showResult && method && (
              <RemountResult
                showResult={showResult}
                setShowResult={setShowResult}
              />
            )}
            {showResult && <Result method={method} data={data} />}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
