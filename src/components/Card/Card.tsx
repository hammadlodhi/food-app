"use client";

import React from "react";
import "./Card.css";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface CardProps {
  recipe: Recipe;
  onSelect: (id: number) => void;
  isSelected: boolean;
  readOnly?: boolean;
  onDelete?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  recipe,
  onSelect,
  isSelected,
  readOnly = false,
  onDelete,
}) => {
  const handleClick = () => {
    if (!readOnly) {
      onSelect(recipe.id);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(recipe.id);
    }
  };

  return (
    <div
      className={`card ${isSelected ? "selected" : ""} ${
        readOnly ? "read-only" : ""
      }`}
      onClick={handleClick}
    >
      <img src={recipe.image} alt={recipe.name} className="card__image" />
      <div className="card__content">
        <h2 className="card__title">{recipe.name}</h2>
        <p className="card__description">
          {recipe.instructions.slice(0, 2).join(", ")}...
        </p>
        <p className="card__description">
          <strong>Calories:</strong> {recipe.caloriesPerServing} kcal |{" "}
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <p className="card__description">
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p className="card__description">
          <strong>Rating:</strong> {recipe.rating}{" "}
          <span className="card__star">
            {"⭐".repeat(Math.round(recipe.rating))}
          </span>
        </p>
      </div>
      {onDelete && (
        <button className="card__delete-button" onClick={handleDelete}>
          &#10005;
        </button>
      )}
    </div>
  );
};

export default Card;
