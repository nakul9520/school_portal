import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { debounce, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import BackButton from "components/common/BackButton";
import { getPuzzelTaskList } from "redux/store/slice/dashboard/contentSlice";
import PuzzelTaskTable from "./PuzzelTaskTable";

const PuzzelTask = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const { puzzelTaskInfo } = useSelector((state) => state.content);
  const [page, setPage] = useState(1);

  const getPuzzelTaskListData = useCallback(
    async (data) => {
      const param = {
        book_id: book_id,
        page: data.page,
      };

      dispatch(getPuzzelTaskList(param));
    },
    [dispatch, book_id]
  );

  const debounceFn = useMemo(
    () => debounce(getPuzzelTaskListData, 1000),
    [getPuzzelTaskListData]
  );

  useEffect(() => {
    debounceFn({
      page: 1,
    });
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getPuzzelTaskListData({ page: value });
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
              Puzzel Task
            </Typography>
          </Grid>
        </Grid>

        <PuzzelTaskTable />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {puzzelTaskInfo.total_record} sonuçtan 1 ile{" "}
            {size(puzzelTaskInfo.data)} arası gösteriliyor
          </Typography>
          {puzzelTaskInfo.total_record > 0 && (
            <Pagination
              count={puzzelTaskInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default PuzzelTask;
