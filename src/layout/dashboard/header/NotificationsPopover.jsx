import { useRef, useState } from "react";

import { map } from "lodash";
// import { useDispatch, useSelector } from "react-redux";

// material
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

// components
import MenuPopover from "components/common/MenuPopover";
import { imageObj } from "services/images";
import Iconify from "../../../components/common/iconify/Iconify";

export default function NotificationsPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const notificationData = {};

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? "primary" : "default"}
        onClick={handleOpen}
      >
        <Badge variant="dot" overlap="circular" color="slateblue">
          <Iconify icon="tabler:bell-filled" color="text.secondary" />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Box sx={{ height: { xs: 200 }, overflowY: "scroll" }}>
          <List disablePadding>
            {map(notificationData.notificationlist ?? [], (item) => (
              <ListItemButton
                disableGutters
                sx={{
                  py: 1.5,
                  px: 2.5,
                  mt: "1px",
                  ...(item.status === 1 && {
                    backgroundColor: "action.focus",
                  }),
                  alignItems: "start",
                  "&:hover": {
                    ...(item.status === 1 && {
                      backgroundColor: "action.focus",
                    }),
                  },
                }}
                key={item.id}
                // onClick={() => handleClickNotification(item)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "background.neutral" }}
                    alt="Remy Sharp"
                    src={imageObj.notificationbadgeIcon}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {item.title}
                      <Typography component="span" variant="subtitle2">
                        &nbsp; {item.body}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="secondary"
                      className="mt-1"
                    >
                      {item.created_at}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </MenuPopover>
    </>
  );
}
