import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { debounce, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getDragDropTaskList } from "redux/store/slice/dashboard/contentSlice";
import DragDropTaskTable from "./DragDropTaskTable";
import BackButton from "components/common/BackButton";

const DragDropTask = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const { dragDropTaskInfo } = useSelector((state) => state.content);
  const [page, setPage] = useState(1);

  const getDragDropTaskListData = useCallback(
    async (data) => {
      const param = {
        book_id: book_id,
        page: data.page,
      };

      dispatch(getDragDropTaskList(param));
    },
    [dispatch, book_id]
  );

  const debounceFn = useMemo(
    () => debounce(getDragDropTaskListData, 1000),
    [getDragDropTaskListData]
  );

  useEffect(() => {
    debounceFn({
      page: 1,
    });
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getDragDropTaskListData({ page: value });
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
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item sm={6} xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Sürükle Bırak Ekle
            </Typography>
          </Grid>
        </Grid>

        <DragDropTaskTable />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {dragDropTaskInfo.total_record} sonuçtan 1 ile
            {size(dragDropTaskInfo.data)} arası gösteriliyor
          </Typography>
          {dragDropTaskInfo.total_record > 0 && (
            <Pagination
              count={dragDropTaskInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default DragDropTask;
