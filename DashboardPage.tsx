import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { Package, Smartphone, Activity, Trophy } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell } from
'recharts';
export function DashboardPage() {
  const { allElectronics, allMedical, allTennis, customProducts } =
  useProducts();
  const totalProducts =
  allElectronics.length + allMedical.length + allTennis.length;
  const stats = [
  {
    title: 'Total Products',
    value: totalProducts,
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    title: 'Electronics',
    value: allElectronics.length,
    icon: Smartphone,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    title: 'Medical',
    value: allMedical.length,
    icon: Activity,
    color: 'text-teal-600',
    bg: 'bg-teal-100'
  },
  {
    title: 'Tennis',
    value: allTennis.length,
    icon: Trophy,
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  }];

  const pieData = [
  {
    name: 'Electronics',
    value: allElectronics.length,
    color: '#4F46E5'
  },
  {
    name: 'Medical',
    value: allMedical.length,
    color: '#0D9488'
  },
  {
    name: 'Tennis',
    value: allTennis.length,
    color: '#F59E0B'
  }];

  // Group products by price range for the bar chart
  const allProducts = [...allElectronics, ...allMedical, ...allTennis];
  const priceRanges = [
  {
    name: '< 5k HTG',
    count: allProducts.filter((p) => p.price < 5000).length
  },
  {
    name: '5k-20k HTG',
    count: allProducts.filter((p) => p.price >= 5000 && p.price < 20000).
    length
  },
  {
    name: '20k-50k HTG',
    count: allProducts.filter((p) => p.price >= 20000 && p.price < 50000).
    length
  },
  {
    name: '> 50k HTG',
    count: allProducts.filter((p) => p.price >= 50000).length
  }];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A1628]">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your store's inventory.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) =>
        <div
          key={stat.title}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[#0A1628]">
                {stat.value}
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#0A1628] mb-6">
            Products by Price Range
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceRanges}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{
                    fill: '#f3f4f6'
                  }} />
                
                <Bar dataKey="count" fill="#0A1628" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#0A1628] mb-6">
            Inventory Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {pieData.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry) =>
            <div key={entry.name} className="flex items-center">
                <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor: entry.color
                }} />
              
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}