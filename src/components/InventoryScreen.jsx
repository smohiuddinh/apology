const InventoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // all, good, low, out
  const [sortBy, setSortBy] = useState('name'); // name, stock, value
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(null); // item id

  // Comprehensive Inventory Data with real-time tracking
  const inventoryItems = [
    { id: 1, name: 'Cypermethrin 10% EC', dept: 'dept6', unit: 'Liters', current: 48, min: 30, max: 100, purchasePrice: 4500, sellingPrice: 5500, expiry: '2026-08-15', status: 'good' },
    { id: 2, name: 'Deltamethrin 2.5% SC', dept: 'dept6', unit: 'Liters', current: 12, min: 25, max: 80, purchasePrice: 3800, sellingPrice: 4800, expiry: '2026-05-20', status: 'low' },
    { id: 3, name: 'Fipronil Gel (Cockroach)', dept: 'dept1', unit: 'Tubes', current: 8, min: 20, max: 100, purchasePrice: 850, sellingPrice: 1200, expiry: '2027-01-10', status: 'low' },
    { id: 4, name: 'Termiticide (Imidacloprid)', dept: 'dept3', unit: 'Liters', current: 35, min: 20, max: 60, purchasePrice: 6200, sellingPrice: 7500, expiry: '2026-11-30', status: 'good' },
    { id: 5, name: 'Rodent Bait Blocks', dept: 'dept4', unit: 'Kg', current: 65, min: 40, max: 150, purchasePrice: 1800, sellingPrice: 2400, expiry: null, status: 'good' },
    { id: 6, name: 'Fogging Solution (Malathion)', dept: 'dept2', unit: 'Liters', current: 5, min: 25, max: 100, purchasePrice: 4200, sellingPrice: 5200, expiry: '2026-03-18', status: 'low' },
    { id: 7, name: 'Bait Stations (Plastic)', dept: 'dept4', unit: 'Units', current: 120, min: 50, max: 200, purchasePrice: 450, sellingPrice: 650, expiry: null, status: 'good' },
    { id: 8, name: 'Disinfectant Concentrate', dept: 'dept5', unit: 'Liters', current: 92, min: 40, max: 120, purchasePrice: 3200, sellingPrice: 4200, expiry: '2026-09-25', status: 'good' }
  ];

  // Calculated values
  const totalStockValue = inventoryItems.reduce((sum, item) => sum + (item.current * item.purchasePrice), 0);
  const lowStockCount = inventoryItems.filter(i => i.status === 'low').length;
  const totalItems = inventoryItems.length;
  const avgStockLevel = Math.round(inventoryItems.reduce((sum, i) => sum + (i.current / i.max * 100), 0) / inventoryItems.length);

  // Filtering & Sorting
  const filteredItems = inventoryItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === 'all' || item.dept === filterDept;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesDept && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock') return a.current - b.current;
      if (sortBy === 'value') return (b.current * b.purchasePrice) - (a.current * a.purchasePrice);
      return 0;
    });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600 mt-2">Real-time stock tracking across all departments</p>
        </div>
        <button
          onClick={() => setShowAddStockModal(true)}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 font-bold text-lg transform hover:scale-105 transition duration-300"
        >
          <Plus className="w-7 h-7" />
          Add / Restock Items
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <Package className="w-12 h-12 text-emerald-600" />
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">ACTIVE</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">Total Items</p>
          <p className="text-4xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-gray-500 mt-3">Across 7 departments</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <DollarSign className="w-12 h-12 text-teal-600" />
          </div>
          <p className="text-gray-600 text-lg mb-3">Total Stock Value</p>
          <p className="text-4xl font-bold text-gray-900">₨{totalStockValue.toLocaleString()}</p>
          <p className="text-teal-600 font-semibold mt-3">At purchase price</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <AlertCircle className="w-12 h-12 text-amber-600" />
            <span className="text-3xl font-bold text-amber-600">{lowStockCount}</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">Low Stock Alerts</p>
          <p className="text-4xl font-bold text-amber-600">{lowStockCount}</p>
          <p className="text-gray-500 mt-3">Requires immediate restock</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Activity className="w-12 h-12 opacity-90" />
          </div>
          <p className="text-emerald-100 text-lg mb-3">Average Stock Level</p>
          <p className="text-5xl font-bold">{avgStockLevel}%</p>
          <div className="w-full bg-white/30 rounded-full h-4 mt-4">
            <div className="bg-white h-4 rounded-full transition-all" style={{ width: `${avgStockLevel}%` }}></div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 transition text-lg"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 transition"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.short}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 transition"
            >
              <option value="all">All Status</option>
              <option value="good">Good Stock</option>
              <option value="low">Low Stock</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 transition"
            >
              <option value="name">Sort by Name</option>
              <option value="stock">Sort by Stock Level</option>
              <option value="value">Sort by Value</option>
            </select>
          </div>
          <button className="px-6 py-4 bg-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold transition">
            <FileDown className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {filteredItems.map(item => {
          const dept = departments.find(d => d.id === item.dept);
          const DeptIcon = dept?.icon || Package;
          const stockPercent = (item.current / item.max) * 100;
          const isLow = item.status === 'low';
          const value = item.current * item.purchasePrice;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl shadow-xl border-4 transition-all hover:shadow-2xl ${
                isLow ? 'border-amber-400 bg-amber-50' : 'border-gray-100'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl bg-gradient-to-br ${dept?.color}`}>
                    <DeptIcon className="w-10 h-10" />
                  </div>
                  {isLow && (
                    <div className="animate-pulse">
                      <AlertCircle className="w-10 h-10 text-amber-500" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{dept?.short} • {item.unit}</p>

                {/* Stock Level */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">Current Stock</span>
                    <span className={`font-bold ${isLow ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {item.current} / {item.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className={`h-5 rounded-full transition-all ${isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${stockPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    Min: {item.min} • {stockPercent.toFixed(0)}% filled
                  </p>
                </div>

                {/* Value & Pricing */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-600">Stock Value</p>
                    <p className="text-2xl font-bold text-gray-900">₨{value.toLocaleString()}</p>
                  </div>
                  <div className="bg-teal-50 rounded-2xl p-4">
                    <p className="text-sm text-teal-700">Selling Price</p>
                    <p className="text-2xl font-bold text-teal-600">₨{item.sellingPrice.toLocaleString()} / {item.unit === 'Units' ? 'pc' : item.unit}</p>
                  </div>
                </div>

                {/* Expiry */}
                {item.expiry && (
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                    <Clock className="w-5 h-5" />
                    <span>Expiry: {new Date(item.expiry).toLocaleDateString('en-GB')}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowAdjustModal(item.id)}
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg"
                  >
                    Adjust Stock
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition">
                    <Eye className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {showAddStockModal && <AddStockModal onClose={() => setShowAddStockModal(false)} />}
      {showAdjustModal && <AdjustStockModal item={inventoryItems.find(i => i.id === showAdjustModal)} onClose={() => setShowAdjustModal(null)} />}
    </div>
  );
};

// Add Stock / Restock Modal
const AddStockModal = ({ onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold">Restock Inventory</h3>
            <button onClick={onClose} className="w-12 h-12 bg-white/20 rounded-2xl hover:bg-white/30 flex items-center justify-center">
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
          <p className="text-xl text-gray-700">Select items to add to stock</p>
          {/* Item selection grid similar to sales modal */}
          <div className="text-center py-12 text-gray-500">
            <Package className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <p className="text-2xl">Full restock interface coming soon</p>
          </div>
        </div>
        <div className="bg-gray-50 p-8 flex justify-end gap-6">
          <button onClick={onClose} className="px-8 py-4 border-2 border-gray-300 rounded-2xl font-bold">Cancel</button>
          <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl">Confirm Restock</button>
        </div>
      </div>
    </div>
  );
};

// Adjust Stock Modal
const AdjustStockModal = ({ item, onClose }) => {
  const [adjustment, setAdjustment] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-3xl w-full max-w-lg p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Adjust Stock: {item.name}</h3>
        <div className="space-y-6">
          <div>
            <p className="text-lg text-gray-700 mb-3">Current Stock: <span className="font-bold text-2xl">{item.current} {item.unit}</span></p>
          </div>
          <div>
            <label className="text-lg font-semibold">Adjustment (+/-)</label>
            <input
              type="number"
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              placeholder="e.g. +10 or -5"
              className="w-full mt-3 px-6 py-5 text-2xl text-center rounded-2xl border-4 border-gray-300 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-lg font-semibold">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-3 px-6 py-5 rounded-2xl border-2 border-gray-300 focus:border-emerald-500"
            >
              <option value="">Select reason...</option>
              <option>Restock Received</option>
              <option>Damage / Expiry</option>
              <option>Usage in Service</option>
              <option>Count Correction</option>
              <option>Theft / Loss</option>
            </select>
          </div>
        </div>
        <div className="flex gap-6 mt-10">
          <button onClick={onClose} className="flex-1 py-5 border-2 border-gray-300 rounded-2xl font-bold">Cancel</button>
          <button className="flex-1 py-5 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl">
            Apply Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};