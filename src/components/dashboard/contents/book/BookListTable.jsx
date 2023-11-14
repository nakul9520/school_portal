import {
  LinearProgress,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

import CMCheckBox from "components/common/checkbox/CMCheckBox";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const BookListTable = (props) => {
  const { bookId, setBookId } = props;
  const { bookListInfo, loading } = useSelector((state) => state.content);

  const bookList = bookListInfo.data ?? [];

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
    </>
  );
};

export default BookListTable;
