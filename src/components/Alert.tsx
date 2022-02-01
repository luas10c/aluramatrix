import styles from '../styles/components/Alert.module.scss';

export default function Alert({ type, content }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.alert}${type === 'danger' ? ` ${styles.danger}` : ''}`}>
        {content}
      </div>
    </div>
  )
}