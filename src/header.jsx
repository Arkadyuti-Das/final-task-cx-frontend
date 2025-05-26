import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router';

export default function Header() {
  const [open, setOpen]=useState(false);
  const items = (() => {
    try {
      return JSON.parse(localStorage.getItem("cxSearches")) || [];
    } catch {
      return [];
    }
  })();

  const handleViewDrawer=()=>{
    setOpen(true);
  }
  return (
    <>
      <header>
      <div className='left_holder'>
        <img src='https://www.codelogicx.com/assets/images/logo.svg' width={150} />
      </div>

      <div className='right_holder'>
        <ul className='menu_holder'>
          <li>
            <Link to='/department'>
                <ApartmentIcon/>
                Department
            </Link>
          </li>
          <li>
            <Link to='/employees'>
              <AccountCircleIcon />
              Employees
            </Link>
          </li>
          <li>
            <Button onClick={handleViewDrawer}>
              <AccountBalanceWalletIcon />
              Views
            </Button>
          </li>
        </ul>
        <div className='user_profile_holder'>
          CX
        </div>
      </div>
    </header>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 250, padding: 16 }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item, index) => (
              <li key={index} style={{ marginBottom: 12 }}>
                <p style={{ margin: 0 }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#555" }}>{item.url}</p>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}
