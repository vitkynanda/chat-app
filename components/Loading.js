import ReactLoading from "react-loading";

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
        <ImageLoading src="/whatsapp.png" alt="whatsapp-logo" />
        <ReactLoading type="bubbles" color="#93d9a3" height={200} width={100} />
      </div>
    </center>
  );
}
const ImageLoading = styled.img``;
