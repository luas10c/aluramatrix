import styles from '../styles/components/Tip.module.scss';

export default function Tip({ content }) {
  return (
    <div className={styles.container}>
      <p className={styles.tip}>
        <span className={styles.label}>Dica:</span>
        {content}
      </p>
    </div>
  )
}