import {
  TrendingUp, AlertCircle, Plus, ArrowUpRight, Search, Filter,
  FileDown, Eye, Edit2, Receipt, Activity, CheckCircle,
  Home, Building2, Bug, Mouse, Droplets, FlaskConical, Wrench,
  Printer, MoreVertical, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export const SalesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const currentUser = { role: 'Staff' }; // mock user
  const itemsPerPage = 10;

  const departments = [
    { id: 'dept1', name: 'Residential Pest Control', short: 'Residential', color: 'from-blue-500 to-blue-600', icon: Home },
    { id: 'dept2', name: 'Commercial Fumigation', short: 'Commercial', color: 'from-purple-500 to-purple-600', icon: Building2 },
    { id: 'dept3', name: 'Termite Treatment', short: 'Termite', color: 'from-green-500 to-green-600', icon: Bug },
    { id: 'dept4', name: 'Rodent Control', short: 'Rodent', color: 'from-orange-500 to-orange-600', icon: Mouse },
    { id: 'dept5', name: 'Disinfection Services', short: 'Disinfection', color: 'from-pink-500 to-pink-600', icon: Droplets },
    { id: 'dept6', name: 'Chemical Supplies', short: 'Chemicals', color: 'from-yellow-500 to-yellow-600', icon: FlaskConical },
    { id: 'dept7', name: 'Maintenance Contracts', short: 'Maintenance', color: 'from-red-500 to-red-600', icon: Wrench }
  ];

  const allSales = [
    { id: 1001, date: '2025-12-28 09:15 AM', dept: 'dept1', customer: 'Mr. Faisal Ahmed', service: 'Complete Home Pest Control', items: ['General Spray', 'Gel Treatment'], amount: 28000, paid: 28000, status: 'paid', paymentMethod: 'Cash' },
    { id: 1002, date: '2025-12-28 10:30 AM', dept: 'dept2', customer: 'Pearl Continental Hotel', service: 'Monthly Commercial Fumigation', items: ['Fogging', 'Residual Spray'], amount: 125000, paid: 100000, status: 'partial', paymentMethod: 'Bank Transfer' },
    { id: 1003, date: '2025-12-28 11:45 AM', dept: 'dept3', customer: 'DHA Phase 8 Villa', service: 'Pre-Construction Termite Treatment', items: ['Soil Treatment', 'Barrier'], amount: 85000, paid: 0, status: 'pending', paymentMethod: '-' }
  ];

  const filteredSales = allSales.filter(sale => {
    const matchesSearch =
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toString().includes(searchTerm);

    const matchesDept = filterDept === 'all' || sale.dept === filterDept;
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold">Sales Management</h2>
          <p className="text-gray-600 mt-2">All sales across departments</p>
        </div>
        <button
          onClick={() => setShowAddModal('new_sale')}
          className="px-6 py-4 bg-emerald-600 text-white rounded-2xl flex items-center gap-3 font-bold"
        >
          <Plus /> New Sale
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Invoice</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map(sale => {
              const dept = departments.find(d => d.id === sale.dept);
              const DeptIcon = dept?.icon || Home;

              return (
                <tr key={sale.id} className="border-t">
                  <td className="px-6 py-4 font-bold text-teal-600">#{sale.id}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <DeptIcon className="w-5 h-5" /> {dept?.short}
                  </td>
                  <td className="px-6 py-4">{sale.customer}</td>
                  <td className="px-6 py-4 text-right font-bold">₨{sale.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <Eye className="w-5 h-5 text-teal-600 cursor-pointer" />
                    <Printer className="w-5 h-5 text-emerald-600 cursor-pointer" />
                    <Edit2
                      onClick={() => {
                        if (currentUser.role !== 'Administrator') {
                          setPendingAction(() => console.log('Edit', sale.id));
                          setShowAuthModal(true);
                        }
                      }}
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                    />
                    <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-between p-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft /> Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="flex items-center gap-2"
            >
              Next <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
