import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { debounce, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getMatchingTaskList } from "redux/store/slice/dashboard/contentSlice";
import MatchingTaskTable from "./MatchingTaskTable";
import BackButton from "components/common/BackButton";

const MatchingTask = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const { matchingTaskInfo } = useSelector((state) => state.content);
  const [page, setPage] = useState(1);

  const getMatchingTaskListData = useCallback(
    async (data) => {
      const param = {
        book_id: book_id,
        page: data.page,
      };

      dispatch(getMatchingTaskList(param));
    },
    [dispatch, book_id]
  );

  const debounceFn = useMemo(
    () => debounce(getMatchingTaskListData, 1000),
    [getMatchingTaskListData]
  );

  useEffect(() => {
    debounceFn({
      page: 1,
    });
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getMatchingTaskListData({ page: value });
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
              Eşleştirme Görevi
            </Typography>
          </Grid>
        </Grid>

        <MatchingTaskTable />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {matchingTaskInfo.total_record} sonuçtan 1 ile
            {size(matchingTaskInfo.data)} arası gösteriliyor
          </Typography>
          {matchingTaskInfo.total_record > 0 && (
            <Pagination
              count={matchingTaskInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MatchingTask;
