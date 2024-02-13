import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './columnReferences'; // Import the columns
import { TextField } from '@mui/material';

function App() {
  // Sample data to display in the table
  const initialData = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 34 },
    // Add more data as needed
  ];

  // State to hold the search filter
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setData] = useState(initialData);

 

  // Effect to filter data when globalFilter changes
  React.useEffect(() => {
    const filteredData = initialData.filter(
      (item) =>
        item.firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.age.toString().includes(globalFilter)
    );
    setData(filteredData);
  }, [globalFilter]);

  return (
    <div>
      {/* Search box */}
      <TextField
        id="search"
        type="text"
        placeholder="Search..."
        variant="outlined"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <MaterialReactTable
        columns={columns}
        data={data}
        // Removed the global filter props
      />
    </div>
  );
}

export default App;
