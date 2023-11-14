import { useState } from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { isEmpty, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import MenuPopover from "components/common/MenuPopover";
import CMCheckBox from "components/common/checkbox/CMCheckBox";
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
import { MenuItem } from "@mui/material";

const StudentDataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState({
    school: null,
    class: null,
  });
  const ITEM_HEIGHT = 48;
  const { userListInfo, loading } = useSelector((state) => state.users);
  const usersList = userListInfo.data ?? [];

  const handleClick = (event, fieldName) => {
    setAnchorEl((prevstate) => ({
      ...prevstate,
      [fieldName]: event.currentTarget,
    }));
  };
  const handleClose = (fieldName) => {
    setAnchorEl((prevstate) => ({
      ...prevstate,
      [fieldName]: null,
    }));
  };

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
                <IconButton
                  onClick={(e) => {
                    handleClick(e, "school");
                  }}
                >
                  <Iconify icon="ep:arrow-down" color="text.secondary" />
                </IconButton>
                <MenuPopover
                  open={Boolean(anchorEl.school)}
                  onClose={() => handleClose("school")}
                  anchorEl={anchorEl.school}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "18ch",
                    },
                  }}
                >
                  <FormGroup>
                    {map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (item, index) => (
                      <MenuItem
                        key={item}
                        // onClick={() =>
                        //   handleSelectOption(option.name, props, "agency")
                        // }
                      >
                        <FormControlLabel
                          key={index}
                          control={<CMCheckBox />}
                          label={`School ${item}`}
                        />
                      </MenuItem>
                    ))}
                  </FormGroup>
                </MenuPopover>
              </StyledTableCell>
              <StyledTableCell align="left" style={{ minWidth: 150 }}>
                Öğretmen Adı
                <IconButton
                  onClick={(e) => {
                    handleClick(e, "class");
                  }}
                >
                  <Iconify icon="ep:arrow-down" color="text.secondary" />
                </IconButton>
                <MenuPopover
                  open={Boolean(anchorEl.class)}
                  onClose={() => handleClose("class")}
                  anchorEl={anchorEl.class}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "18ch",
                    },
                  }}
                >
                  <FormGroup>
                    {map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (item, index) => (
                      <MenuItem
                        key={item}
                        // onClick={() =>
                        //   handleSelectOption(option.name, props, "agency")
                        // }
                      >
                        <FormControlLabel
                          key={index}
                          control={<CMCheckBox />}
                          label={`School ${item}`}
                        />
                      </MenuItem>
                    ))}
                  </FormGroup>
                </MenuPopover>
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
                  <StyledTableCell align="left">
                    {row.class_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.password}</StyledTableCell>
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
                            "/dashboard/username-and-groups/add-student",
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

export default StudentDataTable;
