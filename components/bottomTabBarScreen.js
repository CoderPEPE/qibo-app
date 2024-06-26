import React, { useState, useCallback } from "react";
import { BackHandler, View, Image, Text, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import ExploreScreen from "../screens/explore/exploreScreen";
import SettingsScreen from "../screens/settings/settingsScreen";
import IngredientScreen from "../screens/explore/ingredients";
import RecipeScreen from "../screens/explore/recipes";
import RecipeResult from "../screens/explore/reciperesult";
import ProfileScreen from "../screens/profile/profile";
import LessonScreen from "../screens/explore/lessonScreen";
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const BottomTabBarScreen = ({ route, navigation }) => {
    
    let pageView = '';
    if (route.params && route.params.pageView) {
      pageView = route.params.pageView;
    }
  
 
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
        currentIndex: 1,
        pauseSong: true,
        backClickCount: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        currentIndex,
        pauseSong,
        backClickCount,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                {currentIndex == 1 ?
                    <>
                    {pageView == 'main' ?
                        <ExploreScreen navigation={navigation} />
                        :
                        <>{pageView == 'ingredients' ?
                            <IngredientScreen navigation={navigation} />
                            :
                            <>{pageView == 'recipes' ?
                                <RecipeScreen navigation={navigation} />
                                :
                                <>{pageView == 'reciperesult' ?
                                    <RecipeResult navigation={navigation} />
                                    :
                                    <>{pageView == 'lessonPage' ?
                                        <LessonScreen navigation={navigation} />
                                        :
                                        <></>
                                    }</>
                                }</>
                            }</>
                        }</>
                    }
                    </>
                    :
                    currentIndex == 2 ?
                        <ProfileScreen navigation={navigation} />
                        :
                        currentIndex == 3 ?
                            <ProfileScreen navigation={navigation} />
                            :
                            <SettingsScreen navigation={navigation} />
                }
                {/* {currentlyPlayedSong()} */}
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        icon: 'home'
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        icon: 'message-square'
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        icon: 'user'
                    })}
                    {/* {bottomTabBarItem({
                        index: 4,
                        icon: 'settings'
                    })} */}
                </View>
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

    function bottomTabBarItem({ index, icon }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ alignItems: 'center' }}
                onPress={() => updateState({ currentIndex: index })}
            >
                {
                    index == currentIndex ?
                        <View style={styles.selectorContainer}>
                            <View style={styles.tagRect}></View>
                            <Feather
                                color={Colors.pinkColor}
                                size={Sizes.fixPadding * 2.6}
                                style={{ alignSelf: 'center' }}
                                name={icon}
                            />
                        </View>
                        :
                        <Feather
                            color={Colors.grayColor}
                            size={Sizes.fixPadding * 2.6}
                            style={{ alignSelf: 'center' }}
                            name={icon}
                        />
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: Sizes.fixPadding * 2.0,
        left: 0.0,
        right: 0.0,

        height: Sizes.fixPadding * 6.6,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
        paddingHorizontal: Sizes.fixPadding * 6.2,
        marginHorizontal: Sizes.fixPadding * 2.5,
        borderRadius: Sizes.fixPadding * 9.0,

        elevation: 2.0
    },
    forwardBackwardButtonWrapStyle: {
        width: 35.0,
        backgroundColor: Colors.whiteColor,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: "#DFDFDF",
        borderWidth: 0.50,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pausePlayButtonWrapStyle: {
        width: 45.0,
        height: 45.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: 22.5,
        borderColor: "#DFDFDF",
        borderWidth: 0.50,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
    },
    currentlyPlayedSongInfoWrapStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        bottom: 60.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.5,
        shadowColor: Colors.greenColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
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
    selectorContainer: {
        position: 'relative',
    },
    tagRect: {
        position: 'absolute',
        top: -Sizes.fixPadding * 2,
        left: '50%',
        transform: [{ translateX: -Sizes.fixPadding * 0.6 }],
        width: Sizes.fixPadding * 1.2,
        height: Sizes.fixPadding * 0.7,
        borderBottomLeftRadius: Sizes.fixPadding * 0.7,
        borderBottomRightRadius: Sizes.fixPadding * 0.7,
        backgroundColor: Colors.pinkColor,
    }
})

export default BottomTabBarScreen;


