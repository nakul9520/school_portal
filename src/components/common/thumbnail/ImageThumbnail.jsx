import { useState } from "react";

import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ImageLightBox from "../lightbox/ImageLightBox";

const ImageThumbnail = (props) => {
  const { imagePath, size = 120, sx } = props;
  const [open, setOpen] = useState(false);
  const imageList = [
    {
      type: "image",
      src: imagePath,
      alt: "image 1",
      width: 840,
    },
  ];
  return (
    <>
      <Box
        component={LazyLoadImage}
        effect="black-and-white"
        threshold={200}
        delayTime={500}
        src={imagePath}
        alt="avidance-img"
        sx={{ width: size, height: size, ...sx }}
        className="img-cover rounded cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <ImageLightBox
        fullscreen
        imageList={imageList}
        open={open}
        setOpen={setOpen}
        config={{
          showPrevButton: false,
          showNextButton: false,
        }}
      />
    </>
  );
};

export default ImageThumbnail;
