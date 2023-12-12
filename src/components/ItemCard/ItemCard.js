import React, { useState } from "react";
import likeButton from "../../images/heart.svg";
import blackHeart from "../../images/black-heart.svg";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <div>
        <img
          src={item.imageUrl}
          className="card__image" 
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div>
        <button className="card__like-Button" onClick={handleLikeClick}>
          {isLiked 
            ? <img src={blackHeart} alt="Liked" className="card__like-image" />
            : <img src={likeButton} alt="Not liked" className="card__like-image" />
          }
        </button>
        <div className="card__text">{item.name}</div>
      </div>
    </div>
  );
};

export default ItemCard;
