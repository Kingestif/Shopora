"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  sellerId: string;
}

const PAGE_SIZE = 15;

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleUserCount, setVisibleUserCount] = useState(PAGE_SIZE);
  const [visibleProductCount, setVisibleProductCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/products`, {
            credentials: "include",
          }),
        ]);

        if (!usersRes.ok) {
          throw new Error(`Failed to fetch users: ${usersRes.statusText}`);
        }
        if (!productsRes.ok) {
          throw new Error(
            `Failed to fetch products: ${productsRes.statusText}`
          );
        }

        const usersJson = await usersRes.json();
        const productsJson = await productsRes.json();

        if (!Array.isArray(usersJson.data) || usersJson.status !== "success") {
          throw new Error("Invalid users response from server");
        }
        if (
          !Array.isArray(productsJson.data) ||
          productsJson.status !== "success"
        ) {
          throw new Error("Invalid products response from server");
        }

        const mappedUsers: User[] = usersJson.data.map((u: User) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
        }));

        const mappedProducts: Product[] = productsJson.data.map(
          (p: Product) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: String(p.price),
            imageUrl: p.imageUrl,
            sellerId: p.sellerId,
          })
        );

        setUsers(mappedUsers);
        setProducts(mappedProducts);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong while loading admin data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

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

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

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
                    #
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
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index} className="animate-pulse">
                        <TableCell className="font-mono text-[10px] text-slate-400">
                          <div className="h-3 w-4 bg-slate-100 rounded" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-32 bg-slate-100 rounded-full mb-2" />
                          <div className="h-3 w-24 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-40 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <div className="h-5 w-16 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="h-8 w-8 bg-slate-100 rounded-full inline-block" />
                        </TableCell>
                      </TableRow>
                    ))
                  : users.slice(0, visibleUserCount).map((user, index) => (
                      <TableRow key={user.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono text-[10px] text-slate-400">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-bold text- text-slate-900">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-slate-500">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "ADMIN" ? "default" : "outline"
                            }
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
          {!loading && users.length > visibleUserCount && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setVisibleUserCount((prev) =>
                    Math.min(prev + PAGE_SIZE, users.length)
                  )
                }
              >
                View more users
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="products">
          <div className="rounded-2xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-sm uppercase tracking-widest py-4">
                    Media
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    #
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-sm uppercase tracking-widest">
                    Price
                  </TableHead>
                  <TableHead className="text-right font-bold text-sm uppercase tracking-widest">
                    Description
                  </TableHead>
                  <TableHead className="text-right font-bold text-sm uppercase tracking-widest">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index} className="animate-pulse">
                        <TableCell>
                          <div className="h-10 w-10 rounded-lg bg-slate-100" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-6 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-32 bg-slate-100 rounded-full mb-2" />
                          <div className="h-3 w-24 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-16 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <div className="h-3 w-40 bg-slate-100 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="h-8 w-8 rounded-full bg-slate-100 inline-block" />
                        </TableCell>
                      </TableRow>
                    ))
                  : products
                      .slice(0, visibleProductCount)
                      .map((product, index) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-slate-50/50"
                        >
                          <TableCell className="font-mono text-[10px] text-slate-400">
                            <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-slate-900">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-slate-600 font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell className="font-black italic">
                            ${Number(product.price).toLocaleString()}
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
          {!loading && products.length > visibleProductCount && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setVisibleProductCount((prev) =>
                    Math.min(prev + PAGE_SIZE, products.length)
                  )
                }
              >
                View more products
              </Button>
            </div>
          )}
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
