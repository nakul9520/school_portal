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

const SchoolDataTable = () => {
  const rows = [
    {
      order: 1,
      schoolName: "school 1",
      schoolAdministrator: "Admin 1",
      email: "123@gmail.com",
      userName: "Admin 1",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
    {
      order: 2,
      schoolName: "school 2",
      schoolAdministrator: "Admin 2",
      email: "123@gmail.com",
      userName: "Admin 2",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
      transactions: [
        <Iconify icon="el:edit" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
    {
      order: 3,
      schoolName: "school 3",
      schoolAdministrator: "Admin 3",
      email: "123@gmail.com",
      userName: "Admin 3",
      password: "12345",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
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
              <StyledTableCell className="" color="text.primary">
                Sıra
              </StyledTableCell>
              <StyledTableCell align="left">Okul Adı</StyledTableCell>
              <StyledTableCell align="left">Okul Yöneticisi</StyledTableCell>
              <StyledTableCell align="left">E-mail</StyledTableCell>
              <StyledTableCell align="left">Kullanıcı Adı</StyledTableCell>
              <StyledTableCell align="left">Şifre</StyledTableCell>
              <StyledTableCell align="left">Aktivasyon Tarihi</StyledTableCell>
              <StyledTableCell align="left">
                Lisans Sonlanma Tarihi
              </StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell scope="row">{row.order}</StyledTableCell>
                <StyledTableCell align="left">{row.schoolName}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.schoolAdministrator}
                </StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.userName}</StyledTableCell>
                <StyledTableCell align="left">{row.password}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.activationDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.licenseExpirationDate}
                </StyledTableCell>
                {/* <StyledTableCell align="left">{row.transactions}</StyledTableCell> */}
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

export default SchoolDataTable;
