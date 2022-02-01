import { useState } from 'react';
import { BiSticker } from 'react-icons/bi';
import { RiEmotionFill } from 'react-icons/ri';

import EmojiModal from './EmojiModal';
import StickerModal from './StickerModal';

import styles from '../styles/components/SentimentModal.module.scss';

export default function SentimentModal({ opened }) {
  const [openedEmojiModal, setOpenedEmojiModal] = useState(true);
  const [openedStickersModal, setOpenedStickersModal] = useState(false);

  function handleOpenEmojiModal() {
    if (openedStickersModal) {
      setOpenedStickersModal(false);
    }
    setOpenedEmojiModal(true);
  }

  function handleOpenStickersModal() {
    if (openedEmojiModal) {
      setOpenedEmojiModal(false);
    }
    setOpenedStickersModal(true);
  }

  return opened ? (
    <div className={styles.container}>
      <EmojiModal opened={openedEmojiModal} />
      <StickerModal opened={openedStickersModal} />
      <div className={styles.footer}>
        <ul>
          <li>
            <button type="button" onClick={handleOpenEmojiModal}>
              <RiEmotionFill size={24} color="#FFFFFF" />
            </button>
          </li>
          <li>
            <button type="button" onClick={handleOpenStickersModal}>
              <BiSticker size={24} color="#FFFFFF" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : null
}