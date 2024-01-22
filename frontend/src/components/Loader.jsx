import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner
        style={{
          width: 50,
          height: 50,
        }}
        animation="grow"
      />
    </div>
  );
};

export default Loader;
