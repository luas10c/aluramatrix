import styles from '../styles/components/TextInput.module.scss';

import Loading from './Loading';

type TextInputProps = {
  loading: boolean;
  action: any;
}

type Props = TextInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function TextInput({ type, loading, action, ...props }: Props) {
  const Element = action;
  return (
    <div className={styles.container}>
      <input type={type} className={styles['text-input']} {...props } />
      { loading && <Loading /> }
      { !loading && action && <Element />}
    </div>
  )
}