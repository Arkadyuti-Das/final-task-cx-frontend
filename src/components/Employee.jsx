import { Box, Button, Container, Drawer, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Paper, Select, Slider, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Typography, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmployeeDrawer from './EmployeeDrawer';

export default function Employees() {
  const [data, setData]=useState([]);
  const [totalPage, setTotalPage]=useState(0);
  const [page, setPage]=useState(1);
  const [selectedEmployee, setSelectedEmployee]=useState(0);
  const [open, setOpen]=useState(false);

  // Filter and sort
  const [searchBarValue, setSearchbarValue]=useState("");
  const [debouncedValue, setDebouncedValue]=useState('');

  const [ageValue, setAgeValue]=useState([0, 0]);
  const [salaryValue, setSalaryValue]=useState([0, 0]);

  const [fieldValue, setFieldValue]=useState("");
  const [orderValue, setOrderValue]=useState("");

  const [selectedDepartments, setSelectedDepartments]=useState([]);
  const [departments, setDepartments]=useState([]);

  //Set flag to see if filter or search was applied
  const [flag, setFlag]=useState(false);

  useEffect(()=>{
    if (flag===false){
      console.log("Flag in else: ",flag);
      fetch(`http://localhost:3000/employees?page=${page}`).then(res=>res.json()).then((data)=>{
      setData(data);
    });
    }
  }, [page]);

  useEffect(()=>{
    //For search values only
    if (flag && debouncedValue){
      fetch(`http://localhost:3000/employees/query?searchValue=${debouncedValue}&page=${page}`).then((res)=>res.json()).then((data)=>{
        setData(data.data);
        setTotalPage(Math.ceil(data.totalCount/100));
        setFlag(true);
        console.log(data.data);
      });
    } 
    else if(!debouncedValue){
      fetch(`http://localhost:3000/employees?page=${page}`).then(res=>res.json()).then((data)=>{
        setData(data);
        setFlag(false);
        fetch('http://localhost:3000/count-employees').then(res=>res.text()).then((data)=>{
          setTotalPage(parseInt(data));
        });
      });

    } 
  }, [flag, page,debouncedValue])

  useEffect(()=>{
    fetch('http://localhost:3000/count-employees').then(res=>res.text()).then((data)=>{
      setTotalPage(parseInt(data));
    });
  }, []);

  useEffect(()=>{
    const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:3000/get-departments');
      const data = await res.json();
      // console.log("data: ", data);
      const temp = data.map((item) => item.dept_name);
      setDepartments(temp);
    } catch (err) {
      console.error("Error fetching departments:", err.message);
    }
  };

  fetchDepartments();
  }, [])

  useEffect(() => {
    const handler=setTimeout(() => {
      setDebouncedValue(searchBarValue);
    }, 500); // 500 ms debounce
    return ()=>{
      clearTimeout(handler); // cleanup on value change
    };
  }, [searchBarValue]);

  useEffect(() => {
    if (debouncedValue) {
      console.log("Debounced Value:", debouncedValue);
    }
  }, [debouncedValue]);

  //Age slider
  const handleAgeChange = (event, newValue) => {
    setAgeValue(newValue);
  };

  //salary slider
  const handleSalaryChange = (event, newValue) => {
    setSalaryValue(newValue);
  };

  //field select for sort
  const handleFieldChange=(event)=>{
    setFieldValue(event.target.value);
  }

  //order select for sort
  const handleOrderChange=(event)=>{
    setOrderValue(event.target.value);
  }

  //checkbox change
  const handleCheckBoxChange=(event)=>{
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDepartments((prev) => [...prev, value]);
    } else {
      setSelectedDepartments((prev) => prev.filter((dep) => dep !== value));
    }
  }

  //handle filter changes
  const handleApplyFilters=()=>{
    //get the values of all filters including the searched value also
    console.log("Age range: ", ageValue);
    const ageMin=ageValue[0];
    const ageMax=ageValue[1];
    
    console.log("Salary range: ", salaryValue);
    const salaryStart=salaryValue[0];
    const salaryEnd=salaryValue[1];

    console.log("Field name: ", fieldValue);
    const sortField=fieldValue;

    console.log("Sort by: ", orderValue);
    const sortBy=orderValue;

    console.log("Check box values: ", selectedDepartments);
    const queryString=`${encodeURIComponent(selectedDepartments.join(','))}`;

    console.log("Search box value: ", debouncedValue);

    //send request to this url
    fetch(`/employees/query?searchValue=${debouncedValue}&ageMin=${ageStart}&ageMax=${ageEnd}&salaryStart=${salaryStart}&salaryEnd=${salaryEnd}&sortField=${sortField}$sortBy=${sortBy}&departments=${queryString}`).then((res)=>res.json()).then((data)=>{
      //data from api as array
      //Set data
      setData(data.data);
      //Set pagination values
      setPage(1);
      setTotalPage(Math.ceil(data.totalCount/100));
      setFlag(true);
      //Save in local storage the name of the searched query
    });
  }

  const handlePageChange=(event, value)=>{
    if(flag){
      setPage(value);
      setFlag(true);
      console.log("Inside handlepge in if flag: ", flag);
    }
    else{
      setPage(value);
      setFlag(false);
      console.log("outside handlepge in if flag: ", flag);
    }
  }

  const handleRowClick=(emp_number)=>{
    setSelectedEmployee(emp_number);
    // console.log("selectedEmployee/: ", selectedEmployee);
    setOpen(true);
  }

  const handleSearch=()=>{
      if (debouncedValue!="" ||debouncedValue!=null){
        //set initial page to 1
      setPage(1);
      //set flag to true to show search results
      setFlag(true);
      }
      else{
        setFlag(false);
      }
      

      // setTotalPage(Math.ceil(data.totalCount/100));
      // console.log(totalPage);
  }

  return (
    <>
      {flag?<>
        <Container sx={{my:'3rem'}}>
          <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                    <TableRow>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Last Title</TableCell>
                      <TableCell>Last Salary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((items)=>(
                        <TableRow key={items.emp_no}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>{handleRowClick(items.emp_no)}}>
                            <TableCell align='left'>{items?.first_name} {items?.last_name}</TableCell>
                            <TableCell align='left'>{items?.dept_emp?.department?.dept_name || '-'}</TableCell>
                            <TableCell align='left'>{items?.titles[items.titles.length-1]?.title || '-'}</TableCell>
                            <TableCell align='left'>{items?.salaries[items.salaries.length - 1]?.salary}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={totalPage} page={page} color='primary' onChange={handlePageChange} showFirstButton showLastButton/>
        </Paper>
        <EmployeeDrawer open={open} onClose={()=>{setOpen(false)}} employeeNumber={selectedEmployee} />
        </Container>
      </>:<>
        <Container sx={{my:'3rem'}}>
          <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                    <TableRow>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Last Title</TableCell>
                      <TableCell>Last Salary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((items)=>(
                        <TableRow key={items.emp_no}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={()=>{handleRowClick(items.emp_no)}}>
                            <TableCell align='left'>{items?.first_name} {items?.last_name}</TableCell>
                            <TableCell align='left'>{items?.dept_emp?.department?.dept_name || '-'}</TableCell>
                            <TableCell align='left'>{items?.titles[items.titles.length-1]?.title || '-'}</TableCell>
                            <TableCell align='left'>{items?.salaries[items.salaries.length - 1]?.salary}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={totalPage} page={page} color='primary' onChange={handlePageChange} showFirstButton showLastButton/>
        </Paper>
        <EmployeeDrawer open={open} onClose={()=>{setOpen(false)}} employeeNumber={selectedEmployee} />
        </Container>
      </>}
        <Container
          sx={{
            my: '3rem',
            color: 'black',
            border: '2px solid black',
            borderRadius: '8px',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: '#f9f9f9',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search by employee name"
            variant="outlined"
            value={searchBarValue}
            onChange={(e) => setSearchbarValue(e.target.value)}
            fullWidth
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Age Range
            </Typography>
            <Slider
              getAriaLabel={() => 'Age range'}
              value={ageValue}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Salary Range
            </Typography>
            <Slider
              getAriaLabel={() => 'Salary range'}
              value={salaryValue}
              onChange={handleSalaryChange}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
            />
          </Box>

          <Box>
            <InputLabel>Field Value</InputLabel>
            <Select
              value={fieldValue}
              label="Select Field"
              onChange={handleFieldChange}
              fullWidth
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'department'}>Department</MenuItem>
              <MenuItem value={'salary'}>Last Salary</MenuItem>
            </Select>
          </Box>

          <Box>
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={orderValue}
              label="Select Order"
              onChange={handleOrderChange}
              fullWidth
            >
              <MenuItem value={'ASC'}>Ascending</MenuItem>
              <MenuItem value={'DESC'}>Descending</MenuItem>
            </Select>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Select Departments
            </Typography>
            <FormGroup>
              {departments.map((dept) => (
                <FormControlLabel
                  key={dept}
                  control={
                    <Checkbox
                      value={dept}
                      checked={selectedDepartments.includes(dept)}
                      onChange={handleCheckBoxChange}
                    />
                  }
                  label={dept}
                />
              ))}
            </FormGroup>
          </Box>

          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Box>
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Apply Search
            </Button>
          </Box>
        </Container>
    </>
  )
}
