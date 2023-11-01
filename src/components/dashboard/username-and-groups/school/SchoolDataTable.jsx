import {
  Box,
  LinearProgress,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import Iconify from "components/common/iconify/Iconify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSchoolList } from "redux/store/slice/dashboard/userSlice";
import { deleteSchool } from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const SchoolDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schoolListInfo, loading } = useSelector((state) => state.users);
  const schoolList = schoolListInfo.data ?? [];
  // console.log("schoolList", schoolList);

  const handleDelete = (id) => {
    dispatch(deleteSchool({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          dispatch(getSchoolList({ search: "", page: 1 }));
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
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
            {!loading ? (
              schoolList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    {row.school_admin}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.user_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_code}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.activation_date}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.expired_at}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="d-flex align-items-center"
                  >
                    <Stack
                      direction="row"
                      className="align-items-center  gap-2"
                    >
                      <Box
                        onClick={() =>
                          navigate("/dashboard/username-and-groups/add-school", { state: row })
                        }
                      >
                        <Iconify icon="el:edit" />
                      </Box>
                      <Box>
                        <Iconify icon="mdi:checkbox-outline" />
                      </Box>
                      <Box onClick={() => handleDelete(row.id)}>
                        <Iconify icon="uiw:delete" />
                      </Box>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={9}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
};

export default SchoolDataTable;
