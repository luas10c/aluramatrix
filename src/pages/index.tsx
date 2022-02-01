import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Messages from '../components/Messages';
import Online from '../components/Online';
import Profile from '../components/Profile';

import useAuthentication from '../hooks/useAuthentication';

import styles from '../styles/pages/Home.module.scss';
import MessageForm from '../components/MessageForm';

export default function Home() {
  const [message, setMessage] = useState('');
  const { loadingAuthentication, authenticated, loadingProfile, profile } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuthentication && !authenticated && !loadingProfile && !profile) {
      router.push('/authenticate');
    }
  }, [router, loadingAuthentication, authenticated, loadingProfile, profile]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Messages</title>
      </Head>
      <>
{/*         <Profile /> */}
        <Messages />
{/*         <Online /> */}
        <MessageForm />
      </>
    </div>
  )
}