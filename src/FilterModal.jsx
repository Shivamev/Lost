import React, { useState } from 'react';

const FilterModal = ({ onClose, onFilter }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ['Lost', 'Found', 'Urgent'];

  const handleCheckboxChange = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFilter = () => {
    // You can customize this to call an API or update UI
    onFilter({ title, category, tags: selectedTags });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg">
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Filter Items</h2>

        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title..."
          className="w-full border rounded-md px-3 py-2 mb-4 text-sm"
        />

        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 text-sm"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Documents">Documents</option>
        </select>

        <label className="block text-sm font-medium mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <label key={tag} className="text-sm flex items-center space-x-1">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
