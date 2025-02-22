import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import ExpandCard from "./ExpandCard"; // Import ExpandCard

const Card = ({
  name,
  imageUrl,
  ingredients,
  instructions,
  cookingTime,
  userName,
  id,
  savedRecipes,
  bool,
  loggedInUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(bool);

  const saveRecipe = async () => {
    try {
      const userID = useGetUserID();
      await axios.put("https://recipe-book-gha2.onrender.com/recipes/save", {
        userID,
        recipeID: id,
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return isExpanded ? (
    <ExpandCard
      name={name}
      imageUrl={imageUrl}
      ingredients={ingredients}
      instructions={instructions}
      cookingTime={cookingTime}
      userName={userName}
      onClose={() => {
        console.log("Closing ExpandCard..."); // Debugging log
        setIsExpanded(false);
      }}
    />
  ) : (
  
    <div className="border rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
      <img className="rounded-t-lg w-full h-56 object-cover" src={imageUrl} alt="Recipe" />
      <div className="p-4">
        <h5 className="text-lg font-bold text-indigo-600 text-center">{name}</h5>
        <p className="text-black font-normal">Ingredients:</p>
        <ul>
          {ingredients.slice(0, 3).map((ingredient, index) => (
            <li key={index} className="text-gray-900">➡️ {ingredient}</li>
          ))}
        </ul>
        <p className="mt-2 text-center bg-indigo-600 text-white px-4 py-1 rounded-lg">
          Cooking Time: {cookingTime} minutes
        </p>
        <p className="text-center">🙋🏻‍♂️ {userName}</p>
        {loggedInUser && (
          <button onClick={saveRecipe} className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded-lg w-full">
            {isSaved ? "✨ Saved" : "⭐ Save"}
          </button>
        )}
        <button onClick={() => setIsExpanded(true)} className="mt-3 bg-gray-600 text-white px-4 py-1 rounded-lg w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
