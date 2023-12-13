import React from "react";
import likeButton from "../../images/heart.svg";
import blackHeart from "../../images/black-heart.svg";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, onCardLike, onCardDislike, currentUser }) => {
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
        {currentUser && (
          <button className="card__like-Button" onClick={handleLikeClick}>
            <img 
              src={isLiked ? blackHeart : likeButton} 
              alt={isLiked ? "Liked" : "Not liked"} 
              className="card__like-image" 
            />
          </button>
        )}
        <div className="card__text">{item.name}</div>
      </div>
    </div>
  );
};

export default ItemCard;
