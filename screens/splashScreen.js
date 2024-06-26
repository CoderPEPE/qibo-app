import React from "react";
import { SafeAreaView, View, Text, StatusBar, Image, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('Welcome');
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ marginTop: Sizes.fixPadding - 60.0 }}>
                        <Text style={{ ...Fonts.whiteColor35Bold }}>
                            Qibo
                        </Text>
                        <Text style={{ ...Fonts.whiteColor15Bold }}>
                            {` `}is starting
                        </Text>
                    </Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;