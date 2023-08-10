import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          src={item.imageUrl}
          className="card__image"
          alt="photo of clothing item"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card__text">{item.name}</div>
    </div>
  );
};

export default ItemCard;
