import {
  ConnectWallet,
  useAddress,
  useLogin,
  useUser,
} from "@thirdweb-dev/react";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import styles from "../styles/Home.module.css";
import { Button } from '@chakra-ui/react'

export default function SignIn() {
  const address = useAddress();
  const { data: session } = useSession();
  const { isLoggedIn } = useUser();
  const login = useLogin();

  // 1. The user is signed into discord and connected to wallet.
  if (session && address) {
    return (
      <div className={styles.bigSpacerTop}>
        <a onClick={() => signOut()} className={styles.secondaryButton}>
          Sign out of Discord
        </a>
      </div>
    );
  }

  // 2. Connect Wallet
  if (!address) {
    return (
      <div className={styles.main}>
        <h2 className={styles.noGapBottom}>Connect your Wallet</h2>
        <p>When you connect your wallet, the bot gains access to verify your holdings of OnChain Based Hunks. <br /><br />This process is secure; you&apos;re simply authenticating on the DAPP to confirm ownership of the wallet.</p>
        <br/>
        <br/>
        <br/>
        <ConnectWallet theme="dark" />
      </div>
    );
  }

  // 3. sign message
  if (!isLoggedIn) {
    return (
      <div className={`${styles.main}`}>
        <h2 className={styles.noGapBottom}>Sign using your wallet</h2>
        <p>
          This proves that you really own the wallet that you&apos;ve claimed to
          be connected.
        </p>
        <br/>
        <br/>
        <br/>
        <Button
          onClick={async () => {
            await login.login();
          }}
        >
          Sign message!
        </Button>
      </div>
    );
  }

  // 4. Connect with Discord (OAuth)
  if (!session) {
    return (
      <div className={`${styles.main}`}>
        <h2 className={styles.noGapBottom}>Link your Discord Account</h2>
        <p>Please log in your Discord to connect it with your wallet!</p>
        <br/>
        <br/>
        <br/>
        <Button 
          onClick={() => signIn("discord")}
        >
          Link Discord
        </Button>
      </div>
    );
  }

  return null;
}
