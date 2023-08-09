import React from "react";
import { defaultClothingItems } from "../utils/contants";
import "./ClothesSection.css"
import ItemCard from "../components/ItemCard/ItemCard";

const ClothesSection = ({
  onSelectCard,
  handleActiveCreateModal,
}) => {
  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase()
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
                key={item._id}
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