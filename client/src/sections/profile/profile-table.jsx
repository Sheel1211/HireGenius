import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const BorderedTableCell = ({ value, sx }) => {
  return (
    <>
      <TableCell
        sx={{
          "&:first-of-type": { fontWeight: "bold" },
          fontSize: 16,
          border: "1px solid #ddd",
          textAlign: "justify",
          ...sx,
        }}
      >
        {value}
      </TableCell>
    </>
  );
};

const ProfileTable = ({ client }) => {
  return (
    <>
      <TableContainer mt={10}>
        <Table>
          <TableHead>
            <TableRow>
              <BorderedTableCell value="Label" sx={{ width: "20%" }} />
              <BorderedTableCell value="Value" sx={{ width: "80%" }} />
              {/* <BorderedTableCell value="Options" sx={{ width: "20%" }} /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Name */}
            <TableRow>
              <BorderedTableCell value="Name" />
              <BorderedTableCell value={client.name} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Email */}
            <TableRow>
              <BorderedTableCell value="Email" />
              <BorderedTableCell value={client.email} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* About */}
            <TableRow>
              <BorderedTableCell value="About" />
              <BorderedTableCell value={client.description} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Website */}
            <TableRow>
              <BorderedTableCell value="Website" />
              <BorderedTableCell value={client.url} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Sector */}
            <TableRow>
              <BorderedTableCell value="Sector" />
              <BorderedTableCell value={client.sector} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Contact No. */}
            <TableRow>
              <BorderedTableCell value="Contact" />
              <BorderedTableCell value={client.contactno} />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Logo */}
            <TableRow>
              <BorderedTableCell value="Logo" />
              <BorderedTableCell
                value={
                  <img
                    src={client.logo ? client.logo.url : client.logo}
                    alt={`${client.name}_logo`}
                    loading="lazy"
                    style={{ objectFit: "contain" }}
                  />
                }
              />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>

            {/* Proof */}
            <TableRow>
              <BorderedTableCell value="Proof" />
              <BorderedTableCell
                value={
                  <img
                    src={
                      client.validcertificate
                        ? client.validcertificate.url
                        : client.validcertificate
                    }
                    alt={`${client.name}_certificate`}
                    style={{ objectFit: "contain" }}
                  />
                }
              />
              {/* <BorderedTableCell value="Edit" /> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileTable;
