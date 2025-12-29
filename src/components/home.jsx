import React, { useState } from 'react';
import {
  Shield,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
  Calendar,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
  Eye,
  Edit2,
  Trash2,
  X,
  Check,
  ChevronDown,
  BarChart3,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Building2
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import logo from '../assets/image.png';
import { NewSaleModal } from './NewSaleModal';
import { InventoryScreen } from './InventoryScreen';
// import { SalesScreen } from './SalesScreen';
const TerminixPakistan = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedDept, setSelectedDept] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  // Departments with branding colors
  const departments = [
    { id: 'dept1', name: 'Residential Pest Control', short: 'Residential', color: 'from-blue-500 to-blue-600', icon: '🏠' },
    { id: 'dept2', name: 'Commercial Fumigation', short: 'Commercial', color: 'from-purple-500 to-purple-600', icon: '🏢' },
    { id: 'dept3', name: 'Termite Treatment', short: 'Termite', color: 'from-green-500 to-green-600', icon: '🐛' },
    { id: 'dept4', name: 'Rodent Control', short: 'Rodent', color: 'from-orange-500 to-orange-600', icon: '🐀' },
    { id: 'dept5', name: 'Disinfection Services', short: 'Disinfection', color: 'from-pink-500 to-pink-600', icon: '💧' },
    { id: 'dept6', name: 'Chemical Supplies', short: 'Chemicals', color: 'from-yellow-500 to-yellow-600', icon: '⚗️' },
    { id: 'dept7', name: 'Maintenance Contracts', short: 'Maintenance', color: 'from-red-500 to-red-600', icon: '🔧' }
  ];

   // Chart Data
  const cashFlowData = [
    { day: 'Mon', inflow: 85000, outflow: 42000 },
    { day: 'Tue', inflow: 102000, outflow: 55000 },
    { day: 'Wed', inflow: 78000, outflow: 38000 },
    { day: 'Thu', inflow: 125000, outflow: 68000 },
    { day: 'Fri', inflow: 98000, outflow: 45000 },
    { day: 'Sat', inflow: 115000, outflow: 60000 },
    { day: 'Sun', inflow: 92000, outflow: 35000 }
  ];

  const deptPerformanceData = [
    { name: 'Residential', value: 685000, fill: '#3b82f6' },
    { name: 'Commercial', value: 920000, fill: '#6366f1' },
    { name: 'Termite', value: 480000, fill: '#10b981' },
    { name: 'Rodent', value: 350000, fill: '#f59e0b' },
    { name: 'Disinfection', value: 420000, fill: '#06b6d4' },
    { name: 'Chemicals', value: 680000, fill: '#8b5cf6' },
    { name: 'Maintenance', value: 585000, fill: '#ec4899' }
  ];

  const yearlyTrend = [
    { month: 'Jan', sales: 2200000 }, { month: 'Feb', sales: 2450000 },
    { month: 'Mar', sales: 2380000 }, { month: 'Apr', sales: 2650000 },
    { month: 'May', sales: 2850000 }, { month: 'Jun', sales: 2980000 },
    { month: 'Jul', sales: 2750000 }, { month: 'Aug', sales: 2920000 },
    { month: 'Sep', sales: 3100000 }, { month: 'Oct', sales: 3250000 },
    { month: 'Nov', sales: 3180000 }, { month: 'Dec', sales: 3120000 }
  ];
  // Sample data
  const dashboardData = {
    todayCash: 125000,
    todaySales: 180000,
    monthSales: 2450000,
    todayExpenses: 55000,
    outstandingBalance: 340000,
    lowStockCount: 3,
    cashIn: 180000,
    cashOut: 55000
  };

  const salesData = [
    { id: 1, date: '2024-12-27 10:30 AM', dept: 'dept1', customer: 'Mr. Ahmed Khan', service: 'Complete Pest Treatment', amount: 25000, paid: 20000, status: 'partial' },
    { id: 2, date: '2024-12-27 02:15 PM', dept: 'dept2', customer: 'ABC Industries', service: 'Factory Fumigation', amount: 85000, paid: 0, status: 'pending' },
    { id: 3, date: '2024-12-27 04:45 PM', dept: 'dept3', customer: 'DHA Resident', service: 'Termite Protection', amount: 35000, paid: 35000, status: 'paid' }
  ];

  const inventoryData = [
    { id: 1, name: 'Cypermethrin 25% EC', dept: 'dept6', stock: 45, min: 20, unit: 'L', status: 'good', value: 112500 },
    { id: 2, name: 'Permethrin Powder', dept: 'dept6', stock: 8, min: 15, unit: 'Kg', status: 'low', value: 14400 },
    { id: 3, name: 'Rodent Bait Stations', dept: 'dept4', stock: 150, min: 50, unit: 'Pcs', status: 'good', value: 67500 },
    { id: 4, name: 'Termiticide Solution', dept: 'dept3', stock: 12, min: 25, unit: 'L', status: 'low', value: 38400 }
  ];

  // Authorization Modal
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-scale">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-red-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Authorization Required</h3>
          <p className="text-gray-600 mt-2">Enter admin credentials to proceed</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Authorization ID</label>
            <input
              type="text"
              placeholder="Enter ID"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAuthModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition">
              Cancel
            </button>
            <button onClick={() => { setShowAuthModal(false); if(pendingAction) pendingAction(); }} className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-lg font-semibold transition">
              Authorize
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Login Screen
  const LoginScreen = () => (
     <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 flex items-center justify-center p-6">
       <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
         <div className="p-12 text-white">
           <div className="flex items-center gap-4 mb-8">
             <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
               <img src={logo} alt="Terminix Logo" className="w-20 h-20" />
             </div>
             <div>
               <h1 className="text-5xl font-bold">Terminix</h1> 
               <p className="text-2xl font-light opacity-90">Pakistan</p>
             </div>
           </div>
           <h2 className="text-4xl font-bold mb-6">Enterprise Management System</h2>
           {/* {/* <p className="text-xl opacity-90 mb-10">Professional solution for pest control & fumigation businesses</p> */}
           <div className="space-y-4">
             {['Multi-Department Control', 'Real-Time Analytics', 'Secure Authorization', 'Inventory Alerts', 'Detailed Reporting'].map((feature, i) => (
               <div key={i} className="flex items-center gap-4">
                 <CheckCircle className="w-6 h-6 text-emerald-300" />
                 <span className="text-lg">{feature}</span>
               </div>
             ))}
           </div>
         </div>
         <div className="bg-white p-12 rounded-3xl">
           <h3 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back</h3>
           <div className="space-y-6">
             <input type="text" placeholder="Employee ID" className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 transition" />
             <input type="password" placeholder="Password" className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 transition" />
             <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition">
               <option>Cashier</option>
               <option>Manager</option>
               <option>Administrator</option>
             </select>
             <button
               onClick={() => setCurrentUser({ name: 'Admin User', role: 'Administrator' })}
               className="w-full py-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
             >
               Sign In
             </button>
           </div>
         </div>
       </div>
     </div>
   );

  // Header Component
  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center">
               <img src={logo} alt="Terminix Logo" className="w-24" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Terminix Pakistan</h1>
              <p className="text-xs text-gray-500">Business Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                {currentUser?.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </div>

            <button onClick={() => setCurrentUser(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut size={22} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Sidebar Navigation
  const Sidebar = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-teal-600' },
      { id: 'sales', label: 'Sales', icon: TrendingUp, color: 'text-green-600' },
      { id: 'inventory', label: 'Inventory', icon: Package, color: 'text-blue-600' },
      { id: 'parties', label: 'Party Ledger', icon: Users, color: 'text-purple-600' },
      { id: 'bank', label: 'Bank & Cash', icon: CreditCard, color: 'text-orange-600' },
      { id: 'expenses', label: 'Expenses', icon: ArrowDownRight, color: 'text-red-600' },
      { id: 'reports', label: 'Reports', icon: FileText, color: 'text-gray-600' }
    ];

    return (
      <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px]">
        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-50 to-green-50 text-teal-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-teal-600' : item.color} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Department Quick Filter */}
        <div className="p-4 border-t border-gray-200 mt-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Quick Filter</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.short}</option>
            ))}
          </select>
        </div>
      </aside>
    );
  };

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Real-time business insights and metrics</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2">
            <Calendar size={18} />
            <span className="font-medium">Today</span>
            <ChevronDown size={16} />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
            <Download size={18} />
            <span className="font-semibold">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cash Balance */}
        <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <Activity size={20} className="opacity-70" />
          </div>
          <p className="text-teal-100 text-sm font-medium mb-1">Cash Balance</p>
          <p className="text-4xl font-bold">₨{dashboardData.todayCash.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <ArrowUpRight size={16} />
            <span className="font-medium">+12% from yesterday</span>
          </div>
        </div>

  
        {/* Today's Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">TODAY</span>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Today's Sales</p>
          <p className="text-3xl font-bold text-gray-800">₨{dashboardData.todaySales.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Month: ₨{dashboardData.monthSales.toLocaleString()}</p>
        </div>

        {/* Today's Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <ArrowDownRight size={24} className="text-red-600" />
            </div>
            <Zap size={20} className="text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Today's Expenses</p>
          <p className="text-3xl font-bold text-gray-800">₨{dashboardData.todayExpenses.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2 font-medium">↓ 5% vs yesterday</p>
        </div>

        {/* Outstanding Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-orange-600" />
            </div>
            <AlertCircle size={20} className="text-orange-500" />
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">Outstanding</p>
          <p className="text-3xl font-bold text-gray-800">₨{dashboardData.outstandingBalance.toLocaleString()}</p>
          <p className="text-sm text-orange-600 mt-2 font-medium">{dashboardData.lowStockCount} parties pending</p>
        </div>
      </div>

      {/* Charts Row */}
   <div className="grid lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Cash Flow - Last 7 Days</h3>
             <ResponsiveContainer width="100%" height={350}>
               <BarChart data={cashFlowData}>
                 <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                 <XAxis dataKey="day" />
                 <YAxis tickFormatter={(v) => `₨${(v/1000)}k`} />
                 <Tooltip formatter={(v) => `₨${v.toLocaleString()}`} />
                 <Legend />
                 <Bar dataKey="inflow" fill="#10b981" radius={[8, 8, 0, 0]} name="Inflow" />
                 <Bar dataKey="outflow" fill="#ef4444" radius={[8, 8, 0, 0]} name="Outflow" />
               </BarChart>
             </ResponsiveContainer>
           </div>
   
           <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Sales by Department (Dec 2025)</h3>
             <ResponsiveContainer width="100%" height={350}>
               <PieChart>
                 <Pie
                   data={deptPerformanceData}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={130}
                   paddingAngle={3}
                   dataKey="value"
                 >
                   {deptPerformanceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(v) => `₨${v.toLocaleString()}`} />
               </PieChart>
             </ResponsiveContainer>
             <div className="grid grid-cols-2 gap-4 mt-6">
               {deptPerformanceData.map(d => (
                 <div key={d.name} className="flex items-center gap-3">
                   <div className="w-4 h-4 rounded" style={{ backgroundColor: d.fill }}></div>
                   <span className="text-gray-700 font-medium">{d.name}</span>
                 </div>
               ))}
             </div>
           </div>
         </div>

 <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Stock Alerts</h3>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={18} className="text-orange-600" />
            </div>
          </div>
          <div className="space-y-3">
            {inventoryData.filter(i => i.status === 'low').map(item => (
              <div key={item.id} className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs font-bold">{item.stock} {item.unit}</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(item.stock / item.min) * 100}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Minimum: {item.min} {item.unit}</p>
              </div>
            ))}
          </div>
        </div>
      {/* Department Performance */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Department Performance</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.slice(0, 4).map((dept, i) => {
            const sales = [45000, 85000, 35000, 28000][i];
            return (
              <div key={dept.id} className="p-4 bg-gradient-to-br hover:shadow-lg transition cursor-pointer rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {dept.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{dept.short}</p>
                    <p className="text-xs text-gray-500">Sales Today</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">₨{sales.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Sales</h3>
          <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Service</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map(sale => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-600">{sale.date}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">{sale.customer}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sale.service}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-800">₨{sale.amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sale.status === 'paid' ? 'bg-green-100 text-green-700' :
                      sale.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {sale.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => setShowAddModal('sale')} className="p-6 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center gap-3">
          <Plus size={28} />
          <span className="font-bold">Add Sale</span>
        </button>
        <button onClick={() => setShowAddModal('expense')} className="p-6 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center gap-3">
          <Plus size={28} />
          <span className="font-bold">Add Expense</span>
        </button>
        <button onClick={() => setShowAddModal('payment')} className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center gap-3">
          <Plus size={28} />
          <span className="font-bold">Add Payment</span>
        </button>
        <button onClick={() => setShowAddModal('inventory')} className="p-6 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center gap-3">
          <Plus size={28} />
          <span className="font-bold">Add Stock</span>
        </button>
      </div>
    </div>
  );

  // Sales Screen
  const SalesScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Sales Management</h2>
          <p className="text-gray-600 mt-1">Track and manage all sales transactions</p>
        </div>
        <button onClick={() => setShowAddModal('sale')} className="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
          <Plus size={20} />
          New Sale
        </button>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Sales Today</p>
          <p className="text-3xl font-bold text-gray-800">₨180,000</p>
          <p className="text-sm text-green-600 font-medium mt-2">↑ 15% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">Pending Payments</p>
          <p className="text-3xl font-bold text-orange-600">₨120,000</p>
          <p className="text-sm text-gray-500 mt-2">5 invoices pending</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <p className="text-gray-600 text-sm font-medium mb-2">Completed Today</p>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-500 mt-2">sales transactions</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">All Sales</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search sales..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Service</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Paid</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map(sale => {
                const dept = departments.find(d => d.id === sale.dept);
                const remaining = sale.amount - sale.paid;
                return (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-sm text-gray-600">{sale.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{dept?.icon}</span>
                        <span className="text-sm font-medium">{dept?.short}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{sale.customer}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{sale.service}</td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-800">₨{sale.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-green-600">₨{sale.paid.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        sale.status === 'paid' ? 'bg-green-100 text-green-700' :
                        sale.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {sale.status === 'paid' ? 'PAID' :
                         sale.status === 'partial' ? `PARTIAL ₨${remaining.toLocaleString()}` :
                         `PENDING ₨${remaining.toLocaleString()}`}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (currentUser.role === 'cashier') {
                              setShowAuthModal(true);
                            }
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


const LedgerManagementScreen = () => {
  const [activeTab, setActiveTab] = useState('customers'); // 'customers', 'suppliers', 'banks'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParty, setSelectedParty] = useState(null);

  // Mock Data
  const parties = [
    { id: 1, name: 'Mr. Ahmed Khan', type: 'customer', department: 'Residential', opening: 0, balance: -75000, transactions: 18, lastActivity: '2025-12-27', overdue: true },
    { id: 2, name: 'ABC Industries', type: 'customer', department: 'Commercial', opening: 20000, balance: 120000, transactions: 12, lastActivity: '2025-12-28', overdue: false },
    { id: 3, name: 'DHA Maintenance Society', type: 'customer', department: 'Government', opening: 50000, balance: 95000, transactions: 31, lastActivity: '2025-12-26', overdue: true },
    { id: 4, name: 'ChemSupply Ltd', type: 'supplier', department: 'Chemicals', opening: -30000, balance: -68000, transactions: 22, lastActivity: '2025-12-28', overdue: false },
    { id: 5, name: 'Import Chemicals Co', type: 'supplier', department: 'Import', opening: -80000, balance: -145000, transactions: 35, lastActivity: '2025-12-25', overdue: true }
  ];

  const banks = [
    { id: 1, name: 'Habib Bank Limited', accountNo: 'PKN123456789', balance: 1850000, transactions: 45, lastActivity: '2025-12-28' },
    { id: 2, name: 'Meezan Bank', accountNo: 'PKN987654321', balance: 920000, transactions: 28, lastActivity: '2025-12-27' },
    { id: 3, name: 'Bank Alfalah', accountNo: 'PKN555666777', balance: 450000, transactions: 19, lastActivity: '2025-12-26' }
  ];

  const transactions = [
    { id: 1, date: '2025-12-27', type: 'sale', amount: 75000, balance: -75000, ref: 'INV-0481', desc: 'Annual Pest Control Contract' },
    { id: 2, date: '2025-12-20', type: 'payment', amount: -50000, balance: -25000, ref: 'PAY-112', desc: 'Cheque Payment Received' },
    { id: 3, date: '2025-11-15', type: 'sale', amount: 50000, balance: 25000, ref: 'INV-0420', desc: 'Fumigation Service' },
    { id: 4, date: '2025-10-10', type: 'sale', amount: 30000, balance: 55000, ref: 'INV-0399', desc: 'Termite Treatment' }
  ];

  const bankTransactions = [
    { id: 1, date: '2025-12-28', type: 'deposit', amount: 200000, balance: 1850000, ref: 'DEP-891', desc: 'Customer Payment - ABC Industries' },
    { id: 2, date: '2025-12-27', type: 'withdrawal', amount: -150000, balance: 1650000, ref: 'CHQ-445', desc: 'Supplier Payment - ChemSupply Ltd' },
    { id: 3, date: '2025-12-26', type: 'transfer', amount: -80000, balance: 1800000, ref: 'TRF-112', desc: 'Transfer to Meezan Bank' },
    { id: 4, date: '2025-12-25', type: 'deposit', amount: 300000, balance: 1880000, ref: 'DEP-890', desc: 'Cash Deposit - Collections' }
  ];

  // Filtering logic
  const filteredItems = activeTab === 'banks' 
    ? banks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.accountNo.includes(searchQuery))
    : parties.filter(p => 
        p.type === (activeTab === 'customers' ? 'customer' : 'supplier') &&
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         p.department.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const selectedTransactions = activeTab === 'banks' ? bankTransactions : transactions;

  // Calculate summaries
  const totalReceivable = parties.filter(p => p.type === 'customer').reduce((sum, p) => sum + Math.max(0, -p.balance), 0);
  const totalPayable = parties.filter(p => p.type === 'supplier').reduce((sum, p) => sum + Math.max(0, p.balance), 0);
  const totalOverdue = parties.filter(p => p.overdue).length;

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Ledger Management</h2>
          <p className="text-gray-600 mt-2">Track parties, bank accounts, transactions & reconciliations</p>
        </div>
        <button className="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl hover:shadow-xl flex items-center gap-3 font-semibold transition">
          <Plus size={22} />
          {activeTab === 'banks' ? 'Add Bank Account' : 'Add Party'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-3 flex-1">
          <button
            onClick={() => { setActiveTab('customers'); setSelectedParty(null); }}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-3 ${
              activeTab === 'customers'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users size={22} />
            Customers
          </button>
          <button
            onClick={() => { setActiveTab('suppliers'); setSelectedParty(null); }}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-3 ${
              activeTab === 'suppliers'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package size={22} />
            Suppliers
          </button>
          <button
            onClick={() => { setActiveTab('banks'); setSelectedParty(null); }}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition flex items-center justify-center gap-3 ${
              activeTab === 'banks'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            <Building2 size={22} />
            Bank Accounts
          </button>
        </div>
      </div>

      {/* Search & Summary */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search by ${activeTab === 'banks' ? 'bank/account' : 'name/department'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeTab !== 'banks' ? (
            <>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">Total {activeTab === 'customers' ? 'Receivable' : 'Payable'}</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">₨{activeTab === 'customers' ? totalReceivable.toLocaleString() : totalPayable.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">Active Parties</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{filteredItems.length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  Overdue Payments
                  {totalOverdue > 0 && <AlertCircle className="text-red-500" size={18} />}
                </p>
                <p className="text-3xl font-bold text-red-600 mt-2">{totalOverdue}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">This Month Activity</p>
                <p className="text-3xl font-bold text-green-600 mt-2">₨680,000</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">Total Bank Balance</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">₨3,220,000</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">Active Accounts</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{banks.length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <p className="text-gray-600 text-sm font-medium">Transactions (Dec)</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">92</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <button className="w-full h-full flex items-center justify-center gap-3 text-teal-600 font-bold hover:bg-teal-50 rounded-lg transition">
                  <Download size={24} />
                  Generate Statement
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* List Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedParty(item)}
              className={`bg-white rounded-2xl p-6 shadow-lg border ${selectedParty?.id === item.id ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-100'} hover:shadow-xl transition cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    {item.overdue && activeTab !== 'banks' && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
                        <AlertCircle size={14} />
                        Overdue
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1">
                    {activeTab === 'banks' ? item.accountNo : item.department}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                    <Clock size={16} />
                    Last activity: {item.lastActivity}
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl ${
                  activeTab === 'customers' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                  activeTab === 'suppliers' ? 'bg-gradient-to-br from-orange-500 to-red-600' :
                  'bg-gradient-to-br from-purple-500 to-pink-600'
                }`}>
                  {item.name.charAt(0)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center bg-gray-50 rounded-xl py-3">
                  <p className="text-xs text-gray-600">Balance</p>
                  <p className={`text-xl font-bold ${item.balance < 0 ? 'text-red-600' : item.balance > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    ₨{Math.abs(item.balance || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl py-3">
                  <p className="text-xs text-gray-600">Transactions</p>
                  <p className="text-xl font-bold text-gray-800">{item.transactions}</p>
                </div>
                <div className="text-center bg-teal-50 rounded-xl py-3">
                  <p className="text-xs text-teal-700">Click to View</p>
                  <p className="text-lg font-bold text-teal-600">Details →</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction Timeline / Bank Statement */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {activeTab === 'banks' ? 'Recent Bank Activity' : `Transactions - ${selectedParty?.name || 'Select a party'}`}
              </h3>
              {activeTab === 'banks' && (
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1">
                  <Download size={16} />
                  Export
                </button>
              )}
            </div>

            {selectedParty || activeTab === 'banks' ? (
              <div className="space-y-5">
                {selectedTransactions.map((txn, idx) => (
                  <div key={txn.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === 'sale' || txn.type === 'deposit' ? 'bg-green-100' :
                        txn.type === 'payment' || txn.type === 'withdrawal' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        {txn.type === 'sale' || txn.type === 'deposit' ? <ArrowUpRight className="text-green-600" size={20} /> :
                         txn.type === 'transfer' ? <ArrowDownRight className="text-purple-600" size={20} /> :
                         <ArrowDownRight className="text-blue-600" size={20} />}
                      </div>
                      {idx < selectedTransactions.length - 1 && <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{txn.desc}</p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Calendar size={14} />
                        {txn.date}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`font-bold text-lg ${
                          txn.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {txn.amount > 0 ? '+' : ''}₨{Math.abs(txn.amount).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Bal: ₨{Math.abs(txn.balance).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                        {txn.ref}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">Click on a party to view transaction history</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


  // Bank & Cash Screen
  const BankCashScreen = () => {
    const banks = [
      { id: 1, name: 'HBL - Business Account', account: '****1234', balance: 450000, color: 'from-blue-500 to-blue-600' },
      { id: 2, name: 'MCB - Current Account', account: '****5678', balance: 280000, color: 'from-purple-500 to-purple-600' },
      { id: 3, name: 'Meezan Bank', account: '****9012', balance: 125000, color: 'from-green-500 to-green-600' }
    ];

    const cashBalance = 125000;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Bank & Cash Ledger</h2>
            <p className="text-gray-600 mt-1">Manage all financial accounts</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
              <Plus size={20} />
              Bank Transaction
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
              <ArrowUpRight size={20} />
              Transfer Funds
            </button>
          </div>
        </div>

        {/* Cash Balance Card */}
        <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium mb-2">Cash in Hand</p>
              <p className="text-5xl font-bold mb-4">₨{cashBalance.toLocaleString()}</p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 font-semibold">
                  Cash IN
                </button>
                <button className="px-6 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 font-semibold">
                  Cash OUT
                </button>
              </div>
            </div>
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <DollarSign size={64} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Bank Accounts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {banks.map(bank => (
            <div key={bank.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-white`}>
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{bank.name}</h3>
                  <p className="text-sm text-gray-500">{bank.account}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Balance</p>
                <p className="text-3xl font-bold text-gray-800">₨{bank.balance.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-sm flex items-center justify-center gap-1">
                  <ArrowUpRight size={16} />
                  Deposit
                </button>
                <button className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold text-sm flex items-center justify-center gap-1">
                  <ArrowDownRight size={16} />
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
            <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Account</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Balance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-12-27 10:30 AM', type: 'deposit', account: 'HBL', desc: 'Customer Payment', amount: 45000, balance: 450000 },
                  { date: '2024-12-27 02:15 PM', type: 'withdrawal', account: 'MCB', desc: 'Supplier Payment', amount: -15000, balance: 280000 },
                  { date: '2024-12-26 11:20 AM', type: 'transfer', account: 'Cash → HBL', desc: 'Cash Deposit', amount: 25000, balance: 425000 }
                ].map((txn, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-600">{txn.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        txn.type === 'deposit' ? 'bg-green-100 text-green-700' :
                        txn.type === 'withdrawal' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {txn.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-800">{txn.account}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{txn.desc}</td>
                    <td className={`py-4 px-4 text-sm font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount > 0 ? '+' : ''}₨{Math.abs(txn.amount).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-800">₨{txn.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Expenses Screen
  const ExpensesScreen = () => {
    const expenseCategories = [
      { name: 'Salaries', amount: 85000, color: 'bg-purple-500', percentage: 35 },
      { name: 'Chemicals', amount: 65000, color: 'bg-blue-500', percentage: 27 },
      { name: 'Fuel', amount: 45000, color: 'bg-orange-500', percentage: 18 },
      { name: 'Equipment', amount: 30000, color: 'bg-green-500', percentage: 12 },
      { name: 'Marketing', amount: 20000, color: 'bg-pink-500', percentage: 8 }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Expense Management</h2>
            <p className="text-gray-600 mt-1">Track and categorize business expenses</p>
          </div>
          <button onClick={() => setShowAddModal('expense')} className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
            <Plus size={20} />
            Add Expense
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Today's Expenses</p>
            <p className="text-3xl font-bold text-red-600">₨55,000</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">This Month</p>
            <p className="text-3xl font-bold text-gray-800">₨245,000</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Pending Approval</p>
            <p className="text-3xl font-bold text-orange-600">3</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Categories</p>
            <p className="text-3xl font-bold text-gray-800">{expenseCategories.length}</p>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart Representation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Expense Distribution</h3>
            <div className="space-y-4">
              {expenseCategories.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold text-gray-800">{cat.name}</span>
                    <span className="text-gray-600">₨{cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${cat.color} h-3 rounded-full transition-all`} style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department-wise Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Department-wise Breakdown</h3>
            <div className="space-y-3">
              {departments.slice(0, 5).map((dept, idx) => {
                const amount = [45000, 38000, 32000, 28000, 22000][idx];
                return (
                  <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center text-lg`}>
                        {dept.icon}
                      </div>
                      <span className="font-semibold text-gray-800">{dept.short}</span>
                    </div>
                    <span className="font-bold text-gray-800">₨{amount.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expense Log Table */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Daily Expense Log</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Payment</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-12-27', dept: 'dept1', category: 'Fuel', desc: 'Service Vehicle Diesel', payment: 'Cash', amount: 3500, status: 'approved' },
                  { date: '2024-12-27', dept: 'dept6', category: 'Chemicals', desc: 'Stock Purchase - Cypermethrin', payment: 'Bank', amount: 15000, status: 'approved' },
                  { date: '2024-12-26', dept: 'dept2', category: 'Equipment', desc: 'Fogging Machine Repair', payment: 'Cash', amount: 8000, status: 'pending' }
                ].map((exp, idx) => {
                  const dept = departments.find(d => d.id === exp.dept);
                  return (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-600">{exp.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{dept?.icon}</span>
                          <span className="text-sm font-medium">{dept?.short}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{exp.desc}</td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-800">{exp.payment}</td>
                      <td className="py-4 px-4 text-sm font-bold text-red-600">₨{exp.amount.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          exp.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {exp.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => {
                              if (currentUser.role === 'cashier') {
                                setShowAuthModal(true);
                              }
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Audit Log Screen
  const AuditLogScreen = () => {
    const auditLogs = [
      { id: 1, user: 'Admin User', action: 'Edited Sale', entity: 'INV-001', timestamp: '2024-12-27 10:30 AM', changes: 'Amount: 25000 → 27000', status: 'success' },
      { id: 2, user: 'Cashier 01', action: 'Attempted Delete', entity: 'EXP-045', timestamp: '2024-12-27 09:15 AM', changes: 'Authorization Failed', status: 'blocked' },
      { id: 3, user: 'Manager User', action: 'Added Expense', entity: 'EXP-046', timestamp: '2024-12-26 05:20 PM', changes: 'Category: Fuel, Amount: 3500', status: 'success' },
      { id: 4, user: 'Admin User', action: 'Deleted Party', entity: 'PAR-023', timestamp: '2024-12-26 02:10 PM', changes: 'Supplier: Old Company Ltd', status: 'success' }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Audit Log & Authorization</h2>
            <p className="text-gray-600 mt-1">Track all system modifications and user actions</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-xl">
            <Shield className="text-red-600" size={24} />
            <div>
              <p className="text-sm font-bold text-red-800">Admin Only</p>
              <p className="text-xs text-red-600">Restricted Access</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Actions Today</p>
            <p className="text-3xl font-bold text-gray-800">47</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Successful</p>
            <p className="text-3xl font-bold text-green-600">42</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Blocked Attempts</p>
            <p className="text-3xl font-bold text-red-600">5</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Active Users</p>
            <p className="text-3xl font-bold text-blue-600">8</p>
          </div>
        </div>

        {/* Audit Trail */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Modification Trail</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Search size={18} />
                Search
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2 font-semibold">
                <Download size={18} />
                Export Log
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className={`p-4 rounded-xl border-2 transition hover:shadow-md ${
                log.status === 'blocked' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        log.status === 'blocked' ? 'bg-red-500' : 'bg-teal-500'
                      }`}>
                        {log.status === 'blocked' ? <XCircle className="text-white" size={20} /> : <CheckCircle className="text-white" size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{log.action}</p>
                        <p className="text-sm text-gray-600">{log.entity}</p>
                      </div>
                    </div>
                    <div className="ml-13 space-y-1">
                      <p className="text-sm text-gray-700"><span className="font-semibold">User:</span> {log.user}</p>
                      <p className="text-sm text-gray-700"><span className="font-semibold">Changes:</span> {log.changes}</p>
                      <p className="text-sm text-gray-500"><Clock size={14} className="inline mr-1" />{log.timestamp}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                    log.status === 'blocked' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">User Activity Summary</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Admin User', role: 'Administrator', actions: 28, blocked: 0, lastActive: '10 mins ago' },
              { name: 'Manager 01', role: 'Manager', actions: 15, blocked: 0, lastActive: '1 hour ago' },
              { name: 'Cashier 01', role: 'Cashier', actions: 4, blocked: 5, lastActive: '2 hours ago' }
            ].map((user, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actions:</span>
                    <span className="font-bold text-gray-800">{user.actions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blocked:</span>
                    <span className={`font-bold ${user.blocked > 0 ? 'text-red-600' : 'text-green-600'}`}>{user.blocked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Active:</span>
                    <span className="font-medium text-gray-800">{user.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Add Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-scale">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Receive Payment</h3>
              <p className="text-teal-100 text-sm mt-1">Record customer payment</p>
            </div>
            <button onClick={() => setShowAddModal(null)} className="w-10 h-10 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 flex items-center justify-center">
              <X className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Party</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none">
                <option>Mr. Ahmed Khan</option>
                <option>ABC Industries</option>
                <option>DHA Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Outstanding Balance</label>
              <div className="px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl">
                <p className="text-2xl font-bold text-orange-600">₨5,000</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none">
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="py-3 border-2 border-teal-500 bg-teal-50 text-teal-700 rounded-xl font-bold">Full Payment</button>
              <button className="py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:border-gray-300">Partial</button>
              <button className="py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:border-gray-300">Advance</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              rows={3}
              placeholder="Add payment notes..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Receipt Preview */}
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle size={16} />
              Payment Summary
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">New Balance:</span>
                <span className="font-bold text-green-800">₨0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Status:</span>
                <span className="font-bold text-green-800">Cleared</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button onClick={() => setShowAddModal(null)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-gray-700">
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-xl font-bold">
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 max-w-[1600px]">
          {activeScreen === 'dashboard' && <DashboardScreen />}
          {activeScreen === 'sales' && <SalesScreen/>}
          {activeScreen === 'inventory' && <InventoryScreen />}
          {activeScreen === 'parties' && <LedgerManagementScreen />}
          {activeScreen === 'bank' && <BankCashScreen />}
          {activeScreen === 'expenses' && <ExpensesScreen />}
          {activeScreen === 'reports' && <AuditLogScreen />}
        </main>
      </div>

      {showAuthModal && <AuthModal />}
      {showAddModal === 'payment' && <PaymentModal />}
      {showAddModal === 'sale' && <NewSaleModal />}

    </div>
  );
};

export default TerminixPakistan;