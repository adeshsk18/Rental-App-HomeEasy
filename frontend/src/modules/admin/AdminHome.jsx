import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import AllBookings from "./AllBookings";
import AllProperty from "./AllProperty";
import AllUsers from "./AllUsers";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AdminHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <Container className="mt-4">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="admin dashboard tabs"
              centered
              sx={{ 
                '& .MuiTabs-indicator': { 
                  backgroundColor: '#2563eb',
                },
              }}
            >
              <Tab label="All Properties" {...a11yProps(0)} />
              <Tab label="All Users" {...a11yProps(1)} />
              <Tab label="All Bookings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <AllProperty />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AllUsers />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllBookings />
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default AdminHome;
