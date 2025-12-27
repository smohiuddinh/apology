import React, { useState } from 'react';
import {
  Shield, TrendingUp, DollarSign, Package, Users, AlertCircle, Plus,
  ArrowUpRight, ArrowDownRight, CreditCard, FileText, Calendar, Search,
  Filter, Download, Bell, LogOut, Eye, Edit2, Trash2, X, Check,
  ChevronDown, BarChart3, Activity, Clock, CheckCircle, XCircle,
  Building2, Receipt, ArrowLeftRight, Home, Factory, Bug, Mouse,
  Droplets, FlaskConical, Wrench
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TerminixPakistan = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedDept, setSelectedDept] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Departments with professional icons
  const departments = [
    { id: 'dept1', name: 'Residential Pest Control', short: 'Residential', color: 'from-blue-500 to-blue-600', icon: Home },
    { id: 'dept2', name: 'Commercial Fumigation', short: 'Commercial', color: 'from-indigo-500 to-indigo-600', icon: Factory },
    { id: 'dept3', name: 'Termite Treatment', short: 'Termite', color: 'from-emerald-500 to-emerald-600', icon: Bug },
    { id: 'dept4', name: 'Rodent Control', short: 'Rodent', color: 'from-amber-500 to-amber-600', icon: Mouse },
    { id: 'dept5', name: 'Disinfection Services', short: 'Disinfection', color: 'from-cyan-500 to-cyan-600', icon: Droplets },
    { id: 'dept6', name: 'Chemical Supplies', short: 'Chemicals', color: 'from-violet-500 to-violet-600', icon: FlaskConical },
    { id: 'dept7', name: 'Maintenance Contracts', short: 'Maintenance', color: 'from-rose-500 to-rose-600', icon: Wrench }
  ];

  // Dashboard Metrics
  const dashboardData = {
    cashBalance: 185000,
    todaySales: 218000,
    monthSales: 3120000,
    todayExpenses: 68000,
    outstanding: 425000,
    lowStock: 4
  };

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

  // Sample Data
  const recentSales = [
    { id: 1, time: '10:30 AM', customer: 'Ahmed Residences', service: 'Full Home Treatment', amount: 32000, status: 'paid' },
    { id: 2, time: '01:45 PM', customer: 'Pearl Tower', service: 'Commercial Fumigation', amount: 95000, status: 'partial' },
    { id: 3, time: '03:20 PM', customer: 'Gulshan Villa', service: 'Termite Barrier', amount: 45000, status: 'paid' },
    { id: 4, time: '05:15 PM', customer: 'Food Factory Ltd', service: 'Rodent Program', amount: 38000, status: 'pending' }
  ];

  const lowStockItems = [
    { name: 'Cypermethrin 10% EC', current: 18, min: 30, unit: 'Liters' },
    { name: 'Fipronil Gel', current: 8, min: 20, unit: 'Tubes' },
    { name: 'Fogging Solution', current: 12, min: 25, unit: 'Liters' },
    { name: 'Bait Stations', current: 45, min: 60, unit: 'Units' }
  ];

  // Authorization Modal
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Authorization Required</h3>
          <p className="text-gray-600 mt-2">Admin credentials needed to perform this action</p>
        </div>
        <div className="space-y-5">
          <input type="text" placeholder="Authorization ID" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition" />
          <input type="password" placeholder="Password" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition" />
          <div className="flex gap-4 pt-4">
            <button onClick={() => setShowAuthModal(false)} className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">
              Cancel
            </button>
            <button
              onClick={() => { setShowAuthModal(false); pendingAction?.(); }}
              className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
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
              <Shield className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Terminix</h1>
              <p className="text-2xl font-light opacity-90">Pakistan</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6">Enterprise Management System</h2>
          <p className="text-xl opacity-90 mb-10">Professional solution for pest control & fumigation businesses</p>
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

  // Header
  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Terminix Pakistan</h1>
            <p className="text-sm text-gray-500">Enterprise Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-3 hover:bg-gray-100 rounded-xl transition">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-4 bg-gray-50 px-5 py-3 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {currentUser?.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentUser?.name}</p>
              <p className="text-sm text-gray-500">{currentUser?.role}</p>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          <button onClick={() => setCurrentUser(null)} className="p-3 hover:bg-gray-100 rounded-xl transition">
            <LogOut className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );

  // Sidebar
  const Sidebar = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'sales', label: 'Sales', icon: TrendingUp },
      { id: 'inventory', label: 'Inventory', icon: Package },
      { id: 'parties', label: 'Party Ledger', icon: Users },
      { id: 'bank', label: 'Bank & Cash', icon: CreditCard },
      { id: 'expenses', label: 'Expenses', icon: ArrowDownRight },
      { id: 'reports', label: 'Reports & Analytics', icon: FileText }
    ];

    return (
      <aside className="w-72 bg-white border-r border-gray-200 h-screen sticky top-0">
        <nav className="p-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-6 border-t border-gray-200">
          <label className="text-sm font-semibold text-gray-500 uppercase mb-3 block">Department Filter</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none transition"
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
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Real-time insights for December 28, 2025</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-gray-300 rounded-xl flex items-center gap-3 hover:bg-gray-50 transition">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Today</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl flex items-center gap-3 transition">
            <Download className="w-5 h-5" />
            <span className="font-semibold">Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <DollarSign className="w-10 h-10 opacity-80" />
            <Activity className="w-8 h-8 opacity-70" />
          </div>
          <p className="text-teal-100 text-lg mb-2">Cash Balance</p>
          <p className="text-5xl font-bold">₨{dashboardData.cashBalance.toLocaleString()}</p>
          <p className="mt-4 text-sm opacity-90 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5" /> +8.2% from yesterday
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between mb-6">
            <TrendingUp className="w-10 h-10 text-emerald-600" />
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">TODAY</span>
          </div>
          <p className="text-gray-600 text-lg mb-2">Today's Sales</p>
          <p className="text-4xl font-bold text-gray-900">₨{dashboardData.todaySales.toLocaleString()}</p>
          <p className="text-emerald-600 font-semibold mt-3">Month: ₨{dashboardData.monthSales.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between mb-6">
            <ArrowDownRight className="w-10 h-10 text-rose-600" />
            <span className="text-rose-600 font-semibold">↓ 6%</span>
          </div>
          <p className="text-gray-600 text-lg mb-2">Today's Expenses</p>
          <p className="text-4xl font-bold text-gray-900">₨{dashboardData.todayExpenses.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between mb-6">
            <Users className="w-10 h-10 text-amber-600" />
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-gray-600 text-lg mb-2">Outstanding Receivables</p>
          <p className="text-4xl font-bold text-gray-900">₨{dashboardData.outstanding.toLocaleString()}</p>
          <p className="text-amber-600 font-semibold mt-3">{dashboardData.lowStock} parties pending</p>
        </div>
      </div>

      {/* Charts */}
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

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Yearly Sales Trend 2025</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyTrend}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `₨${(v/1000000)}M`} />
            <Tooltip formatter={(v) => `₨${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="sales" stroke="#14b8a6" strokeWidth={4} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Sales</h3>
          <div className="space-y-4">
            {recentSales.map(sale => (
              <div key={sale.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{sale.customer}</p>
                  <p className="text-sm text-gray-600">{sale.service} • {sale.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">₨{sale.amount.toLocaleString()}</p>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                    sale.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    sale.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {sale.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Low Stock Alerts</h3>
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, i) => (
              <div key={i} className="p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-lg text-sm font-bold">
                    {item.current} / {item.min} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <div
                    className="bg-amber-500 h-3 rounded-full transition-all"
                    style={{ width: `${(item.current / item.min) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'New Sale', icon: Plus, color: 'from-emerald-500 to-teal-600' },
          { label: 'Add Expense', icon: ArrowDownRight, color: 'from-rose-500 to-pink-600' },
          { label: 'Receive Payment', icon: Receipt, color: 'from-indigo-500 to-purple-600' },
          { label: 'Add Stock', icon: Package, color: 'from-amber-500 to-orange-600' }
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => setShowAddModal(action.label.toLowerCase().replace(' ', '_'))}
            className={`p-8 bg-gradient-to-br ${action.color} text-white rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300 flex flex-col items-center gap-4`}
          >
            <action.icon className="w-10 h-10" />
            <span className="text-xl font-bold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Placeholder Screens (You can expand these similarly)
  const PlaceholderScreen = ({ title }) => (
    <div className="p-12 text-center">
      <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-32 h-32 mx-auto mb-8" />
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-xl text-gray-600">Fully featured screen coming in next update</p>
    </div>
  );

  if (!currentUser) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {activeScreen === 'dashboard' && <DashboardScreen />}
          {activeScreen === 'sales' && <PlaceholderScreen title="Sales Management" />}
          {activeScreen === 'inventory' && <PlaceholderScreen title="Inventory Management" />}
          {activeScreen === 'parties' && <PlaceholderScreen title="Party Ledger" />}
          {activeScreen === 'bank' && <PlaceholderScreen title="Bank & Cash Ledger" />}
          {activeScreen === 'expenses' && <PlaceholderScreen title="Expense Tracking" />}
          {activeScreen === 'reports' && <PlaceholderScreen title="Reports & Analytics" />}
        </main>
      </div>
      {showAuthModal && <AuthModal />}
    </div>
  );
};

export default TerminixPakistan;