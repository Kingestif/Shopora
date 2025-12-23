"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 10;

export default function SellerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/products`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const json = await res.json();

        if (json.status !== "success" || !Array.isArray(json.data)) {
          throw new Error("Invalid response from server");
        }

        const mapped: Product[] = json.data.map((p: Product) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          imageUrl: p.imageUrl,
          price: Number(p.price) || 0,
        }));

        setProducts(mapped);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    removeImage();
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.statusText}`);
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while deleting the product.");
      }
    }
  };

  const handlePublish = async () => {
    if (!name || !price || !description || !selectedFile) {
      setError("Please fill all fields and add an image.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", selectedFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/post-product`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to create product: ${res.statusText}`);
      }

      const json = await res.json();
      if (json.status !== "success") {
        throw new Error("Failed to create product");
      }

      // Refresh product list after successful creation
      try {
        setLoading(true);
        const productsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/products`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (productsRes.ok) {
          const productsJson = await productsRes.json();
          if (
            productsJson.status === "success" &&
            Array.isArray(productsJson.data)
          ) {
            const mapped: Product[] = productsJson.data.map((p: Product) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              imageUrl: p.imageUrl,
              price: Number(p.price) || 0,
            }));
            setProducts(mapped);
          }
        }
      } finally {
        setLoading(false);
      }

      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while creating the product.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-2 block">
            Store.Management_v1
          </span>
          <h1 className="text-4xl font-bold tracking-tighter">Inventory</h1>
          <p className="text-slate-500 text-lg">
            Manage your product catalog and assets.
          </p>
        </div>

        <Dialog onOpenChange={(open) => !open && removeImage()}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-black hover:bg-zinc-800 shadow-xl px-6">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-zinc-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Create New Product
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label className="text-xs font-mono uppercase text-zinc-500">
                  Product Media
                </Label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center min-h-[160px] 
                    ${
                      selectedImage
                        ? "border-zinc-200 bg-zinc-50"
                        : "border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50/50"
                    }`}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-32 p-2">
                      <Image
                        src={selectedImage}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute top-1 right-1 bg-black text-white rounded-full p-1 hover:bg-zinc-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="mx-auto w-10 h-10 mb-3 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-medium text-zinc-900">
                        Click to upload
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        PNG, JPG or WebP (max. 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-mono uppercase text-zinc-500"
                >
                  Product Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Essential Tee"
                  className="rounded-lg border-zinc-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="price"
                  className="text-xs font-mono uppercase text-zinc-500"
                >
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="99.00"
                  className="rounded-lg border-zinc-200"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="desc"
                  className="text-xs font-mono uppercase text-zinc-500"
                >
                  Description
                </Label>
                <Textarea
                  id="desc"
                  placeholder="Product details..."
                  className="rounded-lg border-zinc-200 resize-none h-24"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full bg-black py-6 rounded-xl font-bold uppercase tracking-widest text-xs disabled:opacity-60"
              onClick={handlePublish}
              disabled={submitting}
            >
              {submitting ? "Publishing..." : "Publish Product"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        {error && <div className="px-6 py-4 text-sm text-red-500">{error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="px-6 py-8 text-sm text-zinc-400 italic">
            You haven&apos;t published any products yet.
          </div>
        )}

        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[80px] font-mono text-sm uppercase">
                Media
              </TableHead>
              <TableHead className="font-mono text-sm uppercase">
                Details
              </TableHead>
              <TableHead className="text-right font-mono text-sm uppercase">
                Price
              </TableHead>
              <TableHead className="text-center font-mono text-sm uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="border-zinc-50 animate-pulse"
                  >
                    <TableCell>
                      <div className="w-12 h-12 rounded-xl bg-zinc-100" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-zinc-100 rounded-full" />
                        <div className="h-3 w-48 bg-zinc-100 rounded-full" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-zinc-100 rounded-full ml-auto" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-zinc-100" />
                        <div className="h-8 w-8 rounded-lg bg-zinc-100" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-zinc-50 group transition-colors hover:bg-zinc-50/30"
                  >
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="48px"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 text-lg">
                          {product.name}
                        </span>
                        <span className="text-zinc-500 text-sm line-clamp-1">
                          {product.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-zinc-400 hover:text-black hover:bg-white border border-transparent hover:border-zinc-200 transition-all"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {!loading && products.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50/60">
            <p className="text-xs text-zinc-500 font-mono">
              Page {safeCurrentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
