import React from "react";
import { SafeAreaView, View, Dimensions, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import userInfoAtom from "../../store/userInfo";
import { useAtom } from "jotai";

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {

    const [userInfo, setUserInfo] = useAtom(userInfoAtom)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
            {bottomImage()}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
                >
                    <View style={styles.topContainer}>
                        {header()}
                    </View>

                    {learningInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={styles.profileContainer}>
                    <Image src={userInfo.userCredential._tokenResponse.photoUrl} style={styles.profilePhoto}/>
                </View>
                <View style={styles.helloContainer}>
                    <Text style={{ ...Fonts.blackColor24Medium}}>Good Morning,</Text>
                    <Text style={{marginTop: -5, ...Fonts.blackColor24Bold}}>{userInfo.userCredential._tokenResponse.displayName}!</Text>
                </View>
                <View style={styles.boltContainer}>
                    <MaterialIcons
                        name='bolt'
                        size={35}
                        color={Colors.blackColor}
                    />
                    <Text style={styles.notifyNumber}>11</Text>
                </View>
            </View>
        )
    }

    function learningInfo() {

        return (
            <View>
                <View style={styles.titleWrapStyle}>
                    <Text style={styles.titleStyle}>
                        Subscription
                    </Text>
                </View>
                <ImageBackground
                    source={require('../../assets/images/learning-back.png')}
                    style={styles.learningTab}
                    resizeMode="stretch"
                    borderRadius={Sizes.fixPadding * 2.0}
                >
                    <View style={styles.learningContainer}>
                        <Text style={{...Fonts.pinkColor18Bold,}}>Token remain: </Text>
                        <Text style={{...Fonts.pinkColor18Bold,}}>10/</Text>
                        <Text style={{...Fonts.pinkColor18Bold,}}>15</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.greenContainer}
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Subscribe')}
                    >
                        <Text style={{ marginRight: Sizes.fixPadding , ...Fonts.whitecolor16Bold, }}>
                            Subscribe
                        </Text>
                        <AntDesign
                            name="arrowright"
                            color={Colors.whiteColor}
                            style={{marginTop: 2}}
                            size={20}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
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
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 1.0,
    },
    titleStyle: {
        marginTop: Sizes.fixPadding * 1.5,
        marginBottom: Sizes.fixPadding - 1.0,
        ...Fonts.blackColor23ExtraBold
    },
    titleWrapStyle: {
        marginRight: Sizes.fixPadding + 5.0,
        marginLeft: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profilePhoto: {
        width: 43,
        height: 43,       
    },
    profileContainer: {
        borderColor: Colors.pinkColor,
        borderWidth: 3,
        borderRadius: 23,
        overflow: 'hidden',
    },
    helloContainer: {
        marginTop: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding * 1.5,
    },
    boltContainer: {
        marginLeft: 'auto',        
        position: 'relative',
    },
    notifyNumber: {
        position: 'absolute',
        top: -8,
        right: -2,
        ...Fonts.greenColor13ExtraBold
    },
    bodyStatusInfo: {
        marginTop: 10,
        height: 140.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    qiContainer: {
        marginLeft: Sizes.fixPadding * 5.0,
        marginBottom: Sizes.fixPadding * 1.5
    },
    topContainer: {
        paddingBottom: Sizes.fixPadding * 1.1,
        marginBottom: Sizes.fixPadding * 2.8,
        backgroundColor: 'white',
        shadowColor: '#0005',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        borderRadius: Sizes.fixPadding * 3.2,
    },
    learningTab: {
        marginLeft: Sizes.fixPadding * 1.3,
        marginRight: Sizes.fixPadding * 1.3,
        height: 140.0,
        paddingLeft: Sizes.fixPadding * 2.8,
        paddingTop: Sizes.fixPadding * 2.5,
    },
    learningContainer: {
        flexDirection: 'row',
    },
    greenContainer: {
        borderRadius: 20,
        backgroundColor: Colors.greenColor,
        marginTop: Sizes.fixPadding * 4.0,
        height: Sizes.fixPadding * 2.6,
        width: Sizes.fixPadding * 11.7,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tilesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 1.6 ,
        marginVertical: Sizes.fixPadding * 0.5,
    },
    itemBox: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        marginHorizontal: 8,
        borderRadius: Sizes.fixPadding * 1.5,
        height: 100,

        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',

        shadowColor: '#0009',
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowRadius: 50,
        shadowOpacity: 0.5,
        elevation: 8,

    },
    tileBackground: {
        position: 'absolute',
        bottom: -Sizes.fixPadding * 0.2,
        right: 0,
        width: Sizes.fixPadding * 12.4,
        height: Sizes.fixPadding * 6.4,
        resizeMode: 'contain', // Preserve the aspect ratio
    },
    lockedContainer: {
        position: 'absolute',
        top: Sizes.fixPadding * 1.5,
        left: Sizes.fixPadding * 1.8,
    },
    countContainer: {
        marginTop: Sizes.fixPadding * 0.9,
        borderRadius: 20,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.greenColor,
        height: Sizes.fixPadding * 2.4,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        textAlign: 'center',
        ...Fonts.whitecolor16Bold,
    },
})

export default ProfileScreen;
