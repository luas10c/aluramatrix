import useAuthentication from '../hooks/useAuthentication';
import useMessage from '../hooks/useMessage';
import styles from '../styles/components/EmojiModal.module.scss';

const emojis = [
  {
    title: 'Caras e pessoas',
    items: [
      {
        name: ':grinning;',
        title: 'Rosto mostrando os dentes',
        emoji: '😀',
        description: 'Rosto mostrando os dentes Grinning face',
      },
      {
        name: ':smiling;',
        title: 'Rosto sorridente com olhos de coração',
        emoji: '😍',
        description: 'Rosto sorridente com olhos de coração Smiling face with heart-shaped eyes'
      },
      {
        name: ':smiling;',
        title: 'Cara sorridente com 3 corações',
        emoji: '🥰',
        description: 'Cara sorridente com 3 corações Smiling face with 3 hearts',
      },
      {
        name: ':throwing;',
        title: 'Rosto jogando beijo',
        emoji: '😘',
        description: 'Rosto jogando beijo Face throwing a kiss',
      },
      {
        name: ':clapping;',
        title: 'Sinal de bater palmas',
        emoji: '👏',
        description: 'Sinal de bater palmas Clapping hands sign'
      },
      {
        name: ':heartbrown;',
        title: 'Coração marrom Brown heart',
        emoji: '🤎',
        description: 'Coração marrom'
      },
      {
        name: ':heartbroken;',
        title: 'Coração partido',
        emoji: '💔',
        description: 'Coração partido Broken heart',
      }
    ]
  }
]

export default function EmojiModal({ opened }) {
  const { handleSendMessage, setEmoji } = useMessage();
  const { profile } = useAuthentication();


  return opened ? (
    <div className={styles.container}>
      {emojis.map((category) => (
        <div key={category.title}>
          {category.items.map((item) => <button style={{ fontSize: 18 }} onClick={() => setEmoji(item.emoji)} key={item.emoji}>{item.emoji}</button>)}
        </div>
      ))}
    </div>
  ) : null;
}