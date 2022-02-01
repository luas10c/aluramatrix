import { useState } from 'react';

import useMessage from '../hooks/useMessage';

import Sticker from './Sticker';

import styles from '../styles/components/StickerModal.module.scss';
import useAuthentication from '../hooks/useAuthentication';

const stickers = [
  '/stickers/Figurinha_1.png',
  '/stickers/Figurinha_2.png',
  '/stickers/Figurinha_3.png',
  '/stickers/Figurinha_4.png',
  '/stickers/Figurinha_5.png',
  '/stickers/Figurinha_6.png',
  '/stickers/Figurinha_7.png',
  '/stickers/Figurinha_8.png',
  '/stickers/Figurinha_9.png',
  '/stickers/Figurinha_10.png',
  '/stickers/Figurinha_11.png',
  '/stickers/Figurinha_12.png',
  '/stickers/Figurinha_13.png',
  '/stickers/Figurinha_14.png',
  '/stickers/Figurinha_15.png',
  '/stickers/Figurinha_16.png',
  '/stickers/Figurinha_17.png',
  '/stickers/Figurinha_18.png',
  '/stickers/Figurinha_19.png',
  '/stickers/Figurinha_20.png',
  '/stickers/Figurinha_21.png',
  '/stickers/Figurinha_22.png',
  '/stickers/Figurinha_23.png',
  '/stickers/Figurinha_24.png',
  '/stickers/Figurinha_25.png',
  '/stickers/Figurinha_26.png',
  '/stickers/Figurinha_27.png',
  '/stickers/Figurinha_28.png',
  '/stickers/Figurinha_29.png',
  '/stickers/Figurinha_30.png',
]

export default function StickerModal({ opened }) {
  const { handleSendMessage } = useMessage();
  const { profile } = useAuthentication();

  return opened ? (
    <div className={styles.container}>
      <div className={styles.list}>
        {stickers.map((item) => {
          const message = { content: `:sticker:${item}`, user_id: profile.id }
          return (
            <div key={item} className={styles.item} onClick={() => handleSendMessage(message)}>
              <Sticker sticker_url={item} />
            </div>
          )
        })}
      </div>
    </div>
  ) : null;
}