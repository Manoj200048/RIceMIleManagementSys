import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/products/${id}`);
        // Remove the deleted product from the data state
        setData(data.filter(product => product._id !== id));
        // Show window alert for successful deletion
        window.alert('Product successfully deleted.');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (

    
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((productItem, i) => (
            <tr key={i}>
              <td>{productItem._id}</td> {/* Access ID field using _id */}
              <td>{productItem.title}</td>
              <td>{productItem.description}</td>
              <td>{productItem.price}</td>
              <td>
                <Link to={`/updateproduct/${productItem._id}`}>Update</Link>
                <br />
                {/* Pass the product ID to the deleteProduct function */}
                <button onClick={() => deleteProduct(productItem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Home;
