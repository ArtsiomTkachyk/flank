import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ color }) {
  return <CircularProgress sx={{ color: color }} />;
}
