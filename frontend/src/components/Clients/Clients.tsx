import { ColumnDef, Row } from "@tanstack/react-table";
import AddIcon from "../../utils/Icons/Add";
import Button from "../Button/Button";
import { PiDownloadSimpleThin } from "react-icons/pi";
import { Checkbox } from "../Checkbox/CheckBox";
import { formatDate } from "../../utils/helpers";
import { IClient } from "../../utils/helpers/types/interfaces";
import { Table } from "../Table/Table";
import { clients } from "../../utils/data/clients";
import React from "react";
import { SearchInput } from "../SearchInput/SearchInput";

const columns: ColumnDef<IClient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pt-[15px]">
        <Checkbox
          handleChange={table.getToggleAllRowsSelectedHandler()}
          indeterminate={table.getIsSomeRowsSelected()}
          label=""
          name="row"
          value="row"
          isChecked={table.getIsAllRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        handleChange={row.getToggleSelectedHandler()}
        indeterminate={row.getIsSomeSelected()}
        label=""
        name="row"
        value="row"
        isChecked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Added On",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "client_name",
    header: "Name",
  },

  {
    accessorKey: "identification_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "services",
    header: "Services",
  },
  {
    accessorKey: "returning_client",
    header: "Returning Client",
    cell: ({ row }) => (
      <div>{row.original.returning_client === true ? "Yes" : "No"}</div>
    ),
  },
];

export default function Clients() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [getSelectedClaimsData, setGetSelectedClaimsData] = React.useState<
    Row<IClient>[]
  >([]);
  console.log(getSelectedClaimsData, "claims");

  return (
    <div>
      <div className="flex items-center">
        <SearchInput
          containerClass="w-1/5 h-32 bg-white text-sm shadow-active has-[:focus-visible]:border-primary"
          placeholder="Search by client name"
          // onChange={handleSetSearchString}
        />
        <div className="ml-auto flex gap-10">
          <div>
            <Button
              type="button"
              className="bg-white border border-strokelight w-[15rem] text-gray h-[3.5rem] text-[13px]"
              iconLeft={<PiDownloadSimpleThin size={25} />}
            >
              Export to CSV
            </Button>
          </div>
          <div className="flex gap-5">
            <Button
              type="button"
              className="w-[15rem] h-[3.5rem] text-sm"
              iconLeft={<AddIcon />}
            >
              Add Client
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Table
          columns={columns}
          data={clients}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          setGetSelectedData={setGetSelectedClaimsData}
        />
      </div>
    </div>
  );
}
