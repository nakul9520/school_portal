import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        componet="section"
        className="d-flex align-items-center justify-content-center h-100vh"
      >
        <Container maxWidth="lg">
          <Stack direction="column" spacing={2} alignItems="center">
            <Typography variant="h2">page not found</Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default PageNotFound;
