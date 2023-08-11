// import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "@mui/icons-material/Task";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Home" sx={{ color: "secondary" }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BusinessIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Empresa" sx={{ color: "secondary" }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FormatListBulletedIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Projetos" sx={{ color: "secondary" }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TaskIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Tarefas" sx={{ color: "secondary" }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Notificações" sx={{ color: "secondary" }} />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset sx={{ bgcolor: "primary.dark" }}>
      Autentication
    </ListSubheader>
    <Link to="auth">
      <ListItemButton>
        <ListItemIcon>
          <LoginIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Login" sx={{ color: "secondary" }} />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Logout" sx={{ color: "secondary" }} />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItemButton> */}
  </>
);
