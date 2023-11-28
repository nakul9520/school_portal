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

import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify/Iconify";
import { useState } from "react";
import {
  deleteVoiceTask,
  getVoiceTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import AddVoiceRecording from "./AddVoiceRecording";

const VoiceTaskTable = () => {
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const { voiceTaskInfo, loading } = useSelector((state) => state.content);
  const voiceTaskList = voiceTaskInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteVoiceTask({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getVoiceTaskList(param));
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
              <StyledTableCell align="left">File</StyledTableCell>
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
            ) : isEmpty(voiceTaskList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              voiceTaskList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{row.question}</StyledTableCell>
                  <StyledTableCell align="left">
                    <audio controls>
                      <source src={row.file} type="audio/mpeg" />
                    </audio>
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
      <AddVoiceRecording open={open} onClose={handleClose} data={editContent} />
    </>
  );
};

export default VoiceTaskTable;
