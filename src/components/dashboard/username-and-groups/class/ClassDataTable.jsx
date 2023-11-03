import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Iconify from "components/common/iconify/Iconify";
import {
  getClassList,
  deleteClass,
} from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { isEmpty } from "lodash";
import CMIconButton from "components/common/CMIconButton";
import SelectCheckbox from "components/common/checkbox/SelectCheckbox";

const ClassDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classListInfo, loading } = useSelector((state) => state.users);
  const classList = classListInfo.data ?? [];

  console.log("classList", classList);

  const handleDelete = (id) => {
    dispatch(deleteClass({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          dispatch(
            getClassList({
              payload: {
                search: "",
                per_page: 10,
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
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Okul Adı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Sınıf Adı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 120 }}>
                Öğretmen 1
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Ö1 E-mail
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 120 }}>
                Ö1 Şifre
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 120 }}>
                Öğretmen 2
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Ö2 E-mail
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 120 }}>
                Ö2 Şifre
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 120 }}>
                Öğrenci Sayısı
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 80 }}>
                Durumu
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                İşlemler
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={12}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(classList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={12}>
                  <Typography variant="subtitle1" color="text.primary">
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              classList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell scope="row">
                    {row.school_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.class_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_name1 ?? ""}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_email1 ?? ""}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_code1 ?? ""}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_name2 ?? ""}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_email2 ?? ""}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.teacher_code2 ?? ""}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.no_of_student}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
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
                          navigate("/dashboard/username-and-groups/add-class", {
                            state: row,
                          })
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

export default ClassDataTable;
