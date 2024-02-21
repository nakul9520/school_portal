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
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import { DOC_TYPE } from "services/constant";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";
import { imageObj } from "services/images";

const DownloadableContentTable = () => {
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
                type: CONTENT_TYPE.downloadadble,
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
              <StyledTableCell align="left">Mesa</StyledTableCell>
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
                    {row.visibility_name}
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ width: 120 }}>
                    {DOC_TYPE.image === row.docType ? (
                      <ImageThumbnail key={1} size={100} imagePath={row.file} />
                    ) : DOC_TYPE.video === row.docType ? (
                      <VedioThumbnail key={1} videoPath={row.file} size={100} />
                    ) : DOC_TYPE.pdf === row.docType ? (
                      <Box
                        component="img"
                        src={imageObj.pdfIcon}
                        sx={{ width: 40 }}
                        onClick={() => {
                          window.open(row.file, "_blank");
                        }}
                      />
                    ) : DOC_TYPE.word === row.docType ? (
                      <Box
                        component="img"
                        src={imageObj.documentIcon}
                        sx={{ width: 40 }}
                        onClick={() => {
                          window.open(row.file, "_blank");
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={imageObj.csvIcon}
                        sx={{ width: 40 }}
                        onClick={() => {
                          window.open(row.file, "_blank");
                        }}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.description}
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
                            "/dashboard/contents/platform-design/add-downloadable-content",
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

export default DownloadableContentTable;
