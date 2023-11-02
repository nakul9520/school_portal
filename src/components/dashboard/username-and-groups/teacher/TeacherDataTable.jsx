import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CMIconButton from "components/common/CMIconButton";
import SelectCheckbox from "components/common/checkbox/SelectCheckbox";

import Iconify from "components/common/iconify/Iconify";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsersList } from "redux/store/slice/dashboard/userSlice";
import { deleteUsers } from "redux/store/slice/dashboard/userSlice";
import { USER_TYPE } from "services/constant";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const TeacherDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userListInfo, loading } = useSelector((state) => state.users);
  const usersList = userListInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteUsers({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          dispatch(
            getUsersList({
              payload: {
                search: "",
                per_page: 10,
                user_type: USER_TYPE.teacher,
              },
              page: 1,
            })
          );
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
              <StyledTableCell align="left">Okul Adı</StyledTableCell>
              <StyledTableCell align="left">Öğretmen Adı </StyledTableCell>
              <StyledTableCell align="left">E-mail</StyledTableCell>
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
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={10}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(usersList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={10}>
                  <Typography variant="subtitle1" color="text.primary">
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              usersList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.password}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.class_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.activation_date}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.expired_at}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Status}</StyledTableCell>

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
                          navigate(
                            "/dashboard/username-and-groups/add-teacher",
                            { state: row }
                          )
                        }
                      >
                        <CMIconButton color="warning">
                          <Iconify icon="el:edit" />
                        </CMIconButton>
                      </Box>
                      <Box>
                        <SelectCheckbox color="success" />
                      </Box>
                      <Box onClick={() => handleDelete(row.id)}>
                        <CMIconButton color="error">
                          <Iconify icon="uiw:delete" />
                        </CMIconButton>
                      </Box>
                    </Stack>
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

export default TeacherDataTable;
