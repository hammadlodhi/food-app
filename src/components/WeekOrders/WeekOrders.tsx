"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeekOrders.css";
import Card from "../Card/Card";
import WeekSelectionPopup from "../WeekSelectionPopup/WeekSelectionPopup";

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

const WeekOrders: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("allmeals");
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [weekCards, setWeekCards] = useState<{ [key: string]: number[] }>({
    "Week 1": [],
    "Week 2": [],
    "Week 3": [],
    "Week 4": [],
  });
  const [allMeals, setAllMeals] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes?limit=50")
      .then((response) => {
        setAllMeals(response.data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching recipes");
        setLoading(false);
      });
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    setSelectedCardIds([]);
  };

  const handleCardSelect = (id: number) => {
    setSelectedCardIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cardId) => cardId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleAddToWeekClick = () => {
    if (selectedCardIds.length > 0) {
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = (week: string) => {
    setWeekCards((prev) => ({
      ...prev,
      [week]: [...prev[week], ...selectedCardIds],
    }));
    closePopup();
    setSelectedCardIds([]);
  };

  const handleDelete = (id: number) => {
    if (selectedTab.startsWith("Week")) {
      const week = selectedTab;
      setWeekCards((prev) => ({
        ...prev,
        [week]: prev[week].filter((mealId) => mealId !== id),
      }));
    }
  };

  const isAddToWeekDisabled = () => {
    return selectedCardIds.length === 0;
  };

  const assignedMeals = selectedTab.startsWith("Week")
    ? allMeals.filter((meal) => weekCards[selectedTab].includes(meal.id))
    : [];

  if (loading) {
    return <div className="week-orders__status">Loading meals...</div>;
  }

  if (error) {
    return <div className="week-orders__status">Error: {error}</div>;
  }

  return (
    <div className="week-orders">
      <h1 className="week-orders__title">Week Orders</h1>
      <nav className="navbar">
        <ul className="navbar__links">
          <li>
            <button
              className={`navbar__link ${selectedTab === "allmeals" ? "active" : ""}`}
              onClick={() => handleTabClick("allmeals")}
            >
              All Meals
            </button>
          </li>
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
            <li key={week}>
              <button
                className={`navbar__link ${selectedTab === week ? "active" : ""}`}
                onClick={() => handleTabClick(week)}
              >
                {week}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="navbar__button"
          onClick={handleAddToWeekClick}
          disabled={isAddToWeekDisabled()}
        >
          Add to Week
        </button>
      </nav>

      <div className="content">
        {selectedTab === "allmeals" && (
          <div className="card-container">
            {allMeals.length > 0 ? (
              allMeals.map((meal) => (
                <Card
                  key={meal.id}
                  recipe={meal}
                  onSelect={handleCardSelect}
                  isSelected={selectedCardIds.includes(meal.id)}
                  readOnly={false}
                />
              ))
            ) : (
              <p className="week-orders__message">No meals to display.</p>
            )}
          </div>
        )}

        {selectedTab.startsWith("Week") && (
          <div className="card-container">
            {assignedMeals.length > 0 ? (
              assignedMeals.map((meal) => (
                <Card
                  key={meal.id}
                  recipe={meal}
                  onSelect={() => {}} 
                  isSelected={false}
                  readOnly={true}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="week-orders__message">No meals assigned to this week.</p>
            )}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <WeekSelectionPopup onClose={closePopup} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekOrders;
