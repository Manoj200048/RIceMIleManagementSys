import React from "react";

import { TableRow, TableCell } from "@mui/material";

function PaddyView(props) {
  const {
    product_ID,
    bach_NO,
    poroduct_NAME,
    manufacture_DATE,
    expire_DATE,
    weight,
    discription,
  } = props.User || {};

  // Formatting date to display only date without time
  //   const formattedDate = new Date(pDate).toLocaleDateString();
  return (
    <TableRow>
      <TableCell>{product_ID}</TableCell>
      <TableCell>{bach_NO}</TableCell>
      <TableCell>{poroduct_NAME}</TableCell>
      <TableCell>{manufacture_DATE}</TableCell>
      <TableCell>{expire_DATE}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{discription}</TableCell>
    </TableRow>
  );
}

export default PaddyView;
