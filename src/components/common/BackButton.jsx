import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "./iconify";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton onClick={() => navigate(-1)}>
        <Iconify icon="ion:arrow-back-circle-outline" width={28} />
      </IconButton>
    </>
  );
};

export default BackButton;
