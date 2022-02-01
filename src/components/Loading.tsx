import styles from '../styles/components/Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  )
}