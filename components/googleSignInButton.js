import { useState, React, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase/config";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Sizes } from "../constants/styles";
import { useAtom } from "jotai";
import userInfoAtom from "../store/userInfo";
import { addUser } from "../db/users";

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
      const userCredential = await signInWithCredential(
        FIREBASE_AUTH,
        credential
      );
      console.log("Sign In With Google Success", userCredential.user);
      
      // Check if user exists in Firestore
      const usersCollection = collection(FIREBASE_DB, "users");
      const q = query(usersCollection, where("email", "==", userCredential.user.email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await addUser(userCredential.user.uid, userCredential.user.email, "google");
        console.log("User added to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }

      setUserInfo({ auth: true, userCredential });
      onSignInSuccess(userCredential);
    } catch (error) {
      console.error("Sign In With Google Error", error);
      onSignInError(error);
    }
  };

  return (
    <View style={style} >
      <TouchableOpacity onPress={signInWithGoogle}>
        <Image
          source={require("../assets/images/google-sign.png")}
          resizeMode="stretch"
          style={{
            backgroundColor: "white",
            borderRadius: 22,
            marginTop: Sizes.fixPadding * 2.5,
            height: Sizes.fixPadding * 4.3,
            width: Sizes.fixPadding * 18.7
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInButton;
