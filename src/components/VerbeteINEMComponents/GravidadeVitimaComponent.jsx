import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material"; // Assuming you're using Material UI

const GravidadeVitimaComponent = ({ onSelectionChange }) => {
  // Initialize state from localStorage or set defaults
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedGravidade") || "");

  // Function to handle checkbox selection (only one at a time)
  const handleChangeGravidade = (e) => {
    const { name } = e.target;

    // Update the selected option
    setSelectedOption(name);

    // Save the selected option in localStorage
    localStorage.setItem("selectedGravidade", name);

    // Notify the parent component
    if (onSelectionChange) {
      onSelectionChange(name);
    }
  };

  return (
    <table style={{ ...styles.table, marginTop: '10px' }}>
      <thead>
        <tr>
          <th style={styles.th}>Gravidade da Vitima</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th_1}>Leve</th>
                  <th style={styles.th_1}>Grave</th>
                  <th style={styles.th_1}>Morto</th>
                  <th style={styles.th_1}>Assistido</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["Leve", "Grave", "Morto", "Assistido"].map((key) => (
                    <td key={key} style={styles.td}>
                      <Checkbox
                        name={key}
                        checked={selectedOption === key}
                        onChange={handleChangeGravidade}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Styles (you can customize these as needed)
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#0065ad", // Blue color for headers
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: "12px",
  },
  th_1: {
    backgroundColor: "#3F9CFA", // Lighter blue for subheaders
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: "12px",
  },
  td: {
    padding: "5px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: "12px",
  },
};

export default GravidadeVitimaComponent;
