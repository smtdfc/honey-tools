"use client";
import React, { useEffect, useState } from "react";
import { Jimp } from "jimp";
import Input from "@/components/Input";
import Switch from "@/components/Switch";

type Properties = {
  blur: number;
  brightness: number;
  contrast: number;
  greyscale: boolean;
  invert: boolean;
  sepia: boolean;
  pixelate: number;
  rotate: number;
  flipH: boolean;
  flipV: boolean;
  normalize: boolean;
  opacity: number;
  posterize: number;
  gaussian: number;
};

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
  const [img, setImg] = useState<File | null>(null);
  const [errorMsg, setErrMsg] = useState("");
  const [properties, setProperties] = useState<Properties>({
    blur: 0,
    brightness: 0,
    contrast: 1,
    greyscale: false,
    invert: false,
    sepia: false,
    pixelate: 0,
    rotate: 0,
    flipH: false,
    flipV: false,
    normalize: false,
    opacity: 1,
    posterize: 0,
    gaussian: 0,
  });
  const [output, setOutput] = useState("");

  const handleFile = (_: any, e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (!file) return;
    setSelectedFile(URL.createObjectURL(file));
    setImg(file);
  };

  useEffect(() => {
    if (!img) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        if (!data || !(data instanceof ArrayBuffer)) return;

        const image = await Jimp.fromBuffer(data);

        properties.blur > 0 && image.blur(properties.blur);
        properties.brightness !== 0 && image.brightness(properties.brightness);
        properties.contrast !== 1 && image.contrast(properties.contrast);
        properties.greyscale && image.greyscale();
        properties.invert && image.invert();
        properties.sepia && image.sepia();
        properties.pixelate > 0 && image.pixelate(properties.pixelate);
        properties.rotate !== 0 && image.rotate(properties.rotate);
        properties.flipH &&
          image.flip({
            horizontal: true,
          });
        properties.flipV &&
          image.flip({
            vertical: true,
          });
        properties.normalize && image.normalize();
        properties.opacity !== 1 && image.opacity(properties.opacity);
        properties.posterize > 0 && image.posterize(properties.posterize);
        properties.gaussian > 0 && image.gaussian(properties.gaussian);

        const base64 = await image.getBase64("image/png");
        setOutput(base64);
      } catch {
        setErrMsg("Error");
      }
    };

    reader.readAsArrayBuffer(img);
  }, [img, properties]);

  return (
    <div className="container">
      <Input
        value={selectedFile}
        label="Select File"
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      <div className="img-container">
        {selectedFile && <img src={selectedFile} alt="Input" />}
        {output && <img src={output} alt="Output" />}
      </div>

      <div className="controls">
        <Input
          value={properties.blur}
          label="Blur"
          type="number"
          onChange={(v) => setProperties({ ...properties, blur: parseInt(v) })}
        />
        <Input
          value={properties.brightness}
          label="Brightness"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, brightness: parseFloat(v) })
          }
        />
        <Input
          value={properties.contrast}
          label="Contrast"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, contrast: parseFloat(v) })
          }
        />
        <Input
          value={properties.pixelate}
          label="Pixelate"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, pixelate: parseInt(v) })
          }
        />
        <Input
          value={properties.rotate}
          label="Rotate"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, rotate: parseInt(v) })
          }
        />
        <Input
          value={properties.opacity}
          label="Opacity"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, opacity: parseFloat(v) })
          }
        />
        <Input
          value={properties.posterize}
          label="Posterize"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, posterize: parseInt(v) })
          }
        />
        <Input
          value={properties.gaussian}
          label="Gaussian"
          type="number"
          onChange={(v) =>
            setProperties({ ...properties, gaussian: parseInt(v) })
          }
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            columnGap: "10px",
          }}
        >
          <Switch
            value={properties.greyscale}
            label="Greyscale"
            onChange={(v) => setProperties({ ...properties, greyscale: v })}
          />

          <Switch
            value={properties.invert}
            label="Invert"
            onChange={(v) => setProperties({ ...properties, invert: v })}
          />

          <Switch
            value={properties.sepia}
            label="Sepia"
            onChange={(v) => setProperties({ ...properties, sepia: v })}
          />
          <Switch
            value={properties.flipH}
            label="Flip Horizontal"
            onChange={(v) => setProperties({ ...properties, flipH: v })}
          />
          <Switch
            value={properties.flipV}
            label="Flip Vertical"
            onChange={(v) => setProperties({ ...properties, flipV: v })}
          />
          <Switch
            value={properties.normalize}
            label="Normalize"
            onChange={(v) => setProperties({ ...properties, normalize: v })}
          />
        </div>
      </div>

      <div className="btn-group mt-4">
        <button
          className="btn btn-left"
          onClick={() => downloadImage(output, img?.name)}
        >
          Download
        </button>
      </div>
    </div>
  );
}
