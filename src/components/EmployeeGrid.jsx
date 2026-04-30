import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const EmployeeGrid = ({ data }) => {
  const gridRef = useRef();
  const timeoutRef = useRef(null);

  //  Page size state
  const [pageSize, setPageSize] = useState(5);

  //  Columns
  const columnDefs = useMemo(
    () => [
      { field: "id" },
      {
        headerName: "Full Name",
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
        sortable: true,
        filter: true,
      },
      { field: "email", minWidth: 250 },
      { field: "department" },
      { field: "position", minWidth: 150 },
      {
        field: "salary",
        valueFormatter: (params) => `₹${params.value}`,
      },
      { field: "age" },
      { field: "location" },
      { field: "performanceRating" },
      { field: "projectsCompleted" },
      {
        field: "isActive",
        cellRenderer: (params) => (params.value ? "🟢 Active" : "🔴 Inactive"),
      },
      {
        field: "skills",
        valueGetter: (params) => params.data.skills.join(", "),

        tooltipValueGetter: (params) => params.data.skills.join(", "),

        cellRenderer: (params) => {
          const text = params.value || "";
          const isMobile = window.innerWidth <= 640;

          //  Mobile → show full text
          if (isMobile) {
            return (
              <div
                style={{ maxWidth: "100%", height: "100%" }}
                className="whitespace-normal break-words text-sm"
              >
                {text}
              </div>
            );
          }

          //  Desktop → truncate with ...
          return (
            <div className="truncate" style={{ maxWidth: "100%" }}>
              {text}
            </div>
          );
        },
      },
      { field: "manager" },
    ],
    [],
  );

  //  Default column settings
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      resizable: true,
    }),
    [],
  );

  //  Debounced Search
  const handleSearch = (value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }, 200);
  };

  //  Page size change
  const onPageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);

    gridRef.current.api.setGridOption("paginationPageSize", newSize);
  };

  //  Dynamic height
  const getGridHeight = () => {
    if (pageSize <= 5) return "400px";
    if (pageSize <= 10) return "600px";
    return "1200px";
  };

  return (
    <div className="mt-6 w-full bg-white p-4 rounded-xl shadow-md">
      {/*  Search + Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Rows:</label>
          <select
            value={pageSize}
            onChange={onPageSizeChange}
            className="border p-2 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/*  Grid */}
      <div
        className="ag-theme-quartz rounded-lg overflow-hidden"
        style={{
          height: getGridHeight(),
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={data}
          rowHeight={52}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType="clientSide"
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={false}
          tooltipShowDelay={200}
          tooltipMouseTrack={true}
          headerHeight={60}
        />
      </div>
    </div>
  );
};

export default EmployeeGrid;
