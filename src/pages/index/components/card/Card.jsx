import styles from './Card.module.scss';

function Card({ data, handleDialog, handleData }) {
  const openDialog = () => {
    console.log("카드 함수 호출");
    handleDialog(true);
    handleData(data);
  };

  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;

