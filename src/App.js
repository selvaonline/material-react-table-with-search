// App.js or your main component file

import React, { useState, useEffect, useMemo,useRef } from "react";
import { MaterialReactTable } from 'material-react-table';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { columns } from './columnReferences'; // Make sure this import matches your column setup

function App() {
  // Initial data
  const initialData = useMemo(() => [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 34 },
    // More data here
  ], []);

  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState('');
  const searchInputRef = useRef(null);

  // Effect to filter data when globalFilter changes
  useEffect(() => {
    if (globalFilter) {
      const filteredData = initialData.filter(
        (item) =>
          item.firstName?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.lastName?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.age?.toString().includes(globalFilter)
      );
      setData(filteredData);
    } else {
      setData(initialData); // if there's no filter, show all data
    }
  }, [globalFilter, initialData]);

  const handleSearchIconClick = () => {
    searchInputRef.current?.focus(); // Focus the hidden search input
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Hidden TextField for search */}
      <TextField
        ref={searchInputRef}
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ position: 'absolute', visibility: 'hidden', height: 0 }}
      />
      <MaterialReactTable
        columns={columns}
        data={data}
        showGlobalFilter={false} // Hide the built-in global filter
        renderTopToolbarCustomActions={() => (
          <IconButton onClick={handleSearchIconClick} title="Search">
            <SearchIcon />
          </IconButton>
        )}
        // other props as needed
      />
    </div>
  );
}

export default App;