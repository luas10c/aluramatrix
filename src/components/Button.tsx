import styles from '../styles/components/Button.module.scss';
import Loading from './Loading';

export default function Button({ type, element: Children, loading, ...props }) {
  return (
    <div className={styles.container}>
      <button type={type} className={styles.btn} {...props}>
        { loading ? <Loading /> : <Children />}
      </button>
    </div>
  );
}