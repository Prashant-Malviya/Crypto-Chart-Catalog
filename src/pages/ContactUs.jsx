import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}. We will get back to you shortly.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-left text-gray-100">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded text-gray-900"
          />
        </div>
        <div>
          <label className="block text-left text-gray-100">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded text-gray-900"
          />
        </div>
        <div>
          <label className="block text-left text-gray-100">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded text-gray-900"
          />
        </div>
        <button type="submit" className="w-full border-2 border-gray-100 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600">
          Submit
        </button>
      </form>
    </motion.div>
  );
}
