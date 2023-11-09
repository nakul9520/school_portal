import React from "react";

import Lightbox from "yet-another-react-lightbox";
import styles from "styles/component.module.css";
import { IconButton } from "@mui/material";
import Iconify from "../iconify/Iconify";

const ImageLightBox = (props) => {
  const { open, setOpen, imageList, pluginList = [], ...rest } = props;

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        className={styles.lightbox}
        slides={[...imageList]}
        plugins={[...pluginList]}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        render={{
          buttonPrev: () => {
            return null;
          },
          buttonNext: () => {
            return null;
          },
          buttonClose: (e) => (
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                backgroundColor: (theme) => theme.palette.grey[600],
                color: "primary.contrastText",
                "&:hover,&:focus": {
                  backgroundColor: (theme) => theme.palette.grey[600],
                  color: "primary.contrastText",
                },
              }}
              size="small"
            >
              <Iconify icon="material-symbols:close-rounded" />
            </IconButton>
          ),
        }}
        {...rest}
      />
    </>
  );
};

export default ImageLightBox;
