import {
  Box,
  LinearProgress,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CMIconButton from "components/common/CMIconButton";
import Iconify from "components/common/iconify/Iconify";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const SupportDataTable = () => {
  const navigate = useNavigate();

  const { supportTicketListInfo, loading } = useSelector(
    (state) => state.content
  );
  const supportTicketList = supportTicketListInfo.data ?? [];

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
              <StyledTableCell align="left">ticket Id</StyledTableCell>
              <StyledTableCell align="left">Subject</StyledTableCell>
              <StyledTableCell align="left">discription</StyledTableCell>
              <StyledTableCell align="left">User Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">status</StyledTableCell>
              <StyledTableCell align="left">Time</StyledTableCell>
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
            ) : isEmpty(supportTicketList) ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <Typography variant="subtitle1" color="text.primary">
                    No Data Available
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              supportTicketList.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.ticket_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.subject}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.discription}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.user_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      variant="subtitle2"
                      color={row.status === 0 ? "warning.main" : "success.main"}
                    >
                      {row.status === 0 ? "Pending" : "Completed"}{" "}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.time}</StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className="d-flex align-items-center"
                  >
                    <Box
                      onClick={() =>
                        navigate(
                          "/dashboard/contents/platform-design/ticket-details",
                          {
                            state: row,
                          }
                        )
                      }
                    >
                      <CMIconButton color="warning">
                        <Iconify icon="fluent:chat-12-regular" />
                      </CMIconButton>
                    </Box>
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

export default SupportDataTable;
