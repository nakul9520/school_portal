import { useState } from "react";

import { Box, IconButton } from "@mui/material";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Iconify from "../iconify/Iconify";
import VideoLightBox from "../lightbox/VideoLightBox";

const VedioThumbnail = (props) => {
  const { videoPath, size = 150, sx } = props;
  const [open, setOpen] = useState(false);
  const videos = [
    {
      type: "video",
      width: 980,
      height: 720,
      sources: [
        {
          src: videoPath,
          type: "video/mp4",
        },
      ],
    },
  ];
  return (
    <>
      <Box
        className="position-relative rounded overflow-hidden w-fit-content"
        sx={{
          "&::after": {
            content: `" "`,
            position: "absolute",
            background: "#0000003b",
            width: "100%",
            height: "100%",
            top: "0%",
            left: "0%",
            transform: "translate(-0%, -0%)",
            zIndex: 1,
          },
          ...sx,
        }}
      >
        <video
          src={videoPath}
          className="rounded"
          width={size}
          height={size}
          sx={{ ...sx }}
        />
        <IconButton
          sx={{
            background: "rgba(255,255,255,.3)",
            color: "primary.contrastText",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "2",
          }}
          onClick={() => setOpen(true)}
        >
          <Iconify icon="material-symbols:play-arrow-rounded" />
        </IconButton>
      </Box>
      <VideoLightBox
        pluginList={[Captions, Fullscreen]}
        videosList={videos}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default VedioThumbnail;
