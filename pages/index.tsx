import { useAddress, useUser, useLogin } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ImageDisplay from '../components/ImageDisplay';
import SignIn from "../components/SignIn";
import styles from "../styles/Home.module.css";
import {
  Flex,
  Icon,
  Button } from '@chakra-ui/react'
import { FaTwitter, FaDiscord } from "react-icons/fa";

const Home: NextPage = () => {
  const address = useAddress();
  const { data: session } = useSession();
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signFirstClicked, setSignFirstClicked] = useState(false); // State to track "Sign First!" button click
  const login = useLogin();

  const handleSignFirstClick = async () => {
    await login.login();
    setSignFirstClicked(true); // Update state to indicate "Sign First!" button clicked
  };

  const requestGrantRole = async () => {
    if (!signFirstClicked) {
      return; // If "Sign First!" button hasn't been clicked, do nothing
    }
    try {
      setLoading(true);
      const response = await fetch("/api/grant-role", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      setMessage(data.message || data.error);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container} style={{ marginTop: 0 }}>
        <br/>
        <br/>
        <ImageDisplay src="./onchainbasedhunks.gif" alt="Your Image" />
        <SignIn />

        {address && isLoggedIn && session && (
          <div className={styles.collectionContainer}>
            <br/>
            <br/>
            <br/>
            <Button
              onClick={handleSignFirstClick} // Call function to handle "Sign First!" button click
            >
              Sign First!
            </Button>
            <br/>
            <br/>
            <Button
              onClick={requestGrantRole}
              disabled={!signFirstClicked || loading} // Disable button if "Sign First!" not clicked or loading
            >
              {loading ? "Loading..." : "Verify Hunks"}
            </Button>
          </div>
        )}
        <br/>
        <br/>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Home;
