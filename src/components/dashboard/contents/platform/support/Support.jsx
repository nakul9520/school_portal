import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { debounce, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getSupportTicketList } from "redux/store/slice/dashboard/contentSlice";
import SupportDataTable from "./SupportDataTable";

const Support = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { supportTicketListInfo } = useSelector((state) => state.content);

  const [page, setPage] = useState(1);

  const getSupportTicketListData = useCallback(
    async (pageNumber) => {
      dispatch(getSupportTicketList(pageNumber));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getSupportTicketListData, 1000),
    [getSupportTicketListData]
  );

  useEffect(() => {
    debounceFn(1);
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getSupportTicketListData(value);
  };

  return (
    <>
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
              Help
            </Typography>
          </Grid>
        </Grid>

        <SupportDataTable />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {supportTicketListInfo.total_record} sonuçtan 1 ile{" "}
            {size(supportTicketListInfo.data)} arası gösteriliyor
          </Typography>
          {supportTicketListInfo.total_record > 0 && (
            <Pagination
              count={supportTicketListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Support;
