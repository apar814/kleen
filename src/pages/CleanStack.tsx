import React, { useState } from 'react';
import { Product } from '@/types/Product';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';

const CleanStack = () => {
  const [stackName, setStackName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]); // Replace 'any' with your Product type

  const handleSaveStack = () => {
    // Implement save stack logic here
    console.log('Saving stack with name:', stackName, 'and products:', products);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <DashboardLayout title="My Clean Stack" description="Create and manage your personalized clean product stacks">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="stackName" className="text-sm font-medium leading-none">
                Stack Name
              </label>
              <Input
                type="text"
                id="stackName"
                placeholder="e.g., Morning Routine, Gym Essentials"
                value={stackName}
                onChange={(e) => setStackName(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveStack}>Save Stack</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}><Search className="w-4 h-4" /></Button>
            </div>

            {/* Product List (Replace with actual product list) */}
            {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="flex items-center justify-between">
                    {product.name}
                    <Button variant="ghost">Remove</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products added yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Product</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Example Product (Replace with a real product card) */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Product Name</h3>
                <p className="text-sm text-gray-500">Brand</p>
              </div>
              <Button onClick={() => handleAddProduct({ id: 'example', name: 'Example Product', brand: 'Example Brand', category: 'Unknown', price: 0, ingredients: [], cleanScore: 75 })}>
                <Heart className="w-4 h-4 mr-2" /> Add to Stack
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CleanStack;
