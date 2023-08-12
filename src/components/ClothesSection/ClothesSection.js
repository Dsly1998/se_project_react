import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onSelectCard, handleActiveCreateModal, clothingItems }) => {
  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase();
  });
  return (
    <section className="clothesSection">
      <div className="clothesSection__header">
        <div className="clothesSection__title">Your items:</div>
        <button
          className="clothesSection__button"
          type="text"
          onClick={handleActiveCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothesSection__cards">
        <div className="clothesSection__card-items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onSelectCard={onSelectCard}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClothesSection;
