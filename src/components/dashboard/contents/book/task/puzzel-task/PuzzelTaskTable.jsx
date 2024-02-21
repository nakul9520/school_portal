import { useState } from "react";

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
import {
  deletePuzzelTask,
  getPuzzelTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import AddEditPuzzelTask from "./AddEditPuzzelTask";
// import AddVoiceRecording from "./AddVoiceRecording";

const PuzzelTaskTable = () => {
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const { puzzelTaskInfo, loading } = useSelector((state) => state.content);
  const puzzelTaskList = puzzelTaskInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deletePuzzelTask({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getPuzzelTaskList(param));
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
          Etkinlik Ekle
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
              <StyledTableCell align="left">Başlık</StyledTableCell>
              <StyledTableCell align="left">İçerik</StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={4}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(puzzelTaskList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={4}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              puzzelTaskList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{row.title}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div dangerouslySetInnerHTML={{ __html: row.data }} />
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
      <AddEditPuzzelTask open={open} onClose={handleClose} data={editContent} />
    </>
  );
};

export default PuzzelTaskTable;
