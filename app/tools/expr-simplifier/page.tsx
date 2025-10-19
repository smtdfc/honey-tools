"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const MathKeyboard = dynamic(() => import("@/components/MathKeyboard"), {
  ssr: false,
});

export default function Page() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const simplify = async () => {
    if (expr.length == 0) {
      setErrMsg("Please type expression ");
      return;
    }
    setErrMsg("");
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_MATH_SERVER
        }/api/v1/simplify?expr=${encodeURIComponent(expr)}`
      );
      const body = await res.json();
      setResult(body.data.output ?? "Invalid expression");
    } catch (err) {
      setErrMsg("Error simplifying expression");
      console.error(err);
    }
  };

  return (
    <div className="tool-box">
      <h1 className="title">🧮 Expression Simplifier</h1>
      <p className="box">
        This tool helps you <b>simplify mathematical expressions</b> instantly —
        whether they involve algebraic terms, trigonometric identities, or
        radicals. It’s powered by a symbolic math engine that understands LaTeX
        syntax and converts it into clean, minimal form.
      </p>

      <hr className="divider" />
      <br />
      {errorMsg ? <div className="tool-error">{errorMsg}</div> : ""}

      <label className="block font-semibold mb-2">Expression:</label>
      <MathKeyboard onChange={setExpr} />

      <div className="btn-group mt-4">
        <button className="btn btn-left" onClick={simplify}>
          Simplify
        </button>
      </div>

      <label className="block font-semibold mt-6">Result:</label>
      <div className="mt-2">
        {result ? (
          <BlockMath math={result} />
        ) : (
          <i className="sub-text">Please enter expression to simplify</i>
        )}
      </div>
    </div>
  );
}
