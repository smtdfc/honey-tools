"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import MathDisplay from "@/components/MathDisplay";
import MathInput from "@/components/MathInput";
import { MathJSON } from "@/types/math/mathjson";
import axios from "axios";
import "katex/dist/katex.min.css";

async function simplify(expr: MathJSON): Promise<string> {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MATH_SERVER}/api/v1/simplify`,
    {
      expr,
    }
  );
  const body = res.data;
  const output = body.data.output;
  return output;
}

export default function Page() {
  const [expr, setExpr] = useState<MathJSON>([]);
  const [result, setResult] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  const submit = async () => {
    if (expr.length == 0) {
      setErrMsg("Please type expression ");
      return;
    }
    setErrMsg("");
    try {
      setResult(await simplify(expr));
    } catch {
      setErrMsg("Error");
    }
  };

  return (
    <div className="tool-box">
      <h1 className="title">Expression Simplifier</h1>
      <p className="box">
        This tool helps you <b>simplify mathematical expressions</b> instantly —
        whether they involve algebraic terms, trigonometric identities, or
        radicals. It’s powered by a symbolic math engine that understands LaTeX
        syntax and converts it into clean, minimal form.
      </p>

      <hr className="divider" />

      {errorMsg ? <div className="tool-error">{errorMsg}</div> : ""}

      <MathInput label="Expression:" onChange={setExpr} />

      <div className="btn-group mt-4">
        <button className="btn btn-left" onClick={submit}>
          Simplify
        </button>
      </div>

      <MathDisplay label="Result: " expr={result} />
    </div>
  );
}
