import styles from './Card.module.css';

const Card = (props) => {
  return (
    <article className={`border rounded ${props.padding} ${styles.card}`}>
      {props.children}
    </article>
  );
};

Card.defaultProps = {
  padding: 'p-3',
};

export default Card;
