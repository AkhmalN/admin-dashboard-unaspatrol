import React from "react";

function CheckboxColumn({ rowData, selectedRows, setSelectedRows }) {
  const rowCheckbox = (
    <input
      type="checkbox"
      checked={selectedRows.includes(rowData)}
      onChange={(e) => {
        const isChecked = e.target.checked;
        setSelectedRows((prevSelectedRows) => {
          if (isChecked) {
            return [...prevSelectedRows, rowData];
          } else {
            return prevSelectedRows.filter((row) => row !== rowData);
          }
        });
      }}
    />
  );

  return <td>{rowCheckbox}</td>;
}

export default CheckboxColumn;
