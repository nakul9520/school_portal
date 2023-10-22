import { Box, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Iconify from "components/common/iconify/Iconify";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const ClassDataTable = () => {
  const rows = [
    {
      order: 1,
      className: "class 1",
      Teacher1: "Teacher 1",
      email01: "123@gmail.com",
      code01: "12345",
      Teacher2: "Teacher 1",
      email02: "123@gmail.com",
      code02: "12345",
      numberofStudents: "12",
      Status: "200 days left",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
    {
      order: 2,
      className: "class 2",
      Teacher1: "Teacher 2",
      email01: "123@gmail.com",
      code01: "12345",
      Teacher2: "Teacher 2",
      email02: "123@gmail.com",
      code02: "12345",
      numberofStudents: "14",
      Status: "Expired",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    }, {
      order: 3,
      className: "class 3",
      Teacher1: "Teacher 3",
      email01: "123@gmail.com",
      code01: "12345",
      Teacher2: "Teacher 3",
      email02: "123@gmail.com",
      code02: "12345",
      numberofStudents: "16",
      Status: "121 days left",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
  ];

  return (
    <>
      <TableContainer component={Paper} className="rounded-0 mt-3">
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Sıra</StyledTableCell>
              <StyledTableCell align="left">Sıra Adı</StyledTableCell>
              <StyledTableCell align="left">Öğretmen 1</StyledTableCell>
              <StyledTableCell align="left">Ö1 E-mail</StyledTableCell>
              <StyledTableCell align="left">Ö1 Şifre</StyledTableCell>
              <StyledTableCell align="left">Öğretmen 2</StyledTableCell>
              <StyledTableCell align="left">Ö2 E-mail</StyledTableCell>
              <StyledTableCell align="left">Ö2 Şifre</StyledTableCell>
              <StyledTableCell align="left">Öğrenci Sayısı</StyledTableCell>
              <StyledTableCell align="left">Durumu</StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell scope="row">{row.order}</StyledTableCell>
                <StyledTableCell align="left">{row.className}</StyledTableCell>
                <StyledTableCell align="left">{row.Teacher1}</StyledTableCell>
                <StyledTableCell align="left">{row.email01}</StyledTableCell>
                <StyledTableCell align="left">{row.code01}</StyledTableCell>
                <StyledTableCell align="left">{row.Teacher2}</StyledTableCell>
                <StyledTableCell align="left">{row.email02}</StyledTableCell>
                <StyledTableCell align="left">{row.code02}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.numberofStudents}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Status}</StyledTableCell>

                <StyledTableCell
                  align="left"
                  className="d-flex align-items-center"
                >
                  <Stack direction="row" className="align-items-center  gap-2">
                    {row.transactions.map((iconRow, subIndex) => (
                      <Box key={subIndex}> {iconRow}</Box>
                    ))}
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
};

export default ClassDataTable;
