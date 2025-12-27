import React, { useState } from 'react';
import { Shield, TrendingUp, DollarSign, Package, Users, AlertCircle, Plus, ArrowUpRight, ArrowDownRight, CreditCard, FileText, Calendar, Search, Filter, Download, Bell, Settings, LogOut, Eye, Edit2, Trash2, X, Check, ChevronDown, BarChart3, PieChart, Activity, Zap, Clock, CheckCircle, XCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Branding Side */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={36} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Terminix</h1>
              <p className="text-teal-600 font-semibold">Pakistan</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Management System</h2>
          <p className="text-gray-600 text-lg">Complete solution for pest control & fumigation services</p>
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-teal-600" size={20} />
              <span>Multi-department tracking</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-teal-600" size={20} />
              <span>Real-time inventory alerts</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-teal-600" size={20} />
              <span>Automated ledger management</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                placeholder="Enter your ID"
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition">
                <option>Cashier</option>
                <option>Manager</option>
                <option>Administrator</option>
              </select>
            </div>
            <button
              onClick={() => setCurrentUser({ name: 'Admin User', role: 'admin' })}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
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
              <Shield className="text-white" size={24} />
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
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Cash Flow</h3>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">View Details →</button>
          </div>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 80, 45, 90, 70, 85, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-teal-500 to-green-400 rounded-t-lg hover:from-teal-600 hover:to-green-500 transition cursor-pointer" style={{ height: `${height}%` }}></div>
                <span className="text-xs text-gray-500 font-medium">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
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

  // Party Ledger Screen
  const PartyLedgerScreen = () => {
    const [ledgerType, setLedgerType] = useState('customers');
    
    const parties = [
      { id: 1, name: 'Mr. Ahmed Khan', type: 'customer', opening: 0, balance: -5000, transactions: 12, lastActivity: '2 hours ago' },
      { id: 2, name: 'ABC Industries', type: 'customer', opening: 20000, balance: 45000, transactions: 8, lastActivity: '5 hours ago' },
      { id: 3, name: 'DHA Maintenance', type: 'customer', opening: 50000, balance: 80000, transactions: 24, lastActivity: '1 day ago' },
      { id: 4, name: 'ChemSupply Ltd', type: 'supplier', opening: -30000, balance: -45000, transactions: 15, lastActivity: '3 hours ago' },
      { id: 5, name: 'Import Chemicals Co', type: 'supplier', opening: -80000, balance: -120000, transactions: 28, lastActivity: '6 hours ago' }
    ];

    const transactions = [
      { id: 1, date: '2024-12-27 10:30 AM', type: 'sale', amount: 25000, balance: -5000, ref: 'INV-001', desc: 'Pest Control Service' },
      { id: 2, date: '2024-12-26 03:15 PM', type: 'payment', amount: -20000, balance: -30000, ref: 'PAY-045', desc: 'Partial Payment Received' },
      { id: 3, date: '2024-12-25 11:20 AM', type: 'sale', amount: 15000, balance: -10000, ref: 'INV-002', desc: 'Fumigation Service' }
    ];

    const filteredParties = parties.filter(p => p.type === ledgerType);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Party Ledger Management</h2>
            <p className="text-gray-600 mt-1">Track customer and supplier accounts</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
            <Plus size={20} />
            Add Party
          </button>
        </div>

        {/* Ledger Type Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setLedgerType('customers')}
            className={`flex-1 py-4 rounded-xl font-bold transition ${
              ledgerType === 'customers'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Customers
          </button>
          <button
            onClick={() => setLedgerType('suppliers')}
            className={`flex-1 py-4 rounded-xl font-bold transition ${
              ledgerType === 'suppliers'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <Package className="inline mr-2" size={20} />
            Suppliers
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Total {ledgerType === 'customers' ? 'Receivable' : 'Payable'}</p>
            <p className="text-3xl font-bold text-teal-600">₨{ledgerType === 'customers' ? '120,000' : '165,000'}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Active Parties</p>
            <p className="text-3xl font-bold text-gray-800">{filteredParties.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">Overdue</p>
            <p className="text-3xl font-bold text-orange-600">2</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600 text-sm font-medium mb-2">This Month</p>
            <p className="text-3xl font-bold text-green-600">₨450,000</p>
          </div>
        </div>

        {/* Party Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredParties.map(party => (
            <div key={party.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{party.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Last activity: {party.lastActivity}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {party.name.charAt(0)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Opening</p>
                  <p className="font-bold text-gray-800">₨{Math.abs(party.opening).toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Transactions</p>
                  <p className="font-bold text-gray-800">{party.transactions}</p>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-lg">
                  <p className="text-xs text-teal-600 mb-1">Balance</p>
                  <p className={`font-bold ${party.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₨{Math.abs(party.balance).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold text-sm">
                  View Ledger
                </button>
                <button className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-sm">
                  Add Payment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Transaction Timeline - Mr. Ahmed Khan</h3>
          <div className="space-y-4">
            {transactions.map((txn, idx) => (
              <div key={txn.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    txn.type === 'sale' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {txn.type === 'sale' ? <ArrowUpRight className="text-green-600" size={20} /> : <ArrowDownRight className="text-blue-600" size={20} />}
                  </div>
                  {idx < transactions.length - 1 && <div className="w-0.5 h-16 bg-gray-200"></div>}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{txn.desc}</p>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      txn.type === 'sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {txn.ref}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-bold ${txn.type === 'sale' ? 'text-green-600' : 'text-blue-600'}`}>
                      {txn.type === 'sale' ? '+' : ''}₨{Math.abs(txn.amount).toLocaleString()}
                    </span>
                    <span className="text-gray-600">Balance: <span className="font-bold">₨{Math.abs(txn.balance).toLocaleString()}</span></span>
                  </div>
                </div>
              </div>
            ))}
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

  // Inventory Screen
  const InventoryScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Track stock levels and product availability</p>
        </div>
        <button onClick={() => setShowAddModal('inventory')} className="px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl hover:shadow-xl flex items-center gap-2 font-bold">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryData.map(item => {
          const dept = departments.find(d => d.id === item.dept);
          const stockPercentage = (item.stock / item.min) * 100;
          const isLow = item.status === 'low';
          
          return (
            <div key={item.id} className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition hover:shadow-xl ${
              isLow ? 'border-orange-300 bg-orange-50' : 'border-gray-100'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{dept?.icon}</span>
                    <span className="text-sm text-gray-600">{dept?.short}</span>
                  </div>
                </div>
                {isLow && (
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center animate-pulse">
                    <AlertCircle className="text-white" size={20} />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-medium">Current Stock</span>
                  <span className={`text-2xl font-bold ${isLow ? 'text-orange-600' : 'text-green-600'}`}>
                    {item.stock} {item.unit}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Stock Level</span>
                    <span>Min: {item.min} {item.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${isLow ? 'bg-orange-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Stock Value</p>
                    <p className="text-lg font-bold text-gray-800">₨{item.value.toLocaleString()}</p>
                  </div>
                  <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold text-sm">
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

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
          {activeScreen === 'sales' && <SalesScreen />}
          {activeScreen === 'inventory' && <InventoryScreen />}
          {activeScreen === 'parties' && <PartyLedgerScreen />}
          {activeScreen === 'bank' && <BankCashScreen />}
          {activeScreen === 'expenses' && <ExpensesScreen />}
          {activeScreen === 'reports' && <AuditLogScreen />}
        </main>
      </div>

      {showAuthModal && <AuthModal />}
      {showAddModal === 'payment' && <PaymentModal />}
    </div>
  );
};

export default TerminixPakistan;