"use client";

import { TextField } from "@mui/material";

export default function UserInformationForm() {
  return (
    <form>
      <div className="grid grid-cols-3 gap-8">
        <TextField label="نام" placeholder="مطابق شناسنامه" fullWidth />
        <TextField
          label="نام خانوادگی"
          placeholder="مطابق شناسنامه"
          fullWidth
        />
        <TextField label="کد ملی" fullWidth />
        <TextField label="نام پدر" fullWidth />
        <TextField label="شماره تماس" fullWidth />
        <TextField label="کالای درخواستی" fullWidth />
        <TextField label="کد پستی" />
        <TextField label="آدرس محل سکونت" multiline fullWidth />
      </div>
    </form>
  );
}
