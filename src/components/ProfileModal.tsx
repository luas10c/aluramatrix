import styles from '../styles/components/ProfileModal.module.scss';

export default function ProfileModal({ opened }) {
  return opened ? (
    <div className={styles.container}>
      <h2>Profile Modal</h2>
    </div>
  ) : null;
}