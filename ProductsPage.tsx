import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatCurrency } from '../../lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
export function ProductsPage() {
  const { customProducts, addCustomProduct, deleteCustomProduct } =
  useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'electronics' as 'electronics' | 'medical' | 'perfume',
    description: '',
    image: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill all required fields');
      return;
    }
    addCustomProduct({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      imageColor: 'bg-gray-200',
      rating: 5.0
    });
    toast.success('Product added successfully!');
    setIsAdding(false);
    setFormData({
      name: '',
      price: '',
      category: 'electronics',
      description: '',
      image: ''
    });
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1628]">Manage Products</h1>
          <p className="text-gray-500 mt-1">
            Add or remove custom products from your store.
          </p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </Button>
      </div>

      {isAdding &&
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
              label="Product Name *"
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              }
              placeholder="e.g. iPhone 15 Pro" />
            
              <Input
              label="Price (HTG) *"
              type="number"
              value={formData.price}
              onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value
              })
              }
              placeholder="e.g. 150000" />
            
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                className="flex h-11 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                value={formData.category}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as any
                })
                }>
                
                  <option value="electronics">Électronique</option>
                  <option value="medical">Médical</option>
                  <option value="perfume">Parfums</option>
                </select>
              </div>
              <Input
              label="Image URL *"
              value={formData.image}
              onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value
              })
              }
              placeholder="https://..." />
            
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
              className="w-full min-h-[100px] rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              }
              placeholder="Product description..." />
            
            </div>
            <div className="flex justify-end space-x-3">
              <Button
              variant="outline"
              type="button"
              onClick={() => setIsAdding(false)}>
              
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </div>
          </form>
        </div>
      }

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#0A1628]">
            Your Custom Products
          </h2>
        </div>
        {customProducts.length === 0 ?
        <div className="p-8 text-center text-gray-500">
            No custom products added yet. Click "Add Product" to create one.
          </div> :

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customProducts.map((product) =>
              <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover mr-3 bg-gray-100" />
                  
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-[#F59E0B]">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                    onClick={() => deleteCustomProduct(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>);

}