import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from './ProductService';
import log from 'loglevel';  // Import the loglevel logger

// Set log level based on environment (use 'debug' for development, 'warn' for production)
log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

const App = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      log.debug('Fetching all products...');
      const response = await getAllProducts();
      setProducts(response.data);
      log.debug('Products fetched successfully:', response.data);
    } catch (error) {
      log.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        log.debug(`Updating product with ID: ${id}`);
        await updateProduct(id, form);
        log.debug('Product updated successfully.');
      } else {
        log.debug('Creating new product...');
        await createProduct(form);
        log.debug('Product created successfully.');
      }
      setForm({ name: '', description: '', price: '' });
      setIsUpdate(false);
      setId(null);
      fetchProducts();
    } catch (error) {
      log.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        log.debug(`Deleting product with ID: ${id}`);
        await deleteProduct(id);
        log.debug('Product deleted successfully.');
        fetchProducts();
      } catch (error) {
        log.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    log.debug('Editing product:', product);
    setForm(product);
    setIsUpdate(true);
    setId(product.id);
  };

  const handleClear = () => {
    log.debug('Clearing form...');
    setForm({ name: '', description: '', price: '' });
    setIsUpdate(false);
    setId(null);
  };

  return (
    <div className="container mt-4">
      <h2>Product Management System</h2>

      <div className="mb-4">
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <button className="btn btn-primary" type="submit">
              {isUpdate ? 'Update' : 'Save'}
            </button>
            <button className="btn btn-secondary ms-2" type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
