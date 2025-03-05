"use client";

import { useState, useMemo } from "react";
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const schools = [
  {
    name: "Springfield Elementary",
    domainName: "springfield.edu",
    students: 450,
    isActive: true,
  },
  {
    name: "Riverdale High",
    domainName: "riverdale.edu",
    students: 820,
    isActive: true,
  },
  {
    name: "Westview Academy",
    domainName: "westview.edu",
    students: 375,
    isActive: false,
  },
  {
    name: "Sunnydale High",
    domainName: "sunnydale.edu",
    students: 680,
    isActive: true,
  },
  {
    name: "Greendale Community",
    domainName: "greendale.edu",
    students: 1200,
    isActive: true,
  },
  {
    name: "Shermer High",
    domainName: "shermer.edu",
    students: 950,
    isActive: false,
  },
  {
    name: "Hill Valley High",
    domainName: "hillvalley.edu",
    students: 720,
    isActive: true,
  },
];

type SortField = "name" | "domainName" | "students" | "isActive";
type SortDirection = "asc" | "desc";

export function SchoolTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = schools.filter((school) => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        school.name.toLowerCase().startsWith(searchLower) ||
        school.domainName.toLowerCase().startsWith(searchLower) ||
        school.students.toString().startsWith(searchTerm) ||
        (school.isActive ? "yes" : "no").startsWith(searchLower)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortField === "students") {
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else if (sortField === "isActive") {
        return sortDirection === "asc"
          ? a[sortField] === b[sortField]
            ? 0
            : a[sortField]
              ? -1
              : 1
          : a[sortField] === b[sortField]
            ? 0
            : a[sortField]
              ? 1
              : -1;
      } else {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });
  }, [searchTerm, sortField, sortDirection]);

  return (
    <div className="space-y-4 p-12">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search Schools"
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="px-1">
          <TableHeader className="bg-muted/50">
            <TableRow className="text-center">
              <TableHead className="px-4">
                <Button
                  variant="ghost"
                  className="h-7 p-0 hover:bg-transparent font-medium"
                  onClick={() => handleSort("name")}
                >
                  <span>School</span>
                  {sortField === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="px-4">
                <Button
                  variant="ghost"
                  className="h-7 p-0 hover:bg-transparent font-medium"
                  onClick={() => handleSort("domainName")}
                >
                  <span>Domain</span>
                  {sortField === "domainName" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="px-4 text-center">
                <Button
                  variant="ghost"
                  className="h-7 p-0 hover:bg-transparent font-medium"
                  onClick={() => handleSort("students")}
                >
                  <span>Number of Students</span>
                  {sortField === "students" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="px-4 text-center">
                <Button
                  variant="ghost"
                  className="h-7 p-0 hover:bg-transparent font-medium"
                  onClick={() => handleSort("isActive")}
                >
                  <span>In Partnership</span>
                  {sortField === "isActive" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="px-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow className="px-4">
                <TableCell colSpan={5} className="h-24 text-center">
                  No schools found starting with "{searchTerm}".
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((school) => (
                <TableRow key={school.name} className="p-4">
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>{school.domainName}</TableCell>
                  <TableCell className="text-center">
                    {school.students}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={school.isActive ? "success" : "secondary"}
                      className={
                        school.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }
                    >
                      {school.isActive ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                      >
                        <Pencil className="h-4 w-4 " />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive/90 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
