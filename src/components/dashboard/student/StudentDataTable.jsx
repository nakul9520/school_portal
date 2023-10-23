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

const StudentDataTable = () => {
  const rows = [
    {
      order: 1,
      schoolName: "school 1",
      Class: "class 1",
      studentName: "Student 1",
      UserName: "Username 1",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
      Status: "200 days left",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
    {
      order: 2,
      schoolName: "school 2",
      Class: "class 2",
      studentName: "Student 2",
      UserName: "Username 2",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
      Status: "Expired",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
    {
      order: 3,
      schoolName: "school 3",
      Class: "class 3",
      studentName: "Student 3",
      UserName: "Username 3",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
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
              <StyledTableCell align="left">Okul Adı</StyledTableCell>
              <StyledTableCell align="left">Sınıf</StyledTableCell>
              <StyledTableCell align="left">Öğrenci Adı </StyledTableCell>
              <StyledTableCell align="left">Kullanıcı Adı</StyledTableCell>
              <StyledTableCell align="left">Şifre</StyledTableCell>
              <StyledTableCell align="left">Aktivasyon Tarihi</StyledTableCell>
              <StyledTableCell align="left">
                Lisans Sonlanma Tarihi
              </StyledTableCell>
              <StyledTableCell align="left">Durumu</StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell scope="row">{row.order}</StyledTableCell>
                <StyledTableCell align="left">{row.schoolName}</StyledTableCell>
                <StyledTableCell align="left">{row.Class}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.studentName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.UserName}</StyledTableCell>
                <StyledTableCell align="left">{row.password}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.activationDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.licenseExpirationDate}
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

export default StudentDataTable;
