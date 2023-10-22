import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Iconify from "components/common/iconify/Iconify";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';

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
        <Iconify icon="el:edit" sx={{color: ""}} color="error" className="border" />,
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
          <Iconify icon="el:edit" sx={{color: ""}} color="error" className="border" />,
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
        <Iconify icon="el:edit" sx={{color: ""}} color="error" className="border" />,
        <Iconify icon="mdi:checkbox-outline" />,
        <Iconify icon="uiw:delete" />,
      ],
    },
  ];

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.selected,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <>
      <TableContainer
        component={Paper}
        className="custom_table border rounded-0 mt-3"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="" color="text.primary">
                Sıra
              </TableCell>
              <TableCell align="left">Okul Adı</TableCell>
              <TableCell align="left">Okul Yöneticisi</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Kullanıcı Adı</TableCell>
              <TableCell align="left">Şifre</TableCell>
              <TableCell align="left">Aktivasyon Tarihi</TableCell>
              <TableCell align="left">Lisans Sonlanma Tarihi</TableCell>
              <TableCell align="left">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow 
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell align="left">{row.schoolName}</TableCell>
                <TableCell align="left">{row.schoolAdministrator}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.userName}</TableCell>
                <TableCell align="left">{row.password}</TableCell>
                <TableCell align="left">{row.activationDate}</TableCell>
                <TableCell align="left">{row.licenseExpirationDate}</TableCell>
                {/* <TableCell align="left">{row.transactions}</TableCell> */}
                <TableCell align="left" className="d-flex align-items-center">
                  {row.transactions.map((iconRow, index) => (
                    <Box>{iconRow}</Box>
                  ))}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SchoolDataTable;
