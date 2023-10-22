import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
    StyledTable,
    StyledTableCell,
    StyledTableRow,
} from "styles/ComponentStyle";

const MassSchoolTable = () => {
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
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
};

export default MassSchoolTable;
