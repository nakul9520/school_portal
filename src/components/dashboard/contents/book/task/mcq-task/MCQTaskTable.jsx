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

import { isEmpty, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify/Iconify";
import { useState } from "react";
import {
  deleteMCQTask,
  getMCQTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import AddMultipleChoiceQuestions from "./AddMultipleChoiceQuestions";
// import AddVoiceRecording from "./AddVoiceRecording";

const MCQTaskTable = () => {
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const { MCQTaskInfo, loading } = useSelector((state) => state.content);
  const MCQTaskList = MCQTaskInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteMCQTask({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getMCQTaskList(param));
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
              <StyledTableCell align="left">Options</StyledTableCell>
              <StyledTableCell align="left">Answers</StyledTableCell>
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
            ) : isEmpty(MCQTaskList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              MCQTaskList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.question}</StyledTableCell>
                  <StyledTableCell align="left">
                    {map(row.options, (item, optionIndex) => (
                      <Typography variant="body2" key={optionIndex}>
                        {item}
                      </Typography>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {map(row.answer, (item, optionIndex) => (
                      <Typography variant="body2" key={optionIndex}>
                        {item}
                      </Typography>
                    ))}
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
      <AddMultipleChoiceQuestions
        open={open}
        onClose={handleClose}
        data={editContent}
      />
    </>
  );
};

export default MCQTaskTable;
