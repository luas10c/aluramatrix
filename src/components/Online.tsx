import { useState } from 'react';

import Avatar from './Avatar';
import ProfileModal from './ProfileModal';
import Loading from './Loading';

import styles from '../styles/components/Online.module.scss';

export default function Online() {
  const [loading, setLoading] = useState(false);
  const [openedModalProfile, setOpenedModalProfile] = useState(false);

  function handleModalProfile() {
    setOpenedModalProfile((oldState) => !oldState);
  }

  return (
    <div className={styles.container}>
      <h3>Pessoas</h3>
      {loading && <Loading />}
      {!loading && <div className={styles.onlines}>
        <div className={styles['online']}>
          <Avatar loading={false} avatar_url={null} width={36} height={36} />
          <div>
            <h4>Unknown</h4>
            <button type="button" onClick={handleModalProfile}>Ver perfil</button>
          </div>
        </div>
      </div>
      }
      <ProfileModal opened={openedModalProfile} />
    </div>
  )
}