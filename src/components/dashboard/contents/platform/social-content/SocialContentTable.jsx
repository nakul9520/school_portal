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

import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify/Iconify";
import createMarkup from "components/hooks/createMarkup";
import {
  deleteContentFile,
  getAllContentList,
} from "redux/store/slice/dashboard/contentSlice";
import { CONTENT_TYPE } from "services/constant";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const SocialContentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contentListInfo, loading } = useSelector((state) => state.content);
  const contentList = contentListInfo.data ?? [];

  const handleDelete = (id) => {
    dispatch(deleteContentFile({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          dispatch(
            getAllContentList({
              payload: {
                type: CONTENT_TYPE.socialContent,
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
              <StyledTableCell align="left">Başlık</StyledTableCell>
              <StyledTableCell align="left">Visibility</StyledTableCell>
              <StyledTableCell align="left">Resim</StyledTableCell>
              <StyledTableCell align="left">Tanım</StyledTableCell>
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
            ) : isEmpty(contentList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    Mevcut Veri Yok
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              contentList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{row.title}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.visibility}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Box sx={{ width: 80, height: 80 }}>
                      <Box
                        component="img"
                        src={row.file}
                        className="img-cover w-100 h-100"
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Box
                      className="text-break"
                      sx={{ fontSize: 12, fontWeight: 500 }}
                      dangerouslySetInnerHTML={createMarkup(row.description)}
                    />
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
                          navigate(
                            "/dashboard/contents/platform-design/add-social-content",
                            { state: row }
                          )
                        }
                      >
                        <CMIconButton color="warning">
                          <Iconify icon="el:edit" />
                        </CMIconButton>
                      </Box>

                      <Box>
                        <CMIconButton
                          color="error"
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

export default SocialContentTable;
