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
    <div className="tool-box">
      <h1 className="title">Integrate</h1>
      <p className="box">
        This powerful integration tool allows you to enter any mathematical
        expression and compute its indefinite or definite integral efficiently.
        It supports a wide range of functions including polynomials,
        trigonometric functions, logarithmic functions, exponential functions,
        and combinations thereof. Simply specify the variable of integration
        and, if needed, the lower and upper limits to obtain precise results
        instantly. Whether you are a student, educator, or professional, this
        tool simplifies the process of solving integrals, providing clear and
        accurate outputs formatted for easy reading.
      </p>

      <hr className="divider" />

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
    </div>
  );
}
