import React, { useContext } from 'react';
import { Context } from '../store/Context';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader.jsx';

function DashBoard() {
  const navigate = useNavigate();
  const { 
    orders, 
    users, 
    availableMeals, 
    ordersLoading, 
    usersLoading, 
    mealsLoading 
  } = useContext(Context);

  if (ordersLoading || usersLoading || mealsLoading) {
    return <Loader message="Refreshing Dashboard Metrics..." />;
  }

  // Dynamic calculations
  const totalOrders = orders?.length || 0;
  const totalUsers = users?.length || 0;
  const totalMeals = availableMeals?.length || 0;

  const totalRevenue = orders?.reduce((sum, order) => {
    const orderTotal = order.items?.reduce((oSum, item) => oSum + (item.price * item.quantity), 0) || 0;
    return sum + orderTotal;
  }, 0) || 0;

  // Popular meals calculation (Top 5)
  const mealSales = {};
  orders?.forEach(order => {
    order.items?.forEach(item => {
      mealSales[item.name] = (mealSales[item.name] || 0) + item.quantity;
    });
  });

  const popularMeals = Object.entries(mealSales)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const maxSales = popularMeals.length > 0 ? popularMeals[0].quantity : 1;

  // Recent orders calculation (Top 5)
  const recentOrders = [...(orders || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const formatOrderTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderTotal = (order) => {
    return order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Control Panel</h1>
        <p>Real-time analytics and management for Tasty Bite</p>
      </header>

      {/* Statistics Cards Grid */}
      <section className="dashboard-stats-grid">
        <div className="stat-card" onClick={() => navigate("/ordersList")}>
          <div className="stat-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">${totalRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/ordersList")}>
          <div className="stat-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{totalOrders}</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/usersList")}>
          <div className="stat-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Users</span>
            <span className="stat-value">{totalUsers}</span>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/meals")}>
          <div className="stat-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Menu Items</span>
            <span className="stat-value">{totalMeals}</span>
          </div>
        </div>
      </section>

      {/* Quick Actions Panel */}
      <h3 style={{ color: '#ffc404', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>Quick Actions</h3>
      <section className="quick-actions-bar">
        <button className="quick-action-btn" onClick={() => navigate("/meals")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Manage Menu
        </button>
        <button className="quick-action-btn" onClick={() => navigate("/ordersList")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Review Orders
        </button>
        <button className="quick-action-btn" onClick={() => navigate("/usersList")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
          Manage Users
        </button>
      </section>

      {/* Core Analytic Charts Grid */}
      <section className="dashboard-sections-grid">
        {/* Popular Items Card */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Top Performing Dishes
            <span>by units sold</span>
          </div>
          {popularMeals.length === 0 ? (
            <p className="empty-state">No order sales registered to calculate popularity.</p>
          ) : (
            <div className="chart-list">
              {popularMeals.map((meal) => {
                const percentage = (meal.quantity / maxSales) * 100;
                return (
                  <div key={meal.name} className="chart-row">
                    <div className="chart-row-header">
                      <span className="chart-meal-name">{meal.name}</span>
                      <span className="chart-meal-sales">{meal.quantity} orders</span>
                    </div>
                    <div className="chart-bar-bg">
                      <div className="chart-bar-fill" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Orders Activity Log */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            Recent Activity
            <span>latest orders</span>
          </div>
          {recentOrders.length === 0 ? (
            <p className="empty-state">No orders received yet.</p>
          ) : (
            <div className="recent-orders-container">
              {recentOrders.map((order) => (
                <div key={order._id} className="recent-order-row" onClick={() => navigate("/ordersList")} style={{ cursor: 'pointer' }}>
                  <div className="order-customer-info">
                    <span className="order-customer-name">{order.fullName}</span>
                    <span className="order-time">{formatOrderTime(order.createdAt)}</span>
                  </div>
                  <div className="order-price-info">
                    <span className="order-amount">₹{getOrderTotal(order).toLocaleString('en-IN')}</span>
                    <span className="order-items-count">
                      {order.items?.reduce((q, item) => q + item.quantity, 0) || 0} items
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DashBoard;
