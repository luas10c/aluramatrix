import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

import styles from '../styles/components/Avatar.module.scss';

export default function Avatar({ loading, avatar_url, width = 48, height = 48 }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function fecthAvatarProfile() {
      try {
        const { data } = await axios.get(avatar_url, { responseType: 'blob' });
        const url = URL.createObjectURL(data);
        setAvatar(url);
      } catch (error) {
        console.log('error', error);
      }
    }

    if (avatar_url)
      fecthAvatarProfile();
  }, [avatar_url]);

  return (
    <div className={styles.container}>
      { !loading && avatar &&
        <Image
          src={avatar}
          className={styles.avatar}
          width={width}
          height={height}
          alt="#"
        />
      }
      { !loading && !avatar &&
        <Image
          src="/avatar.png"
          className={styles.avatar}
          width={width}
          height={height}
          alt="#"
        />
      }
    </div>
  )
}