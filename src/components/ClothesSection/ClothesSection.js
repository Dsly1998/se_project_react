import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Adjust this path as necessary
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  onSelectCard,
  handleActiveCreateModal,
  clothingItems,
  onCardLike, 
  onCardDislike
}) => {
  const { currentUser } = useContext(CurrentUserContext);

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
          type="button"
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
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
              // currentUser prop is no longer needed
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClothesSection;
