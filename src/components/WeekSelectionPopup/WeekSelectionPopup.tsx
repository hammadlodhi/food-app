"use client";

import React, { useState } from "react";
import "./WeekSelectionPopup.css";

interface WeekSelectionPopupProps {
  onClose: () => void;
  onSave: (week: string) => void;
}

const WeekSelectionPopup: React.FC<WeekSelectionPopupProps> = ({ onClose, onSave }) => {
  const [selectedWeek, setSelectedWeek] = useState<string>("Week 1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedWeek);
  };

  return (
    <div className="week-selection-popup">
      <h2>Select a Week</h2>
      <form onSubmit={handleSubmit}>
        {["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
          <div key={week} className="radio-group">
            <input
              type="radio"
              id={week}
              name="week"
              value={week}
              checked={selectedWeek === week}
              onChange={(e) => setSelectedWeek(e.target.value)}
            />
            <label htmlFor={week}>{week}</label>
          </div>
        ))}
        <div className="popup-buttons">
          <button type="button" onClick={onClose} className="popup-button cancel">
            Cancel
          </button>
          <button type="submit" className="popup-button save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeekSelectionPopup;
