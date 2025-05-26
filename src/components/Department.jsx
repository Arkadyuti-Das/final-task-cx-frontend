import { Button, Container, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Department() {
  const [data, setData]=useState([]);
  const [drawerData, setDrawerData]=useState([]);
  const [open, setOpen]=useState(false);
  useEffect(()=>{
    fetch("http://localhost:3000/department").then(res=>res.json()).then((data)=>{
      setData(data);
    });
  }, [])

  const toggleDrawer=(isOpen, dept_no)=>{
        fetch(`http://localhost:3000/department/${dept_no}`).then(res=>res.json()).then((data)=>{
            setDrawerData(data);
        });
        setOpen(isOpen);
  }

  const toggleDrawerClose=(isOpen)=>{
        setOpen(isOpen);
  }
  return (
    <>
        <Container maxWidth='lg' sx={{my:'3rem'}}>
          <TableContainer component={Paper}>
          <Table aria-label='simple-table'>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((items)=>(
                <TableRow key={items.dept_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell><Button variant='contained' onClick={()=>{toggleDrawer(true, items.dept_no)}}>{items.department.dept_name}</Button></TableCell>
                  <TableCell>{items.employee.first_name} {items.employee.last_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Drawer anchor='right' open={open} onClose={()=>{toggleDrawerClose(false)}}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableCell align="center">Manager</TableCell>
                    <TableCell align="center">From</TableCell>
                    <TableCell align="center">To</TableCell>
                </TableHead>
                <TableBody>
                    {drawerData.map((items)=>(
                        <TableRow key={items.to_date}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{items.employee.first_name} {items.employee.last_name}</TableCell>
                            <TableCell align="center">{items.from_date}</TableCell>
                            <TableCell align="center">{items.to_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>        
        </Drawer>
        </Container>
    </>
  )
}
