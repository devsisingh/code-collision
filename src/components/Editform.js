"use client"
import React, {useState, useEffect} from 'react';


const EditForm = ({ idea, onSave, onCancel }) => {
    const [title, setTitle] = useState(idea.title);
    const [description1, setDescription1] = useState(idea.problem_solved);
    const [description2, setDescription2] = useState(idea.possible_solution);
    const [description3, setDescription3] = useState(idea.resources);
    const [description4, setDescription4] = useState(idea.additional);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ id: idea.id, title, description1, description2, description3, description4});
    };
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-black text-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-semibold mb-4">Edit Idea</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 p-2 w-full border rounded-md bg-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Problem Solved
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 w-full border rounded-md bg-black"
                rows="2"
                value={description1}
                onChange={(e) => setDescription1(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Possible Solution
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 w-full border rounded-md bg-black"
                rows="2"
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Resources
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 w-full border rounded-md bg-black"
                rows="2"
                value={description3}
                onChange={(e) => setDescription3(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">
                Additional
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 w-full border rounded-md bg-black"
                rows="2"
                value={description4}
                onChange={(e) => setDescription4(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default EditForm;
  