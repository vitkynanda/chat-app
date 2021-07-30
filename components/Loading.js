import ReactLoading from "react-loading";

import Image from "next/Image.js";

export default function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src="/whatsapp.png" alt="whatsapp-logo" width={50} height={50} />
        <ReactLoading type="bubbles" color="#93d9a3" height={200} width={100} />
      </div>
    </center>
  );
}
