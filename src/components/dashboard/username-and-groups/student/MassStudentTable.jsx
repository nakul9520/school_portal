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

const MassStudentTable = () => {
  const rows = [
    {
      order: 1,
      schoolName: "class 1",
      TeacherName: "Admin 1",
      UserName: "Admin 1",
      password: "12345",
      classes: "1A, 2B, 3C",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
    },
    {
      order: 2,
      schoolName: "class 2",
      TeacherName: "Admin 2",
      UserName: "Admin 2",
      password: "12345",
      classes: "1A, 2B, 3C",
      activationDate: "01.01.2023",
      licenseExpirationDate: "31.12.2023",
    },
    {
      order: 3,
      schoolName: "class 3",
      TeacherName: "Admin 3",
      UserName: "Admin 3",
      password: "12345",
      classes: "1A, 2B, 3C",
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
              <StyledTableCell align="left">Sıra</StyledTableCell>
              <StyledTableCell align="left">Okul Adı</StyledTableCell>
              <StyledTableCell align="left">Öğrenci Adı</StyledTableCell>
              <StyledTableCell align="left">Kullanıcı Adı</StyledTableCell>
              <StyledTableCell align="left">Şifre</StyledTableCell>
              <StyledTableCell align="left">Sınıfları</StyledTableCell>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
};

export default MassStudentTable;
