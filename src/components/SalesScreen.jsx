// Add these to your existing imports if not already present
import { Printer, FileDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const SalesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Comprehensive Sales Data
  const allSales = [
    { id: 1001, date: '2025-12-28 09:15 AM', dept: 'dept1', customer: 'Mr. Faisal Ahmed', service: 'Complete Home Pest Control', items: ['General Spray', 'Gel Treatment'], amount: 28000, paid: 28000, status: 'paid', paymentMethod: 'Cash' },
    { id: 1002, date: '2025-12-28 10:30 AM', dept: 'dept2', customer: 'Pearl Continental Hotel', service: 'Monthly Commercial Fumigation', items: ['Fogging', 'Residual Spray'], amount: 125000, paid: 100000, status: 'partial', paymentMethod: 'Bank Transfer' },
    { id: 1003, date: '2025-12-28 11:45 AM', dept: 'dept3', customer: 'DHA Phase 8 Villa', service: 'Pre-Construction Termite Treatment', items: ['Soil Treatment', 'Barrier'], amount: 85000, paid: 0, status: 'pending', paymentMethod: '-' },
    { id: 1004, date: '2025-12-28 01:20 PM', dept: 'dept4', customer: 'Super Mart', service: 'Rodent Control Program', items: ['Bait Stations', 'Trapping'], amount: 42000, paid: 42000, status: 'paid', paymentMethod: 'Card' },
    { id: 1005, date: '2025-12-28 02:10 PM', dept: 'dept1', customer: 'Mrs. Sana Khan', service: 'Kitchen & Bathroom Treatment', items: ['Cockroach Gel', 'Ant Spray'], amount: 18000, paid: 15000, status: 'partial', paymentMethod: 'Cash' },
    { id: 1006, date: '2025-12-28 03:45 PM', dept: 'dept5', customer: 'Apollo Clinic', service: 'COVID Disinfection Service', items: ['Fogging', 'Surface Wipe'], amount: 35000, paid: 35000, status: 'paid', paymentMethod: 'Bank Transfer' },
    { id: 1007, date: '2025-12-27 04:30 PM', dept: 'dept7', customer: 'Beach Luxury Hotel', service: 'Annual Maintenance Contract Renewal', items: ['Quarterly Visits'], amount: 480000, paid: 240000, status: 'partial', paymentMethod: 'Cheque' },
    { id: 1008, date: '2025-12-27 11:00 AM', dept: 'dept6', customer: 'Local Retailer', service: 'Chemical Supply', items: ['Cypermethrin 10L', 'Deltamethrin 5L'], amount: 95000, paid: 95000, status: 'paid', paymentMethod: 'Cash' }
  ];

  // Filter logic
  const filteredSales = allSales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toString().includes(searchTerm);
    const matchesDept = filterDept === 'all' || sale.dept === filterDept;
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Summary Stats
  const todaySalesTotal = allSales
    .filter(s => s.date.startsWith('2025-12-28'))
    .reduce((sum, s) => sum + s.amount, 0);

  const pendingAmount = allSales.reduce((sum, s) => sum + (s.amount - s.paid), 0);

  const completedToday = allSales.filter(s => s.date.startsWith('2025-12-28') && s.status === 'paid').length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Sales Management</h2>
          <p className="text-gray-600 mt-2">Complete record of all sales transactions across departments</p>
        </div>
        <button
          onClick={() => setShowAddModal('new_sale')}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 font-bold text-lg transform hover:scale-105 transition duration-300"
        >
          <Plus className="w-7 h-7" />
          New Sale
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 text-emerald-600" />
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">TODAY</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">Total Sales Today</p>
          <p className="text-4xl font-bold text-gray-900">₨{todaySalesTotal.toLocaleString()}</p>
          <p className="text-emerald-600 font-semibold mt-4">↑ 18% vs yesterday</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-10 h-10 text-amber-600" />
            <span className="text-amber-600 font-bold text-lg">{allSales.filter(s => s.status !== 'paid').length}</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">Pending Receivables</p>
          <p className="text-4xl font-bold text-amber-600">₨{pendingAmount.toLocaleString()}</p>
          <p className="text-gray-600 mt-4">Across {allSales.filter(s => s.status !== 'paid').length} invoices</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-10 h-10 text-teal-600" />
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-bold">COMPLETED</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">Paid Today</p>
          <p className="text-4xl font-bold text-gray-900">{completedToday}</p>
          <p className="text-gray-600 mt-4">Fully settled transactions</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Receipt className="w-10 h-10 opacity-90" />
            <Activity className="w-8 h-8 opacity-70" />
          </div>
          <p className="text-emerald-100 text-lg mb-3">Month-to-Date</p>
          <p className="text-5xl font-bold">₨3,120,000</p>
          <p className="mt-4 text-sm opacity-90 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5" /> +12.4% vs last month
          </p>
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
                placeholder="Search by customer, service, or invoice #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 transition text-lg"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none transition"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.short}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none transition"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 flex items-center gap-3 font-semibold transition">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
            <button className="px-6 py-4 bg-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold transition">
              <FileDown className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Invoice</th>
                <th className="text-left py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
                <th className="text-left py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Department</th>
                <th className="text-left py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="text-left py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Service / Items</th>
                <th className="text-right py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="text-right py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Paid</th>
                <th className="text-center py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="text-center py-6 px-8 text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSales.map(sale => {
                const dept = departments.find(d => d.id === sale.dept);
                const DeptIcon = dept?.icon || Home;
                const remaining = sale.amount - sale.paid;

                return (
                  <tr key={sale.id} className="hover:bg-gray-50 transition duration-200">
                    <td className="py-6 px-8">
                      <span className="font-bold text-teal-600 text-lg">#{sale.id}</span>
                    </td>
                    <td className="py-6 px-8 text-gray-600">
                      <div>
                        <p className="font-medium">{sale.date.split(' ')[0]}</p>
                        <p className="text-sm text-gray-500">{sale.date.split(' ')[1]} {sale.date.split(' ')[2]}</p>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${dept?.color}`}>
                          <DeptIcon className="w-6 h-6" />
                        </div>
                        <span className="font-medium">{dept?.short}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <p className="font-semibold text-gray-900">{sale.customer}</p>
                    </td>
                    <td className="py-6 px-8">
                      <p className="font-medium text-gray-800">{sale.service}</p>
                      <p className="text-sm text-gray-500 mt-1">{sale.items.join(' • ')}</p>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <p className="text-2xl font-bold text-gray-900">₨{sale.amount.toLocaleString()}</p>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <p className="text-xl font-semibold text-emerald-600">₨{sale.paid.toLocaleString()}</p>
                      {remaining > 0 && <p className="text-sm text-amber-600 mt-1">Due: ₨{remaining.toLocaleString()}</p>}
                    </td>
                    <td className="py-6 px-8 text-center">
                      <span className={`px-5 py-2 rounded-full text-sm font-bold ${
                        sale.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                        sale.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {sale.status === 'partial' ? `PARTIAL ₨${remaining.toLocaleString()}` : sale.status.toUpperCase()}
                      </span>
                      {sale.status !== 'paid' && (
                        <p className="text-xs text-gray-500 mt-2">{sale.paymentMethod}</p>
                      )}
                    </td>
                    <td className="py-6 px-8 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button className="p-3 hover:bg-teal-50 rounded-xl transition group">
                          <Eye className="w-5 h-5 text-teal-600 group-hover:scale-110 transition" />
                        </button>
                        <button className="p-3 hover:bg-emerald-50 rounded-xl transition group">
                          <Printer className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
                        </button>
                        <button
                          onClick={() => {
                            if (currentUser?.role !== 'Administrator') {
                              setPendingAction(() => console.log('Edit sale', sale.id));
                              setShowAuthModal(true);
                            }
                          }}
                          className="p-3 hover:bg-blue-50 rounded-xl transition group"
                        >
                          <Edit2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
                        </button>
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSales.length)} of {filteredSales.length} entries
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-medium transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-medium transition"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};