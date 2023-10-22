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

const TeacherDataTable = () => {
  const rows = [
    {
      order: 1,
      schoolName: "class 1",
      TeacherName: "Teacher 1",
      UserName: "Admin 1",
      password: "12345",
      classes: "1A, 2B, 3C",
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
      schoolName: "class 2",
      TeacherName: "Teacher 2",
      UserName: "Admin 2",
      password: "12345",
      classes: "1A, 2B, 3C",
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
      schoolName: "class 3",
      TeacherName: "Teacher 3",
      UserName: "Admin 3",
      password: "12345",
      classes: "1A, 2B, 3C",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
      Status: "200 days left",
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
              <StyledTableCell align="left">Öğretmen Adı </StyledTableCell>
              <StyledTableCell align="left">Kullanıcı Adı</StyledTableCell>
              <StyledTableCell align="left">Şifre</StyledTableCell>
              <StyledTableCell align="left">Sınıfları</StyledTableCell>
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
                <StyledTableCell align="left">
                  {row.TeacherName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.UserName}</StyledTableCell>
                <StyledTableCell align="left">{row.password}</StyledTableCell>
                <StyledTableCell align="left">{row.classes}</StyledTableCell>
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

export default TeacherDataTable;
