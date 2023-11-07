// ********* For accept Attributes ********
// Accept types List
// for only images - "image/*"
// for only video - "video/*"
// for images formates - ".jpg, .jpeg, .png"
// for video formates - ".mp4, .webm"
// for All Types - "*"

// ********* For capture Attributes ********
// "camera": This value captures media using the device's front-facing camera, typically used for capturing self-portraits or video calls.

// "user": This value captures media using the device's front-facing camera, typically used for capturing self-portraits or video calls.

// "environment": This value captures media using the device's rear-facing camera, usually used for capturing the environment or scenery.

// "user" or "environment": This value allows the user to choose between the front-facing and rear-facing cameras.

// "microphone": This value captures audio using the device's microphone.

const ShowOuterFileUploader = (props) => {
  const {
    fileRef,
    formikProp,
    acceptType,
    name,
    captureType,
    imageList,
    setImageList,
  } = props;

  const onImageChange = (event) => {
    let fileArray = [];
    if (event.target.files.length > 0) {
      const files = event.target.files;
      const existingFiles = [...formikProp.values[name]];

      for (let i = 0; i < files.length; i++) {
        existingFiles.push(files[i]);
        formikProp.setFieldValue(name, [...existingFiles]);

        if (files[i].type.indexOf("image") > -1) {
          fileArray.push({
            type: "image",
            url: URL.createObjectURL(files[i]),
          });
        } else if (files[i].type.indexOf("video") > -1) {
          fileArray.push({
            type: "video",
            url: URL.createObjectURL(files[i]),
          });
        } else if (files[i].type.indexOf("application") > -1) {
          fileArray.push({
            type: "file",
            url: URL.createObjectURL(files[i]),
            name: files[i].name,
          });
        } else if (files[i].type.indexOf("audio") > -1) {
          fileArray.push({
            type: "audio",
            url: URL.createObjectURL(files[i]),
            name: files[i].name,
          });
        }
      }
    }
    setImageList([...imageList, ...fileArray]);
  };

  return (
    <>
      <input
        ref={fileRef}
        hidden
        accept={acceptType ?? "image/*"}
        onChange={onImageChange}
        name={name}
        multiple
        capture={captureType ?? null}
        type="file"
      />
    </>
  );
};

export default ShowOuterFileUploader;
