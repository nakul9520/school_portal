import { useState } from "react";

import {
  Checkbox,
  LinearProgress,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { isEmpty, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import CMCheckBox from "components/common/checkbox/CMCheckBox";
import Iconify from "components/common/iconify";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { postAddToLibrary } from "redux/store/slice/dashboard/contentSlice";
import { toast } from "react-toastify";
import ConfirmationDialog from "components/common/ConfirmationDialog";
import { deleteToLibrary } from "redux/store/slice/dashboard/contentSlice";
import { getBookList } from "redux/store/slice/dashboard/contentSlice";

const BookListTable = (props) => {
  const { bookId, setBookId } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    rowId: "",
  });

  const { bookListInfo, loading } = useSelector((state) => state.content);

  const bookList = bookListInfo.data ?? [];

  const categoryList = [
    { label: "Sınıf Düzeyi Ekle/Çıkar", id: 1 },
    { label: "PYP Temaları Ekle/Çıkar", id: 2 },
    { label: "Genel Temalar Ekle/Çıkar", id: 3 },
    { label: "Kazanımlar Ekle/Çıkar", id: 4 },
    { label: "Seriler Ekle/Çıkar", id: 5 },
  ];

  const handleAddToLibrary = (bookId, categoryId) => {
    dispatch(
      postAddToLibrary({
        book_id: bookId,
        category_id: categoryId,
      })
    )
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
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
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  const handleDeleteToLibrary = (bookId, categoryId) => {
    dispatch(
      deleteToLibrary({
        book_id: bookId,
        category_id: categoryId,
      })
    )
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            payload: {
              search: "",
              per_page: 10,
            },
            page: 1,
          };

          dispatch(getBookList(param));
          handleClose();
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
      <TableContainer
        component={Paper}
        className="rounded-0 mt-3 scrollbar-none"
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
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              bookList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.book_name}
                  </StyledTableCell>
                  {map(categoryList, (item, subIndex) => (
                    <StyledTableCell align="left" key={subIndex}>
                      <Checkbox
                        size="small"
                        value={item.id}
                        checked={item.id === row.category_id}
                        checkedIcon={<Iconify icon="akar-icons:radio-fill" />}
                        icon={<Iconify icon="akar-icons:radio" />}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleAddToLibrary(row.id, item.id);
                          } else {
                            setSelectedCategory({ id: "", rowId: row.id });
                            setOpen(true);
                          }
                        }}
                      />
                    </StyledTableCell>
                  ))}

                  <StyledTableCell align="left">
                    <CMCheckBox
                      checked={bookId === row.id}
                      onChange={(e) =>
                        bookId === row.id ? setBookId(null) : setBookId(row.id)
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <ConfirmationDialog
        dialogTitle="Remove Category Confirmation"
        confirmationText="Are you sure you want to remove from category"
        buttonLabel="Remove"
        dialogOpen={open}
        dialogClose={handleClose}
        setOpen={setOpen}
        action={() => handleDeleteToLibrary(selectedCategory.rowId, "")}
      />
    </>
  );
};

export default BookListTable;
