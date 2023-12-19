import React from "react";

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

import { isEmpty, map, size, uniq } from "lodash";
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

const SchoolAdminDataTable = (props) => {
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
                user_type: USER_TYPE.schoolAdmin,
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
              <StyledTableCell align="left">Yöneticisi Adı</StyledTableCell>
              <StyledTableCell align="left">E-mail</StyledTableCell>
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
            ) : isEmpty(usersList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
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
                    {map(row.schoolDetails, (item, subIndex) => (
                      <Typography variant="body2" key={subIndex}>
                        {item.school_name}
                      </Typography>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>

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
                          onClick={() =>
                            navigate(
                              "/dashboard/username-and-groups/add-school-admin",
                              { state: row }
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

export default SchoolAdminDataTable;
