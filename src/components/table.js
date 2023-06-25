import {
  Table as MUITable,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  Checkbox,
  TextField,
  MenuItem,
} from '@mui/material';

import { visuallyHidden } from "@mui/utils";

import React, { 
  Fragment,
} from 'react';

import { 
  Card,
} from './cards';

import useTable from '../hooks/use-table';

import moment from 'moment';

import { 
  Button, 
  DropdownButton 
} from './buttons';

import Loading from './loading';

import EmptyBanner from './empty-banner';

const EnhancedTableHead = ({
  tableData,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return <>
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {tableData.map((tblData, i) => (
          <Fragment key={i}>
            {tblData.id !== 'id' && (
              <TableCell
                key={tblData.id}
                align={'left'}
                sortDirection={orderBy === tblData.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === tblData.id}
                  direction={orderBy === tblData.id ? order : 'asc'}
                  onClick={createSortHandler(tblData.id)}
                >
                  <strong>
                    {tblData.label}
                  </strong>

                  {orderBy === tblData.id ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
    </TableHead>
  </>
}

const TableCellChildren = ({
  row, 
  tblData,
  handleClickAction,
}) => {
  if (tblData.isBoolean) {
    // If Row is a Boolean
    return (row[tblData.id] === '1' || row[tblData.id] === 1) ? 'Yes' : 'No';
  } else if (tblData.isDate) {
    // If Row is a Date
    return moment(row[tblData.id]).format('MMMM DD YYYY');
  } else if (tblData.isDateTime) {
    // If Row is a Date & Time
    return moment(row[tblData.id]).format('MMMM DD YYYY hh:mm A');
  } else if (tblData.id === 'action') {
    // If Row is an Action
    return <>
      <DropdownButton
        buttonId='table-action-btn'
        menuId='table-action-menu'
        label='Action'
        size='normal'
        onClick={handleClickAction}
        onClose={handleClickAction}
        menuItems={tblData?.actionItems}
        rowData={row}
      />
    </>
  } else if (tblData.isObject) {
    return row[tblData.id] && row[tblData.id][tblData.objectDisplay];
  } else {
    return row[tblData.id];
  }
};

const SearchBy = ({
  tableHeaders,
  loading,
  style = { width: '140px'},
}) => {
  return <>
    <TextField
      className='me-3'
      align='left'
      style={style}
      label='Search By'
      select
      defaultValue={tableHeaders.searchByOptions[0]['value']}
      size='small'
      onChange={(e) => tableHeaders.handleSearchBy(e)}
      disabled={loading}
    >
      {tableHeaders.searchByOptions && tableHeaders.searchByOptions.map((options, i) => (
        <MenuItem key={i} value={options.value}>
          {options.label}
        </MenuItem>
      ))}
    </TextField>
  </>
};

const Search = ({
  tableHeaders,
  style = {},
}) => {
  return <>
    <TextField
      label='Search'
      size='small'
      InputLabelProps={{ 
        shrink: true 
      }}
      style={style}
      onChange={(e) => tableHeaders.handleSearch(e)}
    />
  </>
};

const WebView = ({
  dense,
  tableHeaders,
  tableData,
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  handleSelectAllRow,
  handleSelectRow,
  selected,
  handleClickAction,
  loading,
  handleRequestSort,
  getComparator,
  stableSort,
  order,
  orderBy,
  isSelected,
  emptyRows,
}) => {
  return <>
    <Card style={{ width: '100%', }}>
      <div
        align='right'
        style={{ 
          padding: '15px 15px 15px 15px',
          borderBottom: '1px solid rgba(224, 224, 224, 1)'
        }}
      >
        {tableHeaders.actionsButtons && tableHeaders.actionsButtons.map((tblHeader, i) => (
          <Fragment key={i}>
            <Button
              className='me-3'
              size={tblHeader.size ? tblHeader.size : 'normal'}
              color={tblHeader.color ? tblHeader.color : 'primary'}
              startIcon={tblHeader.icon}
              label={tblHeader.label ? tblHeader.label : ''}
              disabled={tblHeader.disabled || loading || rows.length === 0}
              onClick={tblHeader.onClick && tblHeader.onClick}
            />
          </Fragment>
        ))}

        <SearchBy {...{
          loading,
          tableHeaders,
        }}/>

        <Search {...{
          tableHeaders,
        }}/>
      </div>

      <TableContainer style={{ height: 550 }}>
        <MUITable style={(rows.length === 0 || loading) ? { height: '100%' } : {}} stickyHeader size={dense ? 'small' : 'medium'}>
          {!loading 
            ?
            <Fragment>
              {rows.length > 0
                ?
                <>
                  <EnhancedTableHead
                    tableData={tableData}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={(e) => handleSelectAllRow(e, rows)}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />

                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, rowIndex) => (
                        <TableRow
                          hover
                          onClick={(e) => handleSelectRow(e, row.id)}
                          role='checkbox'
                          aria-checked={isSelected(row.id)}
                          tabIndex={-1}
                          key={rowIndex}
                          selected={isSelected(row.id)}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isSelected(row.id)}
                              inputProps={{
                                'aria-labelledby': `enhanced-table-checkbox-${rowIndex}`,
                              }}
                            />
                          </TableCell>

                          {tableData.map((tblData, i) => (
                            <Fragment key={i}>
                              {tblData.id !== 'id' &&
                                <TableCell align="left">
                                  <TableCellChildren {...{
                                    row,
                                    tblData,
                                    handleClickAction
                                  }}/>
                                </TableCell>
                              }
                            </Fragment>
                          ))}
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </>
                :
                <div style={{ padding: 50, height: '100%' }}>
                  <EmptyBanner/>
                </div>
              }
            </Fragment>
            :
            <div style={{ padding: 50, height: '100%' }}>
              <Loading/>
            </div>
          }
        </MUITable>
      </TableContainer>

      {!loading &&
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          labelRowsPerPage='Show Entries'
        />
      }
    </Card>
  </>
}

const MobileView = ({
  tableHeaders,
  tableData,
  rows,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  handleSelectAllRow,
  handleSelectRow,
  selected,
  handleClickAction,
  loading,
  handleRequestSort,
  getComparator,
  stableSort,
  order,
  orderBy,
  isSelected,
}) => {
  return <>
    {rows.length > 0
      ?
      <Fragment>
        <div className='mb-4'>
          <Card style={{ padding: 10 }}>
            <div className='row g-3'>
              <div className='col-12'>
                <SearchBy {...{
                  loading,
                  tableHeaders,
                  style: { width: '100%' }
                }}/>
              </div>

              <div className='col-12'>
                <Search {...{
                  tableHeaders,
                  style: { width: '100% '}
                }}/>
              </div>

              {tableHeaders.actionsButtons && tableHeaders.actionsButtons.map((tblHeader, i) => (
                <div key={i} className='col-sm-4 col-md-4 col-lg-4 col-xl-12'>
                  <Button
                    className='me-3 w-100'
                    size={tblHeader.size ? tblHeader.size : 'normal'}
                    color={tblHeader.color ? tblHeader.color : 'primary'}
                    startIcon={tblHeader.icon}
                    label={tblHeader.label ? tblHeader.label : ''}
                    disabled={tblHeader.disabled || loading || rows.length === 0}
                    onClick={tblHeader.onClick ? tblHeader.onClick : alert('No Function')}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {selected.length > 0 &&
          <div className='mb-4'>
            <Card style={{ padding: 5, }}>
              <div className='d-flex justify-content-between'>
                <div>
                  <Checkbox
                    color='primary'
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(e) => handleSelectAllRow(e, rows)}
                  />
      
                  <strong>
                    Select All
                  </strong>
                </div>

                <div>
                  
                </div>
              </div>
            </Card>
          </div>
        }

        <div>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <div key={rowIndex} className='mb-4'>
                <Card
                  onClick={(e) => handleSelectRow(e, row.id)}
                  style={{ 
                    backgroundColor: isSelected(row.id) ? '#e1e8ee' : '', 
                    padding: 5,
                  }}
                >
                  <div>
                    <Checkbox
                      color='primary'
                      checked={isSelected(row.id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${rowIndex}`,
                      }}
                    />
                  </div>

                  <div className='row g-3 mt-1 mx-2'>
                    {tableData && tableData.map((tblData, tblDataIndex) => (
                      <Fragment key={tblDataIndex}>
                        {(tblData.id !== 'id' && tblData.id !== 'action') &&
                          <div className='mb-2 col-sm-6 col-md-4 col-lg-4 col-xl-4'>
                            <strong>{`${tblData.label}: `}</strong>

                            <br/>

                            <span>
                              <TableCellChildren {...{
                                row,
                                tblData,
                                handleClickAction,
                              }}/>
                            </span>
                          </div>
                        }

                        {tblData.id === 'action' && 
                          <div align='right' className='mb-3'>
                            <DropdownButton
                              buttonId='table-action-btn'
                              menuId='table-action-menu'
                              label='Action'
                              size='normal'
                              onClick={handleClickAction}
                              onClose={handleClickAction}
                              menuItems={tblData?.actionItems}
                              rowData={row}
                            />
                          </div>
                        }
                      </Fragment>
                    ))}
                  </div>
                </Card>
              </div>
          ))}
        </div>

        {!loading &&
          <div>
            <Card>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton
                showLastButton
                labelRowsPerPage='Rows'
              />
            </Card>
          </div>
        }
      </Fragment>
      :
      <Card>
        <div style={{ padding: 50, height: '100%' }}>
          <EmptyBanner/>
        </div>
      </Card>
    }
  </>
};

const Table = ({
  dense = true,
  tableHeaders = [],
  tableData = [],
  rows = [],
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  handleSelectAllRow,
  handleSelectRow,
  selected,
  handleClickAction,
  loading,
}) => {
  const {
    handleRequestSort,
    getComparator,
    stableSort,
    order,
    orderBy,
    isSelected,
    emptyRows,
  } = useTable({
    selected,
    page,
    rows,
    rowsPerPage,
  });

  return <>
    <div className='d-none d-xl-block h-100'>
      <WebView {...{
        dense,
        tableHeaders,
        tableData,
        rows,
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleSelectAllRow,
        handleSelectRow,
        selected,
        handleClickAction,
        loading,
        handleRequestSort,
        getComparator,
        stableSort,
        order,
        orderBy,
        isSelected,
        emptyRows,
      }}/>
    </div>

    <div className='d-xl-none h-100'>
      <MobileView {...{
        tableHeaders,
        tableData,
        rows,
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleSelectAllRow,
        handleSelectRow,
        selected,
        handleClickAction,
        loading,
        handleRequestSort,
        getComparator,
        stableSort,
        order,
        orderBy,
        isSelected,
        emptyRows,
      }}/>
    </div>
  </>
};

export default Table;