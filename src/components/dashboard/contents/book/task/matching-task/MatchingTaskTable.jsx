import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

import { isEmpty, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify/Iconify";
import { useState } from "react";
import {
  deleteMatchingTask,
  getMatchingTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import AddMatchingQuestions from "./AddMatchingQuestions";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";
import { FILE_TYPE } from "services/constant";
import { imageObj } from "services/images";

const MatchingTaskTable = () => {
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const { matchingTaskInfo, loading } = useSelector((state) => state.content);
  const matchingTaskList = matchingTaskInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteMatchingTask({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getMatchingTaskList(param));
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  return (
    <>
      <Box className="text-right">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditContent({});
            setOpen(true);
          }}
        >
          Add Task
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        className="rounded-0 mt-3 scrollbar-none"
        sx={{ maxHeight: 350 }}
      >
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell className="" color="text.primary">
                Sıra
              </StyledTableCell>
              <StyledTableCell align="left">Question</StyledTableCell>
              <StyledTableCell align="left">Options1</StyledTableCell>
              <StyledTableCell align="left">Options2</StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={9}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(matchingTaskList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              matchingTaskList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.question_type === FILE_TYPE.text ? (
                      <Typography variant="subtitle2">
                        {row.question}
                      </Typography>
                    ) : row.question_type === FILE_TYPE.image ? (
                      <ImageThumbnail
                        key={1}
                        size={80}
                        imagePath={row.question}
                      />
                    ) : row.question_type === FILE_TYPE.video ? (
                      <VedioThumbnail
                        key={index}
                        videoPath={row.question}
                        size={80}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          p: 1,
                          boxShadow: theme.shadows[3],
                          backgroundColor: theme.palette.background.paper,
                        }}
                        className="rounded position-relative d-flex flex-column gap-3 align-items-center justify-content-center cursor-pointer"
                      >
                        <Box
                          component="img"
                          src={imageObj.audioIcon}
                          sx={{ width: 40 }}
                          onClick={() => {
                            window.open(row.question, "_blank");
                          }}
                        />
                      </Box>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Stack direction="column" className="gap-2">
                      {map(row.left_column, (item, optionIndex) =>
                        item.left_column_type === FILE_TYPE.text ? (
                          <Typography variant="subtitle2">
                            {item.data}
                          </Typography>
                        ) : item.left_column_type === FILE_TYPE.image ? (
                          <ImageThumbnail
                            key={optionIndex}
                            size={40}
                            imagePath={item.data}
                          />
                        ) : item.left_column_type === FILE_TYPE.video ? (
                          <VedioThumbnail
                            key={optionIndex}
                            videoPath={item.data}
                            size={40}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              p: 1,
                              boxShadow: theme.shadows[3],
                              backgroundColor: theme.palette.background.paper,
                            }}
                            className="rounded position-relative d-flex flex-column gap-3 align-items-center justify-content-center cursor-pointer"
                          >
                            <Box
                              component="img"
                              src={imageObj.audioIcon}
                              sx={{ width: 40 }}
                              onClick={() => {
                                window.open(row.data, "_blank");
                              }}
                            />
                          </Box>
                        )
                      )}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Stack direction="column" className="gap-2">
                      {map(row.right_column, (item, optionIndex) =>
                        item.right_column_type === FILE_TYPE.text ? (
                          <Typography variant="subtitle2">
                            {item.data}
                          </Typography>
                        ) : item.right_column_type === FILE_TYPE.image ? (
                          <ImageThumbnail
                            key={optionIndex}
                            size={40}
                            imagePath={item.data}
                          />
                        ) : item.right_column_type === FILE_TYPE.video ? (
                          <VedioThumbnail
                            key={optionIndex}
                            videoPath={item.data}
                            size={40}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              p: 1,
                              boxShadow: theme.shadows[3],
                              backgroundColor: theme.palette.background.paper,
                            }}
                            className="rounded position-relative d-flex flex-column gap-3 align-items-center justify-content-center cursor-pointer"
                          >
                            <Box
                              component="img"
                              src={imageObj.audioIcon}
                              sx={{ width: 40 }}
                              onClick={() => {
                                window.open(row.data, "_blank");
                              }}
                            />
                          </Box>
                        )
                      )}
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    className="d-flex align-items-center"
                  >
                    <Stack
                      direction="row"
                      className="align-items-center  gap-2"
                    >
                      <Box>
                        <CMIconButton
                          color="warning"
                          onClick={() => {
                            setEditContent(row);
                            setOpen(true);
                          }}
                        >
                          <Iconify icon="el:edit" />
                        </CMIconButton>
                      </Box>

                      <Box>
                        <CMIconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Iconify icon="uiw:delete" />
                        </CMIconButton>
                      </Box>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <AddMatchingQuestions
        open={open}
        onClose={handleClose}
        data={editContent}
      />
    </>
  );
};

export default MatchingTaskTable;
