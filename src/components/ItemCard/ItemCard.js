import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import CurrentUserContext
import likeButton from "../../images/heart.svg";
import blackHeart from "../../images/black-heart.svg";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, onCardLike, onCardDislike }) => {
  const { currentUser } = useContext(CurrentUserContext); // Use currentUser from context

  // Determine if the current user has liked the item
  const isLiked = currentUser && item.likes.includes(currentUser._id);

  const handleLikeClick = () => {
    if (isLiked) {
      onCardDislike(item._id);
    } else {
      onCardLike(item._id);
    }
  };

  return (
    <div className="item-card">
      <div className="item-card__image-container">
        <img
          src={item.imageUrl}
          className="card__image" 
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="item-card__details">
      <div className="card__text">{item.name}</div>
        {currentUser && (
          <button className="card__like-button" onClick={handleLikeClick}>
            <img 
              src={isLiked ? blackHeart : likeButton} 
              alt={isLiked ? "Liked" : "Not liked"} 
              className="card__like-image" 
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
