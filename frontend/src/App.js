import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer/>
      <ToastContainer />
    </>
  );
};

export default App;
