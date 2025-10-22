"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import MathDisplay from "@/components/MathDisplay";
import MathInput from "@/components/MathInput";
import { MathJSON } from "@/types/math/mathjson";
import axios from "axios";
import "katex/dist/katex.min.css";

async function integrate(
  expr: MathJSON,
  variable: string = "x",
  a: MathJSON = [0],
  b: MathJSON = [0]
): Promise<string> {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MATH_SERVER}/api/v1/integrate`,
    {
      expr,
      var: variable,
      a,
      b,
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
  const [variable, setVariable] = useState("x");
  const [a, setA] = useState<MathJSON>([]);
  const [b, setB] = useState<MathJSON>([]);

  const submit = async () => {
    if (expr.length == 0) {
      setErrMsg("Please type expression ");
      return;
    }

    setErrMsg("");
    try {
      setResult(await integrate(expr, variable, a, b));
    } catch {
      setErrMsg("Error");
    }
  };

  return (
    <>
      {errorMsg ? <div className="tool-error">{errorMsg}</div> : ""}
      <MathInput label="Expression:" onChange={setExpr} />

      <Input
        type="text"
        value={variable}
        label="Variable:"
        onChange={(v) => setVariable(v)}
      />

      <MathInput label="A:" onChange={setA} />
      <MathInput label="B:" onChange={setB} />

      <div className="btn-group mt-4">
        <button className="btn btn-left" onClick={submit}>
          Integrate
        </button>
      </div>

      <MathDisplay label="Result: " expr={result} />

      <hr className="divider" />
    </>
  );
}
