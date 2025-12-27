import { useState } from "react";
import { FaBug, FaWarehouse, FaHome, FaMouse, FaHospital, FaFlask, FaFileContract } from 'react-icons/fa';
import { X, Check, Plus, Trash2, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';

const departments = [
  { id: 'dept1', name: 'Residential Pest Control', short: 'Home', icon: FaHome, color: 'from-emerald-400 to-teal-500' },
  { id: 'dept2', name: 'Commercial Fumigation', short: 'Factory', icon: FaWarehouse, color: 'from-indigo-400 to-blue-500' },
  { id: 'dept3', name: 'Termite Control', short: 'Termite', icon: FaFlask, color: 'from-yellow-400 to-orange-500' },
  { id: 'dept4', name: 'Rodent Control', short: 'Rodent', icon: FaMouse, color: 'from-pink-400 to-red-500' },
  { id: 'dept5', name: 'Sanitization', short: 'Sanitize', icon: FaHospital, color: 'from-purple-400 to-indigo-500' },
  { id: 'dept6', name: 'Chemicals & Sprays', short: 'Chemicals', icon: FaFlask, color: 'from-green-400 to-emerald-500' },
  { id: 'dept7', name: 'Service Contracts', short: 'Contract', icon: FaFileContract, color: 'from-red-400 to-pink-500' }
];

export function NewSaleModal() {
  const [showAddModal, setShowAddModal] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [customerType, setCustomerType] = useState('existing');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountPaid, setAmountPaid] = useState(0);

  const existingCustomers = [
    { id: 1, name: 'Mr. Faisal Ahmed', phone: '0300-1234567', address: 'DHA Phase 6, Karachi' },
    { id: 2, name: 'Pearl Continental Hotel', phone: '021-111222333', address: 'Club Road, Karachi' },
    { id: 3, name: 'Mrs. Sana Khan', phone: '0333-9876543', address: 'Clifton Block 8' },
    { id: 4, name: 'Super Mart', phone: '021-34567890', address: 'Tariq Road' }
  ];

  const departmentServices = {
    dept1: [
      { id: 's1', name: 'General Pest Spray', price: 12000 },
      { id: 's2', name: 'Cockroach Gel Treatment', price: 8000 },
      { id: 's3', name: 'Ant & Spider Control', price: 6000 },
      { id: 's4', name: 'Complete Home Package', price: 25000 }
    ],
    dept2: [
      { id: 's5', name: 'Factory Fumigation', price: 85000 },
      { id: 's6', name: 'Warehouse Fogging', price: 120000 },
      { id: 's7', name: 'Office Pest Control', price: 35000 }
    ],
    dept3: [
      { id: 's8', name: 'Pre-Construction Termite Treatment', price: 75000 },
      { id: 's9', name: 'Post-Construction Barrier', price: 45000 },
      { id: 's10', name: 'Termite Inspection + Treatment', price: 30000 }
    ],
    dept4: [
      { id: 's11', name: 'Rodent Baiting Program', price: 28000 },
      { id: 's12', name: 'Trap Installation', price: 15000 }
    ],
    dept5: [
      { id: 's13', name: 'Full Disinfection Fogging', price: 35000 },
      { id: 's14', name: 'Surface Sanitization', price: 20000 }
    ],
    dept6: [
      { id: 's15', name: 'Cypermethrin 10% EC (10L)', price: 45000 },
      { id: 's16', name: 'Deltamethrin (5L)', price: 32000 }
    ],
    dept7: [
      { id: 's17', name: 'Annual Maintenance Contract', price: 480000 },
      { id: 's18', name: 'Quarterly Service Plan', price: 120000 }
    ]
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { ...item, qty: 1 }]);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(cart.filter(c => c.id !== id));
    else setCart(cart.map(c => c.id === id ? { ...c, qty } : c));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;
  const balanceDue = total - amountPaid;

  const resetAndClose = () => {
    setStep(1);
    setSelectedDepartment('');
    setCustomerType('existing');
    setSelectedCustomer('');
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerAddress('');
    setCart([]);
    setDiscount(0);
    setNotes('');
    setPaymentMethod('cash');
    setAmountPaid(0);
    setShowAddModal(false);
  };

  const handleConfirmSale = () => {
    alert('Sale recorded successfully! Invoice #1009 generated.');
    resetAndClose();
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-3xl w-full max-w-7xl my-auto flex flex-col max-h-[98vh] sm:max-h-[95vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sm:p-6 lg:p-8 flex justify-between items-start sm:items-center gap-3">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">New Sale</h3>
            <p className="text-emerald-100 text-xs sm:text-sm lg:text-lg mt-1 sm:mt-2">Create invoice • Dec 28, 2025</p>
          </div>
          <button onClick={resetAndClose} className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl sm:rounded-2xl hover:bg-white/30 flex items-center justify-center transition flex-shrink-0">
            <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-6 bg-emerald-600 overflow-x-auto">
          {['Customer', 'Services', 'Payment'].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2 lg:gap-4 flex-shrink-0">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm lg:text-xl transition ${
                step > i + 1 ? 'bg-white text-emerald-600' :
                step === i + 1 ? 'bg-white text-emerald-600 shadow-lg' :
                'bg-white/30 text-white'
              }`}>
                {step > i + 1 ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-6 lg:h-6" /> : i + 1}
              </div>
              <span className={`font-semibold text-xs sm:text-sm lg:text-lg whitespace-nowrap ${step >= i + 1 ? 'text-white' : 'text-white/50'}`}>{label}</span>
              {i < 2 && <div className={`w-6 sm:w-8 lg:w-16 h-1 rounded-full flex-shrink-0 ${step > i + 1 ? 'bg-white' : 'bg-white/30'}`} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="p-3 sm:p-4 lg:p-8 overflow-y-auto flex-1">
          {/* Step 1: Department & Customer */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Departments */}
              <div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Select Department</h4>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-6">
                  {departments.map(dept => {
                    const Icon = dept.icon;
                    return (
                      <button key={dept.id} onClick={() => setSelectedDepartment(dept.id)}
                        className={`p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 lg:border-4 transition transform active:scale-95 sm:hover:scale-105 ${
                          selectedDepartment === dept.id ? 'border-emerald-500 bg-emerald-50 shadow-lg' : 'border-gray-200 bg-white'
                        } flex flex-col items-center gap-1.5 sm:gap-2 lg:gap-4`}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 flex items-center justify-center text-white rounded-lg sm:rounded-xl bg-gradient-to-br ${dept.color}`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-12 lg:h-12" />
                        </div>
                        <p className="text-xs sm:text-sm lg:text-lg font-bold text-center leading-tight">{dept.short}</p>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 text-center leading-tight hidden sm:block">{dept.name}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Customer */}
              <div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Customer Details</h4>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
                  <button onClick={() => setCustomerType('existing')} className={`flex-1 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm lg:text-base transition ${customerType === 'existing' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Existing</button>
                  <button onClick={() => setCustomerType('new')} className={`flex-1 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm lg:text-base transition ${customerType === 'new' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>New</button>
                </div>

                {customerType === 'existing' ? (
                  <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 text-xs sm:text-sm lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none">
                    <option value="">Select customer...</option>
                    {existingCustomers.map(c => <option key={c.id} value={c.id}>{c.name} • {c.phone}</option>)}
                  </select>
                ) : (
                  <div className="space-y-2.5 sm:space-y-3 lg:space-y-6">
                    <input type="text" placeholder="Full Name" value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none text-xs sm:text-sm lg:text-lg"/>
                    <input type="text" placeholder="Phone Number" value={newCustomerPhone} onChange={e => setNewCustomerPhone(e.target.value)} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none text-xs sm:text-sm lg:text-lg"/>
                    <textarea placeholder="Address (Optional)" value={newCustomerAddress} onChange={e => setNewCustomerAddress(e.target.value)} rows={3} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none resize-none text-xs sm:text-sm lg:text-lg"/>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Services & Cart */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Services */}
              <div className="lg:col-span-2">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
                  <span className="hidden sm:inline">Select Services / Products — </span>
                  <span className="sm:hidden">Services — </span>
                  {departments.find(d => d.id === selectedDepartment)?.short}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-6">
                  {selectedDepartment && departmentServices[selectedDepartment]?.map(item => (
                    <div key={item.id} className="p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-emerald-500 cursor-pointer transition active:scale-95" onClick={() => addToCart(item)}>
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2 lg:mb-4">
                        <h5 className="font-bold text-xs sm:text-sm lg:text-lg leading-tight pr-2">{item.name}</h5>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600 flex-shrink-0"/>
                      </div>
                      <p className="text-base sm:text-lg lg:text-2xl font-bold text-emerald-600">₨{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-8 border-2 border-emerald-200">
                <h5 className="text-base sm:text-lg lg:text-2xl font-bold mb-3 sm:mb-4">Cart Summary</h5>
                {cart.length === 0 ? <p className="text-center text-gray-500 py-8 sm:py-12 text-xs sm:text-sm lg:text-base">No items added yet</p> :
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-3 sm:mb-4 lg:mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-5 shadow-md">
                        <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-2">
                          <p className="font-semibold text-xs sm:text-sm lg:text-lg leading-tight">{item.name}</p>
                          <button onClick={() => updateQty(item.id, 0)} className="text-red-500 hover:text-red-700 flex-shrink-0">
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"/>
                          </button>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg">-</button>
                            <span className="text-xs sm:text-sm lg:text-xl font-bold w-5 sm:w-6 lg:w-12 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg">+</button>
                          </div>
                          <p className="text-xs sm:text-sm lg:text-xl font-bold text-emerald-600">₨{(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
                <div className="border-t-2 border-dashed border-gray-300 pt-3 sm:pt-4 lg:pt-6 space-y-1.5 sm:space-y-2 lg:space-y-4">
                  <div className="flex justify-between text-xs sm:text-sm lg:text-lg"><span>Subtotal</span><span>₨{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center text-xs sm:text-sm lg:text-lg gap-2">
                    <span>Discount (%)</span>
                    <input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-14 sm:w-16 lg:w-24 px-2 py-1 sm:px-2 sm:py-1 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-right rounded-lg sm:rounded-xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none"/>
                  </div>
                  {discount > 0 && <div className="flex justify-between text-red-600 text-xs sm:text-sm lg:text-lg"><span>Discount Amount</span><span>-₨{discountAmount.toLocaleString()}</span></div>}
                  <div className="flex justify-between text-base sm:text-lg lg:text-2xl font-bold text-emerald-600 pt-1.5 sm:pt-2 lg:pt-4"><span>Total</span><span>₨{total.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Invoice */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Payment Details</h4>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
                  {['cash', 'card', 'bank'].map(pm => (
                    <button key={pm} onClick={() => setPaymentMethod(pm)} className={`flex-1 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm lg:text-base transition ${paymentMethod === pm ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {pm.charAt(0).toUpperCase() + pm.slice(1)}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Amount Paid" value={amountPaid} onChange={e => setAmountPaid(Number(e.target.value))} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4"/>
                <textarea placeholder="Notes / Remarks" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-5 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:outline-none text-xs sm:text-sm lg:text-lg resize-none"/>
              </div>

              {/* Invoice Preview */}
              <div className="bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-200">
                <h5 className="text-base sm:text-lg lg:text-2xl font-bold mb-3 sm:mb-4">Invoice Preview</h5>
                {cart.length === 0 ? <p className="text-gray-500 text-xs sm:text-sm lg:text-base">No items in cart</p> :
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-xs sm:text-sm lg:text-lg gap-2">
                        <span className="leading-tight">{item.name} x {item.qty}</span>
                        <span className="flex-shrink-0">₨{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-dashed border-gray-300 pt-2 sm:pt-3 lg:pt-4 space-y-1 sm:space-y-1.5">
                      <div className="flex justify-between font-bold text-xs sm:text-sm lg:text-lg"><span>Total</span><span>₨{total.toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-xs sm:text-sm lg:text-lg"><span>Paid</span><span>₨{amountPaid.toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-red-600 text-xs sm:text-sm lg:text-lg"><span>Balance Due</span><span>₨{balanceDue.toLocaleString()}</span></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:px-8 lg:py-6 border-t-2 border-gray-200">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-xl sm:rounded-2xl border-2 border-gray-300 hover:bg-gray-100 transition text-xs sm:text-sm lg:text-base font-medium">
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"/> 
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : <div />}

          {step < 3 && (
            <button 
              disabled={
                (step === 1 && !selectedDepartment) || 
                (step === 1 && customerType === 'existing' && !selectedCustomer) || 
                (step === 1 && customerType === 'new' && !newCustomerName)
              } 
              onClick={() => setStep(step + 1)} 
              className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-xl sm:rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm lg:text-base font-medium ml-auto">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"/>
            </button>
          )}

          {step === 3 && (
            <button onClick={handleConfirmSale} className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-xl sm:rounded-2xl bg-teal-600 text-white hover:bg-teal-700 transition text-xs sm:text-sm lg:text-base font-medium ml-auto">
              <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5"/>
              <span className="hidden sm:inline">Confirm & Generate Invoice</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
