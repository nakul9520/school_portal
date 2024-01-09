import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/common/iconify";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce, get, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getFilterList } from "redux/store/slice/dashboard/contentSlice";
import AddEditCategoryFilter from "./AddEditCategoryFilter";
import BackButton from "components/common/BackButton";
import { deleteFilter } from "redux/store/slice/dashboard/contentSlice";
import { toast } from "react-toastify";

const LibraryCategories = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [filterId, setFilterId] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [editData, setEditData] = useState({});
  const { filterList, loading } = useSelector((state) => state.content);
  const filterListData = filterList.data ?? [];

  const categoryName = [
    { title: "Sınıf Düzeyi Ekle/Çıkar" },
    { title: "PYP Temaları Ekle/Çıkar" },
    { title: "Genel Temalar Ekle/Çıkar" },
    { title: "Kazanımlar Ekle/Çıkar" },
    { title: "Seriler Ekle/Çıkar" },
  ];

  const getFilterListData = useCallback(
    async (data) => {
      const payload = {
        category_id: get(data, "category_id", 1),
        search: "",
        per_page: 10,
      };
      dispatch(getFilterList(payload));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getFilterListData, 1000),
    [getFilterListData]
  );

  useEffect(() => {
    const payload = {
      category_id: 1,
    };
    debounceFn(payload);
  }, [debounceFn, dispatch]);

  const handleCategoryChange = (id) => {
    setCategoryId(id);
    getFilterListData({ category_id: id });
  };
  const handleAddEditCategory = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteFilter(id))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          getFilterListData({
            category_id: categoryId,
          });
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  return (
    <>
      <BackButton />
      <Box
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Kitaplık Kategorileri
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          className="gap-2 overflow-scroll scrollbar-none"
          mt={2}
        >
          {categoryName.map((item, index) => (
            <Box className="table_bottom_tabs text-right" key={index}>
              <Button
                variant="contained"
                color={categoryId === index + 1 ? "secondary" : "primary"}
                onClick={() => handleCategoryChange(index + 1)}
              >
                {item.title}
              </Button>
            </Box>
          ))}
        </Stack>

        <TableContainer component={Paper} className="rounded-0 mt-3">
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  Alt-Kategori ekle
                </StyledTableCell>
                <StyledTableCell align="left">Düzenle</StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="d-flex align-items-center justify-content-between"
                >
                  Kaldır
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="bi:plus" />}
                    color="primary"
                    onClick={() => {
                      setEditData({});
                      setOpen(true);
                    }}
                  >
                    Ekle
                  </Button>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <StyledTableRow>
                  <StyledTableCell align="left" colSpan={9}>
                    <LinearProgress />
                  </StyledTableCell>
                </StyledTableRow>
              ) : isEmpty(filterListData) ? (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={9}>
                    <Typography variant="subtitle1" color="text.primary">
                      Mevcut Veri Yok
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                filterListData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left">
                      {row.filter_name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      onClick={() => {
                        setEditData(row);
                        setFilterId(row?.id);
                        setOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      Edit
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className="cursor-pointer"
                      onClick={() => handleDelete(row.id)}
                    >
                      Remove
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Box>
      <AddEditCategoryFilter
        open={open}
        onClose={handleAddEditCategory}
        categoryId={categoryId}
        filterId={filterId}
        filterData={editData}
      />
    </>
  );
};

export default LibraryCategories;
