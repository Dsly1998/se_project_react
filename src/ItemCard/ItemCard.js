import "./ItemCard.css";

const ItemCard = ({ x }) => {
  return (
    <div>
      <div>
        <img className="card__image" src={x.link} />
      </div>
      <div className="card__text">{x.name}</div>
    </div>
  );
};

export default ItemCard;
