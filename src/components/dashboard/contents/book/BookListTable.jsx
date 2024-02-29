import {
  Box,
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

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBookDetail } from "redux/store/slice/dashboard/contentSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { deleteBook } from "redux/store/slice/dashboard/contentSlice";
import { getBookList } from "redux/store/slice/dashboard/contentSlice";

const BookListTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookListInfo, loading } = useSelector((state) => state.content);
  const bookList = bookListInfo.data ?? [];

  const handleBookEdit = (id) => {
    dispatch(getBookDetail(id))
      .unwrap()
      .then((result) => {
        if (result.success) {
          localStorage.setItem("bookId", result.data.id);
          navigate("/dashboard/contents/add-book-topic", {
            state: result.data,
          });
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {});
  };

  const handleDelete = (id) => {
    dispatch(deleteBook({ id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          const param = {
            payload: {
              search: "",
              per_page: 10,
            },
            page: 1,
          };
          dispatch(getBookList(param));
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TableContainer
        component={Paper}
        className="rounded-0 mt-3 scrollbar-none"
        sx={{ maxHeight: 350 }}
      >
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Sıra</StyledTableCell>
              <StyledTableCell>Kitap Adı </StyledTableCell>
              <StyledTableCell>Seviyesi </StyledTableCell>
              <StyledTableCell>PYP Teması </StyledTableCell>
              <StyledTableCell>Genel Teması </StyledTableCell>
              <StyledTableCell>Kazanımlar</StyledTableCell>
              <StyledTableCell>Seriler</StyledTableCell>
              <StyledTableCell>Seç</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={9}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(bookList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              bookList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.book_name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.grade_name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.pypthemes_name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.generalthemes_name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.objectives_name}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.series_name}
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
                          onClick={() => handleBookEdit(row.id)}
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
    </>
  );
};

export default BookListTable;
