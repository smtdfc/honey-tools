"use client";
import React, { useEffect, useState } from "react";
import { Jimp } from "jimp";
import Input from "@/components/Input";

function downloadImage(dataUrl: string, filename = "image.png") {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function Page() {
  const [selectedFile, setSelectedFile] = useState("");
  const [img, setImg] = useState<File>();
  const [size, setSize] = useState<{ w: Number; h: number }>({
    w: 1000,
    h: 1000,
  });
  const [output, setOutput] = useState("");
  const [errorMsg, setErrMsg] = useState("");

  function handleFile(_: any, e?: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(URL.createObjectURL(file));
    setImg(file);
  }

  useEffect(() => {
    if (!img) return;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result;
      try {
        if (!data || !(data instanceof ArrayBuffer)) {
          return;
        }

        const image = await Jimp.fromBuffer(data);

        image.resize({ w: Number(size.w), h: Number(size.h) });

        setOutput(await image.getBase64("image/png"));
      } catch {
        setErrMsg("Error");
      }
    };

    reader.readAsArrayBuffer(img);
  }, [img, size]);

  const download = () => {
    downloadImage(output, img?.name);
  };

  return (
    <>
      {errorMsg ? <div className="tool-error">{errorMsg}</div> : ""}
      <Input
        value={selectedFile}
        label="Select File"
        type="file"
        accept="file"
        onChange={handleFile}
      />

      <div className="img-container">
        {selectedFile && <img src={selectedFile} alt="Input" />}
      </div>

      <div>
        <Input
          value={size.w.toString()}
          label="Width"
          type="number"
          onChange={(v) => setSize({ ...size, w: parseInt(v) })}
        />
        <Input
          value={size.h.toString()}
          label="Height"
          type="number"
          accept="file"
          onChange={(v) => setSize({ ...size, h: parseInt(v) })}
        />
      </div>

      <div className="btn-group mt-4">
        <button onClick={download} className="btn btn-left">
          Save
        </button>
      </div>
    </>
  );
}
