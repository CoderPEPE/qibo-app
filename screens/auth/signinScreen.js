import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, TextInput, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const SigninScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showPassword: true,
        showConfirmation: true,
        fullName: null,
        phoneNumber: null,
        emailAddress: null,
        password: null,
        confirmation: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showPassword,
        showConfirmation,
        fullName,
        phoneNumber,
        emailAddress,
        password,
        confirmation,
    } = state;

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
                        contentContainerStyle={{ flexGrow: 1, }}
                    >
                        {signupInfo()}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function signupInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4, }}>
                <View style={styles.mainView}>
                    <Text style={styles.registerWord}>
                        Hello! Welcome back to {'\n'} Qibo
                    </Text>
                </View>
                {emailAddressTextField()}
                {passwordTextField()}
                {signupButton()}
                {socialMediaOptions()}
            </View>
        )
    }

    function emailAddressTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={emailAddress}
                    onChangeText={(text) => updateState({ emailAddress: text })}
                    placeholder="Email:"
                    placeholderTextColor={Colors.blackColor14Bold}
                    style={{
                        marginLeft: Sizes.fixPadding,
                        flex: 1,
                        ...Fonts.blackColor14Bold
                    }}
                />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.passwordTextFieldWrapstyle}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <TextInput
                        value={password}
                        onChangeText={(text) => updateState({ password: text })}
                        secureTextEntry={showPassword}
                        placeholder='Password:'
                        placeholderTextColor={Colors.blackColor14Bold}
                        style={{ 
                            flex: 1,
                            ...Fonts.blackColor14Bold,
                            marginLeft: Sizes.fixPadding,
                        }}
                    />

                </View>
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-outline' : "eye-off-outline"}
                    color={Colors.pinkColor}
                    size={20}
                    onPress={() => updateState({ showPassword: !showPassword })}
                />
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
                        style={{ marginTop: Sizes.fixPadding * 3.2 ,height: Sizes.fixPadding * 4.3, width: Sizes.fixPadding * 18.7 }}
                    />
                </View>

            </View>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                style={styles.registerButtonStyle}
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar', {pageView : 'main'})}
            >
                <Text style={{ ...Fonts.textWhiteColor15SemiBold }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    function bottomImage() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/Shape.png')} style={styles.backImage}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: Sizes.fixPadding * 2.8,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginBottom: Sizes.fixPadding + 10.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0, 
    },
    passwordTextFieldWrapstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: Sizes.fixPadding * 2.8,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginBottom: Sizes.fixPadding + 10.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
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
        marginTop: Sizes.fixPadding * 2.2,
    },

    mainView: {
        padding: Sizes.fixPadding * 1.0,
        marginTop: 40,
        marginBottom: 40,
    },

    registerWord: {
       textAlign: 'center',
       paddingBottom: Sizes.fixPadding * 1,
       ...Fonts.blackColor24Bold,
    },

    registerButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 45.0,
        borderColor: Colors.greenColor,
        borderWidth: 1.0,
        height: Sizes.fixPadding * 5.6,
        backgroundColor: Colors.greenColor,
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

})

export default SigninScreen;