"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { faIR } from "@mui/x-data-grid/locales";

import { HiEye } from "react-icons/hi2";
import Link from "next/link";

import { generateStatusInfo } from "@/utils/funcs/statusInfo";
import { Chip, IconButton } from "@mui/material";
import { getDate } from "@/utils/funcs/date/date";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "tracking_code", headerName: "کد پیگیری", width: 110 },
  { field: "product_name", headerName: "کالای درخواستی", width: 200 },
  {
    field: "createdAt",
    headerName: "تاریخ ایجاد",
    align: "center",
    renderCell: ({ row }) => {
      return <>{getDate(new Date(row.createdAt)).getCompleteFormat()}</>;
    },
    width: 130,
  },
  {
    field: "status",
    headerName: "آخرین وضعیت",

    renderCell: ({ row }) => {
      const info = generateStatusInfo(row.status);

      return (
        <div className="flex items-center justify-center h-full">
          <Chip
            onClick={() => {}}
            clickable={false}
            label={info?.text}
            sx={{ background: info?.lightColor, color: info?.mainColor }}
          />
        </div>
      );
    },
    width: 170,
  },
  {
    field: "actions",
    headerName: "عملیات",
    renderCell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-full">
          <IconButton>
            <Link
              href={`/dashboard/loan/info/${row.tracking_code}`}
              className="flex items-center justify-center h-full"
              target="_blank"
            >
              <HiEye className="text-2xl text-blue-600" />
            </Link>
          </IconButton>
        </div>
      );
    },
    width: 80,
  },
];

const rows = [
  {
    id: 1,
    product_name: "آیفون 16 پرو مکس",
    createdAt: "Snow",
    firstName: "Jon",
    status: "hel",
    age: 14,
    tracking_code: "fdafds",
  },
];

export default function RequestedLoansTable({
  requestedLoans,
}: {
  requestedLoans: any[];
}) {
  console.log(requestedLoans);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={requestedLoans}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
        getRowId={(row) => row._id}
      />
    </Box>
  );
}
