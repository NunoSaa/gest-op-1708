import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material"; // Assuming you're using Material UI

const GravidadeVitimaComponent = () => {
  // Initialize state from localStorage or set defaults
  const [gravidadeVitimaData, setGravidadeVitimaData] = useState({
    leve: localStorage.getItem("leve") === "true",
    grave: localStorage.getItem("grave") === "true",
    morto: localStorage.getItem("morto") === "true",
    assistido: localStorage.getItem("assistido") === "true",
  });

  // Function to handle checkbox changes and save to localStorage
  const handleChangeGravidade = (e) => {
    const { name, checked } = e.target;

    // Update the state
    const updatedData = { ...gravidadeVitimaData, [name]: checked };
    setGravidadeVitimaData(updatedData);

    // Save the updated value in localStorage
    localStorage.setItem(name, checked);
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
                  <td style={styles.td}>
                    <Checkbox
                      name="leve"
                      checked={gravidadeVitimaData.leve}
                      onChange={handleChangeGravidade}
                    />
                  </td>
                  <td style={styles.td}>
                    <Checkbox
                      name="grave"
                      checked={gravidadeVitimaData.grave}
                      onChange={handleChangeGravidade}
                    />
                  </td>
                  <td style={styles.td}>
                    <Checkbox
                      name="morto"
                      checked={gravidadeVitimaData.morto}
                      onChange={handleChangeGravidade}
                    />
                  </td>
                  <td style={styles.td}>
                    <Checkbox
                      name="assistido"
                      checked={gravidadeVitimaData.assistido}
                      onChange={handleChangeGravidade}
                    />
                  </td>
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
