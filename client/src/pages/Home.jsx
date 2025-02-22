import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import ReactLoading from "react-loading";
import Card from "../components/Card";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-book-gha2.onrender.com/recipes");
        const recipesWithUsernames = await Promise.all(
          response.data.map(async (recipe) => {
            try {
              const userResponse = await axios.post("https://recipe-book-gha2.onrender.com/auth/getUser", {
                userID: recipe.userOwner,
              });
              return { ...recipe, username: userResponse.data.username };
            } catch (error) {
              console.error("Error fetching user:", error);
              return { ...recipe, username: null };
            }
          })
        );
        setRecipes(recipesWithUsernames); // Removed .reverse()

        const uid = useGetUserID();
        if (uid) {
          const savedRecipesResponse = await axios.get("https://recipe-book-gha2.onrender.com/recipes/saved/" + uid);
          setSavedRecipes(savedRecipesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const toggleExpand = (recipeId) => {
    setExpandedRecipe((prev) => (prev === recipeId ? null : recipeId));
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 w-full">
      {expandedRecipe && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 backdrop-blur-sm"></div>}

      <div className="relative z-20">
        <h1 className="text-2xl font-semibold text-center leading-7 text-gray-900">All Recipes</h1>
      </div>

      {recipes.length === 0 ? (
        <div className="w-full flex items-center justify-center h-screen -mt-40">
          <ReactLoading type="spin" color="#3949AB" height={70} width={70} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full max-w-7xl mx-auto relative z-20">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              ingredients={recipe.ingredients.slice(0, 3)}
              instructions={recipe.instructions}
              cookingTime={recipe.cookingTime}
              userName={recipe.username}
              id={recipe._id}
              savedRecipes={savedRecipes}
              loggedInUser={useGetUserID()}
              bool={savedRecipes.includes(recipe._id)}
              isExpanded={expandedRecipe === recipe._id}
              toggleExpand={() => toggleExpand(recipe._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
