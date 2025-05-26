import React, { useState, useEffect } from 'react';
import {
  Drawer, Tabs, Tab, Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EmployeeDrawer({ open, onClose, employeeNumber }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
//   console.log("SelectedEmployee: ", employeeNumber);

  const tabData = [
    { label: 'Emp. Details', url: `http://localhost:3000/employees/employee/info/${employeeNumber}` },
    { label: 'Salary History', url: `http://localhost:3000/employees/employee/salary/${employeeNumber}` },
    { label: 'Titles', url: `http://localhost:3000/employees/employee/titles/${employeeNumber}` },
  ];

  const fetchData=async(index)=>{
    setLoading(true);
    try {
        // console.log("Fetching from url: ", tabData[index].url);
      const res=await fetch(tabData[index].url);
      const json=await res.json();
      console.log("Data: ", json);
      setData(json);
    } catch (err) {
      console.error(err);
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && employeeNumber) {
        // console.log("Going to data fetch for tab: ", tabIndex);
      fetchData(tabIndex);
    }
  }, [open, tabIndex, employeeNumber]);

  const renderEmpDetailsTable = () => {
    if (!data) return null;
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Birth Date</TableCell>
                    <TableCell>Hire Date</TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {data.map((items)=>(
                <TableRow key={items.emp_no}>
                    <TableCell>{items.first_name}</TableCell>
                    <TableCell>{items.last_name}</TableCell>
                    <TableCell>{items.gender}</TableCell>
                    <TableCell>{items.birth_date}</TableCell>
                    <TableCell>{items.hire_date}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderSalaryHistoryTable = () => {
    if (!data || !Array.isArray(data)) return null;
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[0].salaries?.map((items)=>(
                <TableRow key={items.from_date}>
                    <TableCell>{items.from_date}</TableCell>
                    <TableCell>{items.to_date}</TableCell>
                    <TableCell>{items.salary}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderTitlesTable = () => {
    if (!data || !Array.isArray(data)) return null;
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[0].titles?.map((items, idx) => (
              <TableRow key={idx}>
                <TableCell>{items.title}</TableCell>
                <TableCell>{items.from_date}</TableCell>
                <TableCell>{items.to_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderCurrentTabTable=()=>{
    if (loading) {
      return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!data) {
      return <Typography sx={{ mt: 4, textAlign: 'center' }}>No data available</Typography>;
    }

    switch (tabIndex) {
      case 0: return renderEmpDetailsTable();
      case 1: return renderSalaryHistoryTable();
      case 2: return renderTitlesTable();
      default: return null;
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6">Employee Information</Typography>
            <Typography variant="body2">Emp #: {employeeNumber}</Typography>
          </Box>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Tabs value={tabIndex} onChange={(e, i) => setTabIndex(i)}>
          {tabData.map((tab, i) => (
            <Tab key={i} label={tab.label} />
          ))}
        </Tabs>
        {renderCurrentTabTable()}
      </Box>
    </Drawer>
  );
}
