import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Sticker({
  sticker_url,
  width = "100%",
  height = "100%",
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fecthSticker() {
      try {
        const { data } = await axios.get(sticker_url, { responseType: "blob" });
        setUrl(URL.createObjectURL(data));
      } catch {
        ///
      }
    }

    if (sticker_url) {
      fecthSticker();
    }
  }, [sticker_url]);

  if (!url) {
    return null;
  }

  return (
    <div className="container">
      <Image src={url} alt="#" />
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
