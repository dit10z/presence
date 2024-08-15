import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

const CustomDataGrid = ({
  columns,
  rows,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
  searchQuery,
  totalRowCount,
  hidePagination,
}) => {
  const filteredRows = rows.filter((row) => {
    return columns.some((column) => String(row[column.field]).toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={(params) => onPageChange(params.page)}
        onPageSizeChange={(params) => onPageSizeChange(params.pageSize)}
        paginationMode="server"
        rowCount={totalRowCount}
        pagination
        hideFooter={hidePagination}
        components={{
          Toolbar: GridToolbarContainer,
        }}
      />
    </div>
  );
};

export default CustomDataGrid;
