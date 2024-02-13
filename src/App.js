// App.js or your main component file

import React, { useState, useEffect,useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { TextField } from "@mui/material";
import { columns } from "./columnReferences"; // assuming this is where your columns are imported from

function App() {
  // The initial unfiltered data
  const initialData = useMemo(
    () => [
      { id: 1, firstName: "John", lastName: "Doe", age: 28 },
      { id: 2, firstName: "Jane", lastName: "Doe", age: 34 },
      // ...other data
    ],
    []
  );

  // State to hold the search filter
  const [globalFilter, setGlobalFilter] = useState("");

  // State to hold the filtered data that will be passed to the table
  const [data, setData] = useState(initialData);

  // Effect to filter data when globalFilter changes
  useEffect(() => {
    if (globalFilter) {
      const filteredData = initialData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.age.toString().includes(globalFilter)
      );
      setData(filteredData);
    } else {
      setData(initialData); // if there's no filter, show all data
    }
  }, [globalFilter, initialData]); // dependencies array

  return (
    <div>
      {/* Search box */}
      <TextField
        id="search"
        type="text"
        placeholder="Search..."
        variant="outlined"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <MaterialReactTable
        columns={columns} // Use the imported columns
        data={data} // Use the state which holds the (filtered) data
        showGlobalFilter={false} // Hide the built-in global filter search box
        // ... other props
      />
    </div>
  );
}

export default App;
