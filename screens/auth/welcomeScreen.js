import React, { useState, useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        showPassword: false,
        userName: null,
        password: null,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        backClickCount,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.greenColor} />
                {bottomImage()}
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {logoImage()}
                        <ScrollView
                            scrollEnabled={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                padding: 5
                            }}
                        >
                        {welcomeInfo()}
                        </ScrollView>
                    </ScrollView>
                </View> 
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function bottomImage() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/Shape.png')} style={styles.backImage}/>
            </View>
        )
    }

    function welcomeInfo() {
        return (
            <View>
                <View style={styles.mainView}>
                    <Text style={styles.welcomeWord}>
                        Welcome to Qibo
                    </Text>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor14Medium, }}>
                        Enter the world of Chinese medicine
                    </Text>
                </View>
                {loginButton()}
                {registerButton()}
                {orIndicator()}
                {socialMediaOptions()}
                {dontHaveAccountInfo()}
            </View>
        )
    }

    function dontHaveAccountInfo() {
        return (
            <View style={{
                marginVertical: Sizes.fixPadding,
                alignItems: 'center',
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.whiteColor16Medium }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        style={{ flex: 0.3 }}
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Signup')}
                    >
                        <Text style={{ ...Fonts.whiteColor15Bold, }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    function socialMediaOptions() {
        return (
            <View style={styles.socialMediaIconsWrapStyle}>
                <View style={{
                    ...styles.socialMediaIconsStyle,
                    marginHorizontal: Sizes.fixPadding ,
                }}>
                    <Image
                        source={require('../../assets/images/google-sign.png')}
                        resizeMode="stretch"
                        style={{backgroundColor: 'white',borderRadius: 22, marginTop: Sizes.fixPadding * 3.2 ,height: Sizes.fixPadding * 4.3, width: Sizes.fixPadding * 18.7 }}
                    />
                </View>

            </View>
        )
    }

    function orIndicator() {
        return (
            <View style={styles.orWrapStyle}>
                <View
                    style={{ flex: 1, backgroundColor: '#E5E7EB', height: 1.5, }}
                />
                <Text style={{
                    marginHorizontal: Sizes.fixPadding,
                    ...Fonts.darkColor14Light
                }}>
                    Sign in with
                </Text>
                <View
                    style={{ flex: 1, backgroundColor: '#E5E7EB', height: 1.5, }}
                />
            </View>
        )
    }

    function loginButton() {
        return (
            <TouchableOpacity
                style={styles.loginButtonStyle}
                activeOpacity={0.9}
                onPress={() => navigation.push('Signin')}
            >
                <Text style={{ ...Fonts.textWhiteColor15SemiBold }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    function registerButton() {
        return (
            <TouchableOpacity
                style={styles.registerButtonStyle}
                activeOpacity={0.9}
                onPress={() => navigation.push('Signup')}
            >  
                <Text style={{ ...Fonts.textGreenColor15SemiBold }}>
                    Register
                </Text>
            </TouchableOpacity>
        )
    }

    function logoImage() {
        return (
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: 260,
                        height: 71,
                        opacity: 100,
                    }}
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },

    orWrapStyle: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding * 2.8,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },

    socialMediaIconsStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 22.0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    socialMediaIconsWrapStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.5,
    },

    loginButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 45.0,
        borderColor: Colors.greenColor,
        borderWidth: 1.0,
        height: Sizes.fixPadding * 5.6,
        backgroundColor: Colors.greenColor,
    },

    registerButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 45.0,
        borderColor: Colors.greenColor,
        borderWidth: 1.0,
        height: Sizes.fixPadding * 5.6,
        backgroundColor: Colors.whiteColor,
    },

    mainView: {
        padding: Sizes.fixPadding * 1.0,
        marginTop: 170,
    },

    welcomeWord: {
       textAlign: 'center',
       paddingBottom: Sizes.fixPadding * 1,
       ...Fonts.blackColor24Bold,
    },

    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },

    backImage: {
        width: '100%',
        height: 280,
    },

    logoContainer: {
        position: 'absolute',
        top: 120, // Adjust the top value to add padding-top
        left: '50%',
        transform: [{ translateX: -130 }],
        alignItems: 'center',
    }
})

export default WelcomeScreen;