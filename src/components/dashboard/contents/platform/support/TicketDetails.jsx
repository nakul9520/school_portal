import React, { useEffect, useRef, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormHelperText,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Formik } from "formik";
import { isEmpty, map, truncate } from "lodash";
import moment from "moment/moment";

import ShowOuterFileUploader from "components/common/file-uploader/ShowOuterFileUploader";
import Iconify from "components/common/iconify";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";
import { toast } from "react-toastify";
import {
  getSupportTicketChat,
  postAddChatForAdmin,
} from "redux/store/slice/dashboard/contentSlice";
import { imageObj } from "services/images";

const MessageInfo = ({ data, messageOwner }) => {
  return (
    <Box className="mb-4">
      <Stack direction="row" className="gap-2 align-items-center mb-2">
        <Avatar
          src={data[messageOwner].user_profile}
          alt="user-avatar"
          sx={{ width: 35, height: 35 }}
        />
        <Box>
          <Typography variant="subtitle1">{data[messageOwner].name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(data.created_at).format("LL")}
          </Typography>
        </Box>
      </Stack>
      {data.description ? (
        <Typography variant="body2" className="text-break">
          {data.description}
        </Typography>
      ) : null}

      {map(data.sChatFile, (fileData, fileIndex) => (
        <React.Fragment key={fileIndex}>
          {fileData.file_type === "file" ? (
            <Stack
              direction="row"
              sx={{
                background: "primary.contrastText",
                p: 1.5,
                boxShadow: (theme) => theme.shadows[3],
                borderRadius: 2,
                width: 230,
                my: 1,
              }}
              className="align-items-center justify-content-between cursor-pointer"
            >
              <Stack direction="row" className="align-items-center gap-2">
                <Box component="img" src={imageObj.pdfIcon} />
                <Box>
                  <Typography variant="body2" className="mb-0">
                    {truncate(fileData.file_name, {
                      length: 15,
                    })}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: 10 }}
                  >
                    {fileData.file_size}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          ) : fileData.file_type === "Image" ? (
            <ImageThumbnail
              key={fileIndex}
              size={100}
              imagePath={fileData.file}
              sx={{ my: 2 }}
            />
          ) : fileData.file_type === "h_video" ? (
            <VedioThumbnail
              key={fileIndex}
              videoPath={fileData.file}
              size={80}
            />
          ) : null}
        </React.Fragment>
      ))}
    </Box>
  );
};

const TicketDetails = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const size = 80;
  const { state } = useLocation();

  const [mediaFileList, setMediaFileList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ticketstatus, setTicketstatus] = useState(state.status);

  const { supportTicketMessage } = useSelector((state) => state.content);
  console.log("state", state);
  console.log("supportTicketMessage", supportTicketMessage);

  const handleSelectOption = (statusType) => {
    setTicketstatus(statusType);
    dispatch(
      postAddChatForAdmin({
        discription: "",
        ticket_id: state.id,
        mark_complete: statusType,
      })
    );
  };

  useEffect(() => {
    dispatch(getSupportTicketChat({ ticket_id: state.id }));
  }, [dispatch, state.id]);

  const handleSupportChat = (data, action) => {
    dispatch(
      postAddChatForAdmin({
        ...data,
        ticket_id: state.id,
        mark_complete: 1,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status) {
          action.resetForm();
          action.setSubmitting(false);
          setMediaFileList([]);
          dispatch(getSupportTicketChat({ ticket_id: state.id }));
        }
      })
      .catch((err) => {
        action.resetForm();
        action.setSubmitting(false);
        toast.error(err.message);
      });
  };

  const handleRemoveFile = (formikProp, index) => {
    const updatedFiles = mediaFileList.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setMediaFileList(updatedFiles);
    formikProp.setFieldValue("file", updatedFiles);
  };
  return (
    <>
      <Card
        className="rounded-0 cursor-pointer"
        sx={{ boxShadow: (theme) => theme.shadows[1] }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Help
          </Typography>
          <Stack
            direction="row"
            className="align-items-center gap-1 justify-content-between mb-2"
          >
            <Stack direction="row" className="align-items-center gap-1">
              <Typography variant="subtitle1">Ticket Id. :</Typography>
              <Typography variant="subtitle1">{state.ticket_id}</Typography>
            </Stack>

            <Typography
              variant="body2"
              color={ticketstatus === "1" ? "warning.light" : "success.light"}
              className="fw-medium"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {ticketstatus === "1" ? "Pending" : "Completed"}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleSelectOption(1)}>Pending</MenuItem>
              <MenuItem onClick={() => handleSelectOption(2)}>
                Completed
              </MenuItem>
            </Menu>
          </Stack>

          <Box
            sx={{ height: "65vh", overflowY: "scroll", padding: 2 }}
            className="w-100"
          >
            {map(supportTicketMessage, (item, index) => (
              <MessageInfo
                key={index}
                data={item}
                messageOwner="senderDetails"
              />
            ))}
          </Box>
          {state.status === "1" ? (
            <Box sx={{ p: 2 }}>
              <Formik
                initialValues={{ description: "", images: [] }}
                onSubmit={(values, action) => {
                  handleSupportChat(values, action);
                }}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    {mediaFileList.length > 0 ? (
                      <Stack
                        direction="row"
                        className="gap-2 flex-wrap p-2 mb-1"
                        sx={{ backgroundColor: "primary.contrastText" }}
                      >
                        {map(mediaFileList, (item, index) =>
                          item.type === "image" ? (
                            <Box
                              key={index}
                              className="rounded position-relative cursor-pointer overflow-hidden"
                              sx={{
                                "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  backgroundColor: "rgba(0,0,0,0.3)",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src={item.url}
                                alt={`${item.type}_${index}`}
                                className="img-cover rounded position-relative"
                                sx={{
                                  width: size,
                                  height: size,
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  background: "rgba(255,255,255,.3)",
                                  color: "primary.contrastText",
                                  position: "absolute",
                                  top: "8%",
                                  right: "5%",
                                  transform: "translate(-8%, -5%)",
                                  zIndex: "2",
                                  "&:hover": {
                                    background: "rgba(255,255,255,.3)",
                                    color: "primary.contrastText",
                                  },
                                }}
                                onClick={() => handleRemoveFile(props, index)}
                              >
                                <Iconify icon="iconoir:cancel" width={18} />
                              </IconButton>
                            </Box>
                          ) : item.type === "video" ? (
                            <VedioThumbnail
                              key={index}
                              videoPath={item.url}
                              size={size}
                            />
                          ) : (
                            <Box
                              key={index}
                              sx={{
                                width: size,
                                height: size,
                                p: 1,
                                boxShadow: theme.shadows[3],
                              }}
                              className="rounded position-relative d-flex flex-column gap-1 align-items-center justify-content-center cursor-pointer"
                            >
                              <Box
                                component="img"
                                src={imageObj.documentIcon}
                                sx={{ width: 30 }}
                              />
                              <Typography variant="caption" key={index}>
                                {truncate(item.name, { length: 10 })}
                              </Typography>
                              <IconButton
                                size="small"
                                sx={{
                                  background: theme.palette.grey[300],
                                  color: "text.primary",
                                  position: "absolute",
                                  top: "8%",
                                  right: "5%",
                                  transform: "translate(-8%, -5%)",
                                  zIndex: "2",
                                  boxShadow: theme.shadows[2],
                                  "&:hover": {
                                    background: theme.palette.grey[300],
                                    color: "text.primary",
                                  },
                                }}
                                onClick={() => handleRemoveFile(props, index)}
                              >
                                <Iconify icon="iconoir:cancel" width={18} />
                              </IconButton>
                            </Box>
                          )
                        )}
                      </Stack>
                    ) : null}
                    <OutlinedInput
                      name="description"
                      value={props.values.description}
                      onChange={(e) =>
                        e.target.value.match(/^(?!\s+$).*/) &&
                        props.setFieldValue("description", e.target.value)
                      }
                      onBlur={props.handleBlur}
                      // startAdornment={
                      //   <InputAdornment position="start">
                      //     <IconButton
                      //       color="primary"
                      //       onClick={() => fileInputRef.current.click()}
                      //     >
                      //       <Iconify icon="eva:attach-2-fill" />
                      //     </IconButton>
                      //   </InputAdornment>
                      // }
                      endadornment={
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            type="submit"
                            disabled={
                              isEmpty(props.values.description) &&
                              isEmpty(props.values.file)
                            }
                          >
                            <Iconify icon="ic:round-send" />
                          </IconButton>
                        </InputAdornment>
                      }
                      size="small"
                      placeholder="Type Message"
                      fullWidth
                    />
                    {props.errors.description && props.touched.description ? (
                      <FormHelperText error>
                        {props.errors.description}
                      </FormHelperText>
                    ) : null}

                    <ShowOuterFileUploader
                      name="images"
                      formikProp={props}
                      maxFileUpload={3}
                      fileRef={fileInputRef}
                      imageList={mediaFileList}
                      setImageList={setMediaFileList}
                    />
                  </form>
                )}
              </Formik>
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default TicketDetails;
