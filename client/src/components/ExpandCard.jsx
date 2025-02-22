import React from "react";
import { motion } from "framer-motion";

const ExpandCard = ({ name, imageUrl, ingredients, instructions, cookingTime, userName, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full h-[80vh] overflow-hidden relative"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            console.log("Close button clicked!"); // Debugging log
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-700 text-xl bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✖
        </button>

        <img className="w-full h-56 object-cover rounded-lg" src={imageUrl} alt="Recipe" />
        <h5 className="text-xl font-bold text-indigo-600 text-center mt-4">{name}</h5>
        
        {/* Ingredients */}
        <div className="mt-3">
          <p className="font-semibold text-gray-900">Ingredients:</p>
          <ul className="overflow-auto max-h-32 border p-2 rounded-md">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">➡️ {ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-3 overflow-y-auto max-h-40 border-t pt-2">
          <p className="text-gray-700">{instructions}</p>
        </div>

        <p className="mt-3 text-center bg-indigo-600 text-white px-4 py-1 rounded-lg">
          Cooking Time: {cookingTime} minutes
        </p>
        <p className="text-center">🙋🏻‍♂️ {userName}</p>
      </motion.div>
    </div>
  );
};

export default ExpandCard;
