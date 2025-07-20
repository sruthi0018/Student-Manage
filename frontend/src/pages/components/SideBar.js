import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      path: "/",
      show: true,
    },
    {
      label: "Students",
      path: "/students",
      show: user?.role === "superadmin" || user?.permissions?.student?.view,
    },
    {
      label: "Staff",
      path: "/staff",
      show: user?.role === "superadmin",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: 64,
          borderRight: "1px solid #E0E0E0",
          backgroundColor: "#1e3a8a",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: isSelected ? "#1d4ed8" : "transparent",
                  "&:hover": {
                    backgroundColor: "#1e40af",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: "#facc15",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            );
          })}
      </List>
    </Drawer>
  );
};

export default SideNav;
