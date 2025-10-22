"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import MathDisplay from "@/components/MathDisplay";
import MathInput from "@/components/MathInput";
import { MathJSON } from "@/types/math/mathjson";
import axios from "axios";
import "katex/dist/katex.min.css";

async function diff(
  expr: MathJSON,
  variable: string = "x",
  order: number = 1
): Promise<string> {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MATH_SERVER}/api/v1/diff`,
    {
      expr,
      var: variable,
      order,
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
  const [order, setOrder] = useState(1);

  const submit = async () => {
    if (expr.length == 0) {
      setErrMsg("Please type expression ");
      return;
    }

    setErrMsg("");
    try {
      setResult(await diff(expr, variable, order));
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

      <Input
        type="text"
        value={order.toString()}
        label="Order:"
        onChange={(v) => setOrder(parseInt(v))}
      />

      <div className="btn-group mt-4">
        <button className="btn btn-left" onClick={submit}>
          Derivative
        </button>
      </div>

      <MathDisplay label="Result: " expr={result} />
    </>
  );
}
