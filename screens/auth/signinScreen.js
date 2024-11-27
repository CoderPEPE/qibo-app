import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleSignInButton from "../../components/googleSignInButton";
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";

const SigninScreen = ({ navigation }) => {
  const [state, setState] = useState({
    showPassword: true,
    showConfirmation: true,
    fullName: null,
    phoneNumber: null,
    emailAddress: null,
    password: null,
    confirmation: null,
    emailError: false,
    passwordError: false,
    emailErrorMessage: "",
    passwordErrorMessage: ""
  });

  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const updateState = data => setState(state => ({ ...state, ...data }));

  const {
    showPassword,
    showConfirmation,
    fullName,
    phoneNumber,
    emailAddress,
    password,
    confirmation,
    emailError,
    passwordError,
    emailErrorMessage,
    passwordErrorMessage
  } = state;

  useEffect(
    () => {
      if (userInfo.auth) navigation.push("BottomTabBar", { pageView: "main" });
    },
    [userInfo]
  );

  const signInWithPassword = () => {
    setState({
      ...state,
      emailError: false,
      passwordError: false,
      emailErrorMessage: "",
      passwordErrorMessage: ""
    });
    signInWithEmailAndPassword(FIREBASE_AUTH, emailAddress, password)
      .then(userCredential => {
        console.log("User ID: ", userCredential.user.uid);
        const updatedUserCredential = userCredential;
        updatedUserCredential.user.displayName = updatedUserCredential.user.email.split("@")[0].charAt(0).toUpperCase() + updatedUserCredential.user.email.split("@")[0].slice(1);
        updatedUserCredential.user.photoURL = "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp";
        setUserInfo({ auth: true, userCredential: updatedUserCredential });
        console.log("Sign In Success", updatedUserCredential);
      })
      .catch(error => {
        setUserInfo({ auth: false, userCredential: {} });
        console.log("Sign In Error", error);
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Error", "This email is not registered.");
        }
        if (error.code === "auth/missing-email") {
          Alert.alert("Warning", "Please insert email and password")
        }
        setState({
          ...state,
          emailError:
            error.code === "auth/invalid-email" ||
            error.code === "auth/user-not-found",
          passwordError: error.code === "auth/invalid-credential",
          emailErrorMessage: getEmailErrorMessage(error.code),
          passwordErrorMessage: getPasswordErrorMessage(error.code)
        });
      });
  };

  const getEmailErrorMessage = errorCode => {
    if (errorCode === "auth/invalid-email") {
      return "The email address is not valid.";
    } else if (errorCode === "auth/user-not-found") {
      return "No user found with this email.";
    }
    return "";
  };

  const getPasswordErrorMessage = errorCode => {
    if (errorCode === "auth/invalid-credential") {
      return "Incorrect password.";
    }
    return "";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      {bottomImage()}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {signupInfo()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function signupInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding * 4 }}>
        <View style={styles.mainView}>
          <Text style={styles.registerWord}>
            Hello! Welcome back to {"\n"} Qibo
          </Text>
        </View>
        {emailAddressTextField()}
        {passwordTextField()}
        {signInButton()}
        {socialMediaOptions()}
      </View>
    );
  }

  function emailAddressTextField() {
    return (
      <View
        style={[styles.textFieldWrapStyle, emailError && styles.inputError]}
      >
        <TextInput
          value={emailAddress}
          onChangeText={text => updateState({ emailAddress: text })}
          placeholder="Email:"
          placeholderTextColor={Colors.blackColor14Bold}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold
          }}
        />
        {emailError &&
          <Text style={styles.errorMessage}>
            {emailErrorMessage}
          </Text>}
      </View>
    );
  }

  function passwordTextField() {
    return (
      <View
        style={[
          styles.passwordTextFieldWrapstyle,
          passwordError && styles.inputError
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TextInput
            value={password}
            onChangeText={text => updateState({ password: text })}
            secureTextEntry={showPassword}
            placeholder="Password:"
            placeholderTextColor={Colors.blackColor14Bold}
            style={{
              flex: 1,
              ...Fonts.blackColor14Bold,
              marginLeft: Sizes.fixPadding
            }}
          />
        </View>
        <MaterialCommunityIcons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          color={Colors.pinkColor}
          size={20}
          onPress={() => updateState({ showPassword: !showPassword })}
        />
        {passwordError &&
          <Text style={styles.errorMessage}>
            {passwordErrorMessage}
          </Text>}
      </View>
    );
  }

  function socialMediaOptions() {
    return (
      <GoogleSignInButton
        style={styles.socialMediaIconsWrapStyle}
        onSignInError={() => {}}
        onSignInSuccess={async userCredential => {
          try {
            setUserInfo({ auth: true, userCredential });
          } catch (error) {
            console.error("Error in sign in process:", error);
          }
        }}
      />
    );
  }

  function signInButton() {
    return (
      <TouchableOpacity
        style={styles.registerButtonStyle}
        activeOpacity={0.9}
        onPress={() => signInWithPassword()}
      >
        <Text style={{ ...Fonts.textWhiteColor15SemiBold }}>Login</Text>
      </TouchableOpacity>
    );
  }

  function bottomImage() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Shape.png")}
          style={styles.backImage}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: Sizes.fixPadding * 2.8,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginBottom: Sizes.fixPadding + 10.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0
  },
  passwordTextFieldWrapstyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: Sizes.fixPadding * 2.8,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginBottom: Sizes.fixPadding + 10.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0
  },

  inputError: {
    borderColor: "red", // Apply red border when there's an error
    borderWidth: 1
  },

  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: Sizes.fixPadding * 2.0
  },

  socialMediaIconsStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 22.0,
    alignItems: "center",
    justifyContent: "center"
  },

  socialMediaIconsWrapStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding * 2.5
  },

  mainView: {
    padding: Sizes.fixPadding * 1.0,
    marginTop: 40,
    marginBottom: 40
  },

  registerWord: {
    textAlign: "center",
    paddingBottom: Sizes.fixPadding * 1,
    ...Fonts.blackColor24Bold
  },

  registerButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding + 45.0,
    borderColor: Colors.greenColor,
    borderWidth: 1.0,
    height: Sizes.fixPadding * 5.6,
    backgroundColor: Colors.greenColor
  },

  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center"
  },

  backImage: {
    width: "100%",
    height: 280
  }
});

export default SigninScreen;
