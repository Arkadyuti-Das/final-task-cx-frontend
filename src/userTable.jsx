import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, TextField, Autocomplete, FormControlLabel, Checkbox, Tooltip, Popover, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreVertIcon from '@mui/icons-material/MoreVert'

const rows = [
  {
    name: 'Test 1',
    created_date: '18-04-2025',
    created_by: ['Shiv Roy', 'Amitabh Roy'],
    status: 'Active',
  },
  {
    name: 'Test 2',
    created_date: '19-04-2025',
    created_by: ['Rohit Sharma', 'Karan Mehta'],
    status: 'Rejected',
  },
  {
    name: 'Test 3',
    created_date: '20-04-2025',
    created_by: ['Amitabh Roy', 'Rohit Sharma'],
    status: 'On Hold',
  },
  {
    name: 'Test 4',
    created_date: '21-04-2025',
    created_by: ['Shiv Roy', 'Karan Mehta'],
    status: 'Active',
  },
  {
    name: 'Test 5',
    created_date: '22-04-2025',
    created_by: ['Amitabh Roy', 'Rohit Sharma', 'Shiv Roy'],
    status: 'Active',
  },
  {
    name: 'Test 6',
    created_date: '23-04-2025',
    created_by: ['Neha Sharma'],
    status: 'Rejected',
  },
  {
    name: 'Test 7',
    created_date: '24-04-2025',
    created_by: ['Karan Mehta', 'Shukla Roy'],
    status: 'On Hold',
  },
  {
    name: 'Test 8',
    created_date: '25-04-2025',
    created_by: ['Amitabh Roy', 'Rohit Sharma'],
    status: 'Active',
  },
];

export default function UserTable() {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const toggleFilter = (filterState) => () => {
    setOpenFilter(filterState);
  };

  const [createdDateValue, setCreatedDateValue] = React.useState(dayjs());

  // const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Rohit Sharma', 'Karan Mehta', 'Shiv Roy', 'Amitabh Roy'];

  // const allSelected = selectedOptions.length === options.length;
  // const isIndeterminate =
  //   selectedOptions.length > 0 && selectedOptions.length < options.length;

  // const handleChange = (event, newValue) => {
  //   if (newValue.includes('Select All')) {
  //     if (allSelected) {
  //       setSelectedOptions([]);
  //     } else {
  //       setSelectedOptions([...options]);
  //     }
  //   } else {
  //     setSelectedOptions(newValue.filter(val => val !== 'Select All'));
  //   }
  // };

  const handlePopoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowIndex(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRowIndex(null);
  };

  const openPopover = Boolean(anchorEl);

  const handleEdit = () => {
    console.log(`Edit row ${selectedRowIndex + 1}`);
    handlePopoverClose();
  };

  const handleDelete = () => {
    console.log(`Delete row ${selectedRowIndex + 1}`);
    handlePopoverClose();
  };

  return (
    <>
      <div className='heading_holder'>
        <h4 className='heading'>Table Lists</h4>
        <div className='btn_holder'>
          <Button className='cstm_btn' variant="outlined" onClick={toggleFilter(!openFilter)}>
            {!openFilter ? 'Filter' : 'Hide'}
          </Button>
          <Button className='cstm_btn' variant="contained" onClick={toggleDrawer(true)}>Create</Button>
        </div>
      </div>

      {/* filter result form */}
      {openFilter && <div className='filtered_form_holder'>
        <div className='each_input_holder'>
          <TextField
            id="outlined-password-input"
            className='cstm_textfield'
            label="Name"
            type="text"
            size="small"
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '0.75rem'
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(1)',
                fontSize: '0.75rem'
              }
            }}
          />
        </div>

        <div className='each_input_holder'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={createdDateValue}
              onChange={(newValue) => setCreatedDateValue(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  sx: {
                    '& .MuiInputBase-root': {
                      height: 40,
                    },
                    '& .MuiInputAdornment-root .MuiIconButton-root': {
                      padding: '4px', 
                      height: 'auto',
                      width: 'auto',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '20px',
                    }
                  },
                }
              }}
            />
          </LocalizationProvider>
        </div>
      </div>}

      {/* table data */}
      <TableContainer component={Paper} sx={{ margin: '0 auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Created Date</strong></TableCell>
              <TableCell><strong>Created By</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell 
                sx={{
                  width: '50px',
                  minWidth: '50px',
                  maxWidth: '50px',
                  padding: '4px', // Optional: reduces internal padding
                  textAlign: 'center',
                }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow 
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'rgba(0 ,0, 0, 0.04)' : 'white'
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.created_date}</TableCell>
                <TableCell>
                  <div className='users_outer_holder'>
                    {row.created_by.map((eachUser, index) => (
                      <Tooltip title={eachUser} key={index} className='each_user_initials_holder'>
                        {eachUser.split(' ').map(word => word[0]).join('')}
                      </Tooltip>
                    ))}
                    <span>+ 4 more</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`cstm_badge_holder ${row.status === 'Active' ? 'active' : row.status === 'Rejected' ? 'rejected' : 'on_hold'}`}>{row.status}</div>
                </TableCell>
                <TableCell
                  sx={{
                    width: '50px',
                    minWidth: '50px',
                    maxWidth: '50px',
                    padding: '4px', // Optional: reduces internal padding
                    textAlign: 'center',
                  }}
                >
                  <span className='icon_holder' onClick={(e) => handlePopoverOpen(e, index)}>
                    <MoreVertIcon />
                  </span>

                  <Popover
                    id="long-menu"
                    open={openPopover && selectedRowIndex === index}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem 
                      onClick={handleEdit}
                      sx={{
                        fontSize: '12px',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                        }
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem 
                      onClick={handleDelete}
                      sx={{
                        fontSize: '12px',
                        px: 2,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                        }
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* create list form */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: 500
            },
          },
        }}
      >
        <div className='sidebar_content_holder'>
          <div className='heading_holder'>
            <h4 className='heading'>Create New</h4>
            <span className='close_holder' onClick={toggleDrawer(false)}>
              <HighlightOffIcon/>
            </span>
          </div>
          <div className='content_holder'>
            <div className='each_input_holder'>
              <TextField
                id="outlined-password-input"
                className='cstm_textfield'
                label="Name"
                type="text"
                size="small"
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '0.75rem'
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(1)',
                    fontSize: '0.75rem'
                  }
                }}
              />
            </div>

            <div className='each_input_holder'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={createdDateValue}
                  onChange={(newValue) => setCreatedDateValue(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      sx: {
                        '& .MuiInputBase-root': {
                          height: 40,
                        },
                        '& .MuiInputAdornment-root .MuiIconButton-root': {
                          padding: '4px', 
                          height: 'auto',
                          width: 'auto',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: '20px',
                        }
                      },
                    }
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className='each_input_holder'>
              <Autocomplete
                multiple
                options={['Select All', ...options]}
                // value={allSelected ? ['Select All', ...options] : selectedOptions}
                disableCloseOnSelect
                // onChange={handleChange}
                renderOption={(props, option, { selected }) => {
                  if (option === 'Select All') {
                    return (
                      <li {...props}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              // indeterminate={isIndeterminate}
                              style={{ padding: 0, marginRight: 8 }}
                              checked={selected}
                            />
                          }
                          label="Select All"
                        />
                      </li>
                    );
                  }
                  return (
                    <li style={{ fontSize: '12px' }} {...props}>
                      <Checkbox
                        style={{ padding: 0, marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Created By"
                    placeholder="Choose..."
                    size="small"
                    sx={{
                      '& .MuiInputBase-root': {
                        minHeight: '38px',
                        padding: '2px 8px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 0',
                        fontSize: '0.8rem',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.8rem',
                      },
                      '& .MuiInputLabel-shrink': {
                        transform: 'translate(14px, -7px) scale(0.85)',
                      },
                      '& .MuiAutocomplete-tag': {
                        margin: '2px',
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='buttons_holder'>
            <Button className='cstm_btn' variant="outlined">Cancel</Button>
            <Button className='cstm_btn' variant="contained">Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
