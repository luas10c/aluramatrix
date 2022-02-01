import { FiLogOut } from 'react-icons/fi'

import useAuthentication from '../hooks/useAuthentication';

import styles from '../styles/components/Profile.module.scss';

export default function Profile() {
  const { handleLogout } = useAuthentication();

  return (
    <div className={styles.container}>
      <button type="button" className={styles['button-logout']} onClick={handleLogout}>
        <FiLogOut size={18} color="#FFFFFF" />
        Deslogar
      </button>
    </div>
  )
}