import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { isEmpty, size, uniq } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import SelectCheckbox from "components/common/checkbox/SelectCheckbox";
import Iconify from "components/common/iconify/Iconify";
import {
  deleteUsers,
  getUsersList,
} from "redux/store/slice/dashboard/userSlice";
import { USER_TYPE } from "services/constant";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const StudentDataTable = (props) => {
  const { selected, setSelected } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userListInfo, loading } = useSelector((state) => state.users);
  const usersList = userListInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteUsers({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          dispatch(
            getUsersList({
              payload: {
                search: "",
                per_page: 10,
                user_type: USER_TYPE.student,
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
        sx={{ maxHeight: 350 }}
      >
        <StyledTable stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Sıra</StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Okul Adı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Seviye
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Sınıf Adı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Öğrenci Adı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                E-mail
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Şifre
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Aktivasyon Tarihi
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 170 }}>
                Lisans Sonlanma Tarihi
              </StyledTableCell>
              <StyledTableCell align="left">Durumu</StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={11}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(usersList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={11}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              usersList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.branch_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.class_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.code}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.activation_date}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.expired_at}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          row.status === "1" ? "success.main" : "error.main",
                      }}
                    >
                      {row.status === "1" ? "Active" : "Deactive"}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    className="d-flex align-items-center"
                  >
                    <Stack
                      direction="row"
                      className="align-items-center  gap-2"
                    >
                      <Box>
                        <CMIconButton
                          color="warning"
                          onClick={() =>
                            navigate(
                              "/dashboard/username-and-groups/add-student",
                              { state: row }
                            )
                          }
                          disabled={size(selected) > 1}
                        >
                          <Iconify icon="el:edit" />
                        </CMIconButton>
                      </Box>
                      <Box>
                        <SelectCheckbox
                          color="success"
                          checked={selected.includes(row.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelected(uniq([...selected, row.id]));
                            } else {
                              const updatedObjects = selected.filter(
                                (obj) => obj !== row.id
                              );
                              setSelected(updatedObjects);
                            }
                          }}
                        />
                      </Box>
                      <Box onClick={() => handleDelete(row.id)}>
                        <CMIconButton
                          color="error"
                          disabled={size(selected) > 1}
                        >
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

export default StudentDataTable;
