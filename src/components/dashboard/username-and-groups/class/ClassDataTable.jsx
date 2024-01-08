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
import { isEmpty, size, uniq } from "lodash";
import CMIconButton from "components/common/CMIconButton";
import SelectCheckbox from "components/common/checkbox/SelectCheckbox";

const ClassDataTable = (props) => {
  const { selected, setSelected } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classListInfo, loading } = useSelector((state) => state.users);
  const classList = classListInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteClass({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
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
                Sınıf Code
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
                <StyledTableCell align="left" colSpan={13}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(classList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={13}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              classList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell scope="row">
                    {row.school_name}
                  </StyledTableCell>
                  <StyledTableCell scope="row">{row.branch_name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.class_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
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
                          onClick={() =>
                            navigate(
                              "/dashboard/username-and-groups/add-class",
                              {
                                state: row,
                              }
                            )
                          }
                          color="warning"
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

export default ClassDataTable;
