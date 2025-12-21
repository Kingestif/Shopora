"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  ShieldCheck,
  Search,
  MoreHorizontal,
  Ban,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_USERS = [
  {
    id: "1",
    name: "Marcus Thorne",
    email: "marcus@tech.com",
    role: "SELLER",
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    email: "elena@design.io",
    role: "BUYER",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    email: "s.jenkins@admin.com",
    role: "ADMIN",
  },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Quantum Watch",
    price: 540,
    seller: "Marcus Thorne",
    description: "A high-precision timepiece with haptic feedback.",
  },
  {
    id: "2",
    name: "Stealth Hoodie",
    price: 120,
    seller: "Vapor Studio",
    description: "Water-repellent fabric with hidden zip pockets.",
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Control Panel
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Platform-wide management
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Global search..."
            className="pl-10 h-10 w-64 rounded-full bg-slate-50 border-none"
          />
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="users"
            className="rounded-lg px-6 font-bold uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Users ({users.length})
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="rounded-lg px-6 font-bold uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Products ({products.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="rounded-2xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-sm uppercase tracking-widest py-4">
                    ID
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Email
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Role
                  </TableHead>
                  <TableHead className="text-right font-bold text-sm uppercase tracking-widest">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono text-[10px] text-slate-400">
                      {user.id}
                    </TableCell>
                    <TableCell className="font-bold text- text-slate-900">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "outline"}
                        className="rounded-md font-mono text-xs bg-black text-white px-2"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <UserActions />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="rounded-2xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-sm uppercase tracking-widest py-4">
                    Product ID
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Seller
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Price
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Description
                  </TableHead>
                  <TableHead className="text-right font-bold text-sm uppercase tracking-widest">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono text-[10px] text-slate-400">
                      {product.id}
                    </TableCell>
                    <TableCell className="font-bold text-slate-900">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {product.seller}
                    </TableCell>
                    <TableCell className="font-black italic">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-slate-500 max-w-xs truncate">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50 h-8 w-8 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
          <MoreHorizontal className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl">
        <DropdownMenuLabel className="text-xs uppercase text-slate-400">
          Moderation
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base font-semibold">
          Edit Role
        </DropdownMenuItem>
        <DropdownMenuItem className="text-base text-red-600 font-semibold cursor-pointer">
          <Ban className="mr-2 h-4 w-4" /> Suspend
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
