import { useState, React, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import {
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import { FIREBASE_AUTH } from "../firebase/config";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { Sizes } from "../constants/styles";
import { useAtom } from "jotai";
import userInfoAtom from "../store/userInfo";

const GoogleSignInButton = ({ style, onSignInSuccess, onSignInError }) => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        "626611718509-j3mu06qketofrthiaf4gkbe3v0578ddc.apps.googleusercontent.com"
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const signInResult = await GoogleSignin.signIn();
      if (!signInResult.data.idToken) {
        throw new Error("Google Sign-In failed: No ID token returned.");
      }
      const credential = GoogleAuthProvider.credential(
        signInResult.data.idToken
      );
      const userCredential = await signInWithCredential(FIREBASE_AUTH, credential);
      console.log("Sign In With Google Success", userCredential.user);
      setUserInfo({ auth: true, userCredential });
      onSignInSuccess(userCredential);
    } catch (error) {
      console.error("Sign In With Google Error", error);
      onSignInError(error);
    }
  };

  return (
    <TouchableOpacity style={style} onPress={signInWithGoogle}>
      <Image
        source={require("../assets/images/google-sign.png")}
        resizeMode="stretch"
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          marginTop: Sizes.fixPadding * 3.2,
          height: Sizes.fixPadding * 4.3,
          width: Sizes.fixPadding * 18.7
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  buttonText: {
    fontSize: 16,
    color: "#000"
  }
});

export default GoogleSignInButton;
