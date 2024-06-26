import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Montserrat_Light: require("../assets/fonts/Montserrat-Light.ttf"),
                Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
                Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
                Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
                Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
                Nunito_Light: require("../assets/fonts/Nunito-Light.ttf"),
                Nunito_Regular: require("../assets/fonts/Nunito-Regular.ttf"),
                Nunito_Medium: require("../assets/fonts/Nunito-Medium.ttf"),
                Nunito_SemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
                Nunito_Bold: require("../assets/fonts/Nunito-Bold.ttf"),
                Nunito_ExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
                Urbanist_Light: require("../assets/fonts/Urbanist-Light.ttf"),
                Urbanist_Regular: require("../assets/fonts/Urbanist-Regular.ttf"),
                Urbanist_Medium: require("../assets/fonts/Urbanist-Medium.ttf"),
                Urbanist_SemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
                Urbanist_Bold: require("../assets/fonts/Urbanist-Bold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;

