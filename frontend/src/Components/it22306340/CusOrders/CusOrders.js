import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import Header from "../Header/Header";
import ProNav from "../ProNav/ProNav";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders(); 
  }, []);

  const deleteHandler = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this order?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        alert("Order deleted successfully!");
        fetchAllOrders(); 
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Order List", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Order ID", "Customer ID", "Product Name", "Total Price", "Order Date", "Status"]],
      body: orders.map((order) => [
        order.orderId,
        order.customerId,
        order.productName ?? "N/A", 
        order.totalPrice?.toFixed(2) ?? "N/A",
        new Date(order.orderDate).toLocaleString(),
        order.status,
      ]),
    });

    doc.save("orders.pdf"); // Save as PDF
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(order.orderDate).toLocaleDateString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <ProNav />
      <br />
      <div className="all-orders-container">
        <h1 className="dashboard-title">Order History</h1>
        <div className="all-orders-header">
          <input
            className="all-orders-search"
            type="text"
            placeholder="Search by Order ID, Customer ID, or Order Date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button onClick={downloadPDF} className="pdf-download-button">
            Order Report
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.productName ?? "N/A"}</td>
                  <td>${order.totalPrice?.toFixed(2) ?? "N/A"}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>
                    <div className="user-profile-buttons">
                    <Link 
  to={{
    pathname: "/Adfeed",
    state: { 
      customerId: order.customerId,
      productName: order.productName,
      productId: order.productId,
    },
  }}
>
  <button className="update-button">Add Feedback</button>
</Link>

                      <button onClick={() => deleteHandler(order._id)} className="delete-button">
                        Delete Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
