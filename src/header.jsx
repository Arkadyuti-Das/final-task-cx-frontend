import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router';

export default function Header() {
  return (
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
            <Button>
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
  );
}
