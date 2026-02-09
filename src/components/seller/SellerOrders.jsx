import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

export default function SellerOrders() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const orders = [
    {
      id: 'ORD001',
      customer: 'Priya Sharma',
      customerEmail: 'priya.sharma@email.com',
      product: 'Assamese Muga Silk Saree',
      productId: 1,
      amount: 8500,
      quantity: 1,
      status: 'pending',
      date: '2024-02-08',
      address: '123 MG Road, Guwahati, Assam - 781001',
      phone: '+91 98765 43210',
      paymentMethod: 'UPI',
      paymentStatus: 'completed'
    },
    {
      id: 'ORD002',
      customer: 'Rajesh Kumar',
      customerEmail: 'rajesh.k@email.com',
      product: 'Naga Tribal Shawl',
      productId: 2,
      amount: 4800,
      quantity: 1,
      status: 'shipped',
      date: '2024-02-07',
      address: '456 Park Street, Kohima, Nagaland - 797001',
      phone: '+91 87654 32109',
      paymentMethod: 'Card',
      paymentStatus: 'completed',
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD003',
      customer: 'Anita Das',
      customerEmail: 'anita.das@email.com',
      product: 'Manipuri Phanek',
      productId: 3,
      amount: 3200,
      quantity: 2,
      status: 'delivered',
      date: '2024-02-06',
      address: '789 Thangal Bazaar, Imphal, Manipur - 795001',
      phone: '+91 76543 21098',
      paymentMethod: 'COD',
      paymentStatus: 'completed',
      deliveredDate: '2024-02-10'
    },
    {
      id: 'ORD004',
      customer: 'Suresh Patel',
      customerEmail: 'suresh.p@email.com',
      product: 'Assamese Muga Silk Saree',
      productId: 1,
      amount: 8500,
      quantity: 1,
      status: 'cancelled',
      date: '2024-02-05',
      address: '321 Civil Lines, Shillong, Meghalaya - 793001',
      phone: '+91 65432 10987',
      paymentMethod: 'UPI',
      paymentStatus: 'refunded',
      cancelReason: 'Customer requested cancellation'
    }
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'delivered': return <Package size={16} />;
      case 'cancelled': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`);
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="space-y-8">
      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{orderStats.total}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
          <div className="text-sm text-gray-600">Shipped</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
          <div className="text-sm text-gray-600">Delivered</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{orderStats.cancelled}</div>
          <div className="text-sm text-gray-600">Cancelled</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'all', label: 'All Orders', count: orderStats.total },
            { id: 'pending', label: 'Pending', count: orderStats.pending },
            { id: 'shipped', label: 'Shipped', count: orderStats.shipped },
            { id: 'delivered', label: 'Delivered', count: orderStats.delivered },
            { id: 'cancelled', label: 'Cancelled', count: orderStats.cancelled }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl flex items-center justify-center">
                    <Package className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Customer</h4>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Product</h4>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Amount</h4>
                  <p className="text-lg font-bold text-gray-800">₹{order.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{order.paymentMethod} • {order.paymentStatus}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Confirm Order
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'shipped')}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    Mark as Shipped
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? 'You haven\'t received any orders yet.' 
                : `No ${activeFilter} orders at the moment.`}
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Order Details - #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.customer}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                    <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Product:</strong> {selectedOrder.product}</p>
                    <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                    <p><strong>Amount:</strong> ₹{selectedOrder.amount.toLocaleString()}</p>
                    <p><strong>Payment:</strong> {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedOrder.trackingId && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Tracking Information</h3>
                  <p className="text-sm text-gray-600">Tracking ID: {selectedOrder.trackingId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}