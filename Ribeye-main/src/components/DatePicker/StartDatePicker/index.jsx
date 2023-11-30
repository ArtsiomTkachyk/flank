import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StartDatePicker({ minDate, maxDate, startDate, changeEvent }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor="startDate"> Start Date</label>
      <DemoContainer
        components={["DatePicker", "DatePicker"]}>
        <DatePicker
          id="startDate"
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          sx={{
            width: "100%",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid rgba(112, 128, 144, 0.40)",
          }}
          value={dayjs(startDate)}
          onChange={(newValue) => changeEvent(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
