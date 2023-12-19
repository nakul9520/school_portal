import {
  Box,
  LinearProgress,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmpty, size, uniq } from "lodash";

import Iconify from "components/common/iconify/Iconify";
import { getSchoolList } from "redux/store/slice/dashboard/userSlice";
import { deleteSchool } from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import CMIconButton from "components/common/CMIconButton";
import SelectCheckbox from "components/common/checkbox/SelectCheckbox";

const SchoolDataTable = (props) => {
  const { selected, setSelected } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { schoolListInfo, loading } = useSelector((state) => state.users);
  const schoolList = schoolListInfo.data ?? [];
  const handleDelete = (id) => {
    dispatch(deleteSchool({ id: [id] }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          dispatch(
            getSchoolList({
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
              <StyledTableCell className="" color="text.primary">
                Sıra
              </StyledTableCell>
              <StyledTableCell align="left">Okul Adı</StyledTableCell>
              <StyledTableCell align="left">Aktivasyon Tarihi</StyledTableCell>
              <StyledTableCell align="left">
                Lisans Sonlanma Tarihi
              </StyledTableCell>
              <StyledTableCell align="left">İşlemler</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell align="left" colSpan={9}>
                  <LinearProgress />
                </StyledTableCell>
              </StyledTableRow>
            ) : isEmpty(schoolList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              schoolList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.school_name}
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
                      <Box>
                        <CMIconButton
                          color="warning"
                          disabled={size(selected) > 1}
                          onClick={() =>
                            navigate(
                              "/dashboard/username-and-groups/add-school",
                              { state: row }
                            )
                          }
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
                      <Box>
                        <CMIconButton
                          color="error"
                          disabled={size(selected) > 1}
                          onClick={() => handleDelete(row.id)}
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

export default SchoolDataTable;
