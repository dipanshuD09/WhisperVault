import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
