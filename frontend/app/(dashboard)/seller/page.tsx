"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MOCK_PRODUCTS = [
  { id: "1", name: "Cyberpunk Jacket", price: 299, description: "Limited edition neon wear", image: "/favicon.png" },
  { id: "2", name: "Oversized Hoodie", price: 85, description: "Heavyweight cotton", image: "https://via.placeholder.com/40" },
];

export default function SellerPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-2 block">Store.Management_v1</span>
          <h1 className="text-4xl font-bold tracking-tighter">Inventory</h1>
          <p className="text-slate-500 text-lg">Manage your product catalog and assets.</p>
        </div>

        <Dialog onOpenChange={(open) => !open && removeImage()}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-black hover:bg-zinc-800 shadow-xl px-6">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-zinc-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">Create New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              
              <div className="grid gap-2">
                <Label className="text-xs font-mono uppercase text-zinc-500">Product Media</Label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center min-h-[160px] 
                    ${selectedImage ? 'border-zinc-200 bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50/50'}`}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full p-2">
                      <img src={selectedImage} alt="Preview" className="w-full h-32 object-contain rounded-lg" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
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
                      <p className="text-sm font-medium text-zinc-900">Click to upload</p>
                      <p className="text-xs text-zinc-500 mt-1">PNG, JPG or WebP (max. 5MB)</p>
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
                <Label htmlFor="name" className="text-xs font-mono uppercase text-zinc-500">Product Name</Label>
                <Input id="name" placeholder="e.g. Essential Tee" className="rounded-lg border-zinc-200" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-mono uppercase text-zinc-500">Price ($)</Label>
                <Input id="price" type="number" placeholder="99.00" className="rounded-lg border-zinc-200" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="desc" className="text-xs font-mono uppercase text-zinc-500">Description</Label>
                <Textarea id="desc" placeholder="Product details..." className="rounded-lg border-zinc-200 resize-none h-24" />
              </div>
            </div>
            <Button className="w-full bg-black py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
              Publish Product
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[80px] font-mono text-sm uppercase">Media</TableHead>
              <TableHead className="font-mono text-sm uppercase">Details</TableHead>
              <TableHead className="text-right font-mono text-sm uppercase">Price</TableHead>
              <TableHead className="text-center font-mono text-sm uppercase">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-zinc-50 group transition-colors hover:bg-zinc-50/30">
                <TableCell>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 text-lg">{product.name}</span>
                    <span className="text-zinc-500 text-sm line-clamp-1">{product.description}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-lg">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-zinc-400 hover:text-black hover:bg-white border border-transparent hover:border-zinc-200 transition-all">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}