import React from "react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import styles from "styles/component.module.css";
import { IconButton } from "@mui/material";
import Iconify from "../iconify/Iconify";

const VideoLightBox = (props) => {
  const {
    open,
    setOpen,
    setOptions,
    videosList,
    pluginList = [],
    ...rest
  } = props;

  const options = {
    controls: true,
    playsInline: true,
    autoPlay: true,
    loop: false,
    muted: false,
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    controlsList: "nodownload" | "nofullscreen" | "noremoteplayback",
    preload: "auto",
  };
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        className={styles.lightbox}
        slides={[...videosList]}
        plugins={[Video, ...pluginList]}
        video={{ ...options, setOptions }}
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
                width: 40,
                height: 40,
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

export default VideoLightBox;
