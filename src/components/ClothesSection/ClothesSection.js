import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  onSelectCard,
  handleActiveCreateModal,
  clothingItems,
  currentUser, // Add currentUser as a prop
}) => {
  // Filter to show only the items added by the current user
  const filteredCards = clothingItems.filter((item) => {
    return currentUser && item.owner === currentUser._id;
  });

  return (
    <section className="clothesSection">
      <div className="clothesSection__header">
        <div className="clothesSection__title">Your items:</div>
        <button
          className="clothesSection__button"
          type="button" // Corrected button type
          onClick={handleActiveCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothesSection__cards">
        <div className="clothesSection__card-items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClothesSection;
