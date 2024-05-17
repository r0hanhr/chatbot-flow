import { ToastContainer } from "react-toastify";
import "./App.css";
import LayoutComponent from "./Components/LayoutComponent";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <LayoutComponent />
    </>
  );
}

export default App;
