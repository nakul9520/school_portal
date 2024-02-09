import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { debounce, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getVoiceTaskList } from "redux/store/slice/dashboard/contentSlice";
import VoiceTaskTable from "./VoiceTaskTable";
import BackButton from "components/common/BackButton";

const VoiceTask = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const { voiceTaskInfo } = useSelector((state) => state.content);
  const [page, setPage] = useState(1);

  const getVoiceTaskListData = useCallback(
    async (data) => {
      const param = {
        book_id: book_id,
        page: data.page,
      };

      dispatch(getVoiceTaskList(param));
    },
    [dispatch, book_id]
  );

  const debounceFn = useMemo(
    () => debounce(getVoiceTaskListData, 1000),
    [getVoiceTaskListData]
  );

  useEffect(() => {
    debounceFn({
      page: 1,
    });
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getVoiceTaskListData({ page: value });
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
              Ses Kaydetme
            </Typography>
          </Grid>
        </Grid>

        <VoiceTaskTable />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {voiceTaskInfo.total_record} sonuçtan 1 ile{" "}
            {size(voiceTaskInfo.data)} arası gösteriliyor
          </Typography>
          {voiceTaskInfo.total_record > 0 && (
            <Pagination
              count={voiceTaskInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default VoiceTask;
