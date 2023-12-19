// custom styles
import "./styles/utility.css";
import "./styles/App.css";

// custom components

import ScrollToTop from "./components/common/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

//css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "yet-another-react-lightbox/styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import MomentUtils from "@date-io/moment";
import "moment/locale/tr"; // Turkish locale

function App() {
  return (
    <>
      <ScrollToTop />
      <LocalizationProvider dateAdapter={AdapterMoment} locale="tr" utils={MomentUtils}>
        <AppRoutes />
      </LocalizationProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // limit={3}
        pauseOnHover
      />
    </>
  );
}

export default App;
