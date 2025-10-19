"use client";
import React, { useState } from "react";
import "katex/dist/katex.min.css";
import Input from "@/components/Input";
import MathDisplay from "@/components/MathDisplay";
import MathInput from "@/components/MathInput";

export default function Page() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [variable, setVariable] = useState("x");
  const [level, setLevel] = useState(1);

  const diff = async () => {
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
      setErrMsg("Error");
      console.error(err);
    }
  };

  return (
    <div className="tool-box">
      <h1 className="title">Derivative</h1>
      <p className="box">
        A powerful tool for computing derivatives, helping you quickly find the
        derivative of any mathematical expression. Supports multivariable
        functions, trigonometric, logarithmic, and exponential forms.
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

      <Input
        type="text"
        value={level.toString()}
        label="Level:"
        onChange={(v) => setLevel(parseInt(v))}
      />

      <div className="btn-group mt-4">
        <button className="btn btn-left" onClick={diff}>
          Derivative
        </button>
      </div>

      <MathDisplay label="Result: " expr={result} />
    </div>
  );
}
