import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiSearchLine } from 'react-icons/ri';
import Head from 'next/head';

import useAuthentication from '../hooks/useAuthentication';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Loading from '../components/Loading';
import Tip from '../components/Tip';
import Alert from '../components/Alert';

import styles from '../styles/pages/Authenticate.module.scss';

export default function Home() {
  const [username, setUsername] = useState('');
  const { loadingAuthentication, authenticated, loadingProfile, profile, errors, handleUsernameSearch } = useAuthentication();
  const router = useRouter();

  function handleJoinChat() {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      {loadingAuthentication || loadingProfile && <Loading />}
      { !loadingAuthentication && !loadingProfile && !authenticated && (
        <>
          <Head>
            <title>Login</title>
          </Head>
          <div className={styles.welcome}>
            <div className={styles.greetings}>
              <h2>Boas vindas de volta!</h2>
              <p>Discord - Alura Matrix</p>
            </div>
            <div className={styles.authenticate}>
              <form onSubmit={(event) => event.preventDefault()}>
                <Tip content="Por favor, informe um usuário válido no github" />
                <TextInput
                  type="text"
                  name="username"
                  onChange={
                    (event) => 
                      setUsername(event.target.value.toLowerCase())
                  }
                  placeholder="exemple: luas10c"
                  autoComplete="off"
                  value={username}
                  loading={loadingAuthentication}
                  action={() => 
                    <button 
                      type="button"
                      className={styles.button}
                      onClick={() => handleUsernameSearch(username)}
                    >
                      <RiSearchLine color="#FFFFFF" size={18} />
                    </button>
                  }
                />
                
                { errors && errors.length > 0 && errors[errors.length - 1].status === 404 && (
                  <Alert type="danger" content={errors[errors.length - 1].message} />
                )}
              </form>
            </div>
          </div>
        </>
      )}
      { !loadingAuthentication && authenticated && !loadingProfile && profile && errors.length === 0 && (
        <>
          <Head>
            <title>{profile.name}</title>
          </Head>
          <div className={styles.profile}>
            <div className={styles.headline}>
              <div>
                <ul>
                  <li><span>Bem-vindo,</span> {profile.name}</li>
                  <li>{profile.location}</li>
                </ul>
              </div>
            </div>

            <div className={styles.avatar}>
              <Avatar loading={loadingAuthentication} avatar_url={profile.avatar_url} width={128} height={128} />
            </div>


            <Tip content="Você precisa clicar no botão para enviar mensagem e pressione enter para enviar a mensagem" />
            <Button
              type="button"
              element={() => <div>Entrar</div>}
              tabIndex={0}
              onClick={handleJoinChat}
              disabled={loadingAuthentication || !authenticated || !profile}
              loading={false}
            />
          </div>
        </>
      )}
    </div>
  )
}