import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";

const { height: screenHeight } = Dimensions.get('window');

const RecipeResult = ({ navigation }) => {

    const [userInfo, setUserInfo] = useAtom(userInfoAtom)

    const [state, setState] = useState({
        currentScreen: 0,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data}));

    const{
        currentScreen,
    } = state;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>            

                    <View style={styles.topContainer}>
                        {header()}
                    </View>
                    <View style={styles.descriptionContainer}>
                        <ScrollView style={styles.descriptionScrollContent}>
                            <Text style={styles.descriptionContent}>
                            Refreshing and Tonifying Salad with Herbal Dressing{'\n\n'}
                            Note: This recipe is inspired by the provided ingredients to create a dish that reflects the principles of balance and well-being in Chinese medicine. It does not directly contain the three mentioned ingredients, given their unconventional nature as foods.{'\n\n'}

                            <Text style={styles.boldText}>Ingredients:{'\n'}</Text>
                            {'\u2022 '}1 cup of fresh spinach or a mix of green leaves{'\n'}
                            {'\u2022 '}1/2 cup of soybean sprouts{'\n'}
                            {'\u2022 '}1 carrot, julienned{'\n'}
                            {'\u2022 '}1/2 cucumber, julienned{'\n'}
                            {'\u2022 '}1/4 cup of nuts, chopped for nourishment and energy{'\n'}
                            {'\u2022 '}Sesame seeds for garnish{'\n\n'}

                            <Text style={styles.boldText}>For the Herbal Dressing:{'\n'}</Text>
                            {'\u2022 '}2 tablespoons of sesame oil{'\n'}
                            {'\u2022 '}1 tablespoon of rice vinegar{'\n'}
                            {'\u2022 '}1 teaspoon of honey{'\n'}
                            {'\u2022 '}1 small piece of fresh ginger, grated{'\n'}
                            {'\u2022 '}A pinch of sea salt{'\n'}
                            {'\u2022 '}Optional: a drop of artemisia (Ai Ye) essential oil, ensuring it's food-grade{'\n\n'}

                            <Text style={styles.boldText}>Preparation:{'\n'}</Text>
                            1. Prepare the salad: In a large bowl, combine spinach, soybean sprouts, carrot, cucumber, and nuts.{'\n'}
                            2. Make the dressing: In a small bowl, mix sesame oil, rice vinegar, honey, grated ginger, and sea salt. If available and safe for culinary use, add a drop of artemisia essential oil.{'\n'}
                            3. Combine: Pour the dressing over the salad and mix well to ensure the vegetables are fully coated.{'\n'}
                            4. Serve: Transfer the salad onto plates and garnish with sesame seeds.
                            </Text>
                        </ScrollView>
                    </View>
            
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Entypo name="chevron-thin-left" size={22} style={{marginLeft: -5, marginRight: 20}} color="black" onPress={() => {currentScreen != 0 ? updateState({currentScreen : 0}) : navigation.push('BottomTabBar', {pageView : 'main'})}}/>
                <View style={styles.profileContainer}>
                    <Image src={userInfo.userCredential._tokenResponse.photoUrl} style={styles.profilePhoto}/>
                </View>
                <View style={styles.helloContainer}>
                    <Text style={{marginTop: -15, ...Fonts.blackColor24ExtraBold}}>Recipes</Text>
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
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 1.0,
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
    topContainer: {
        paddingBottom: Sizes.fixPadding * 2.8,
        marginTop: Sizes.fixPadding * 1.2,
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
    descriptionContainer: {
        flex: 1,
        backgroundColor: '#FEABA044',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 10,

        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 3.0,
    },
    descriptionContent: {
        lineHeight: Sizes.fixPadding * 1.7,
        textAlign: 'justify',
        ...Fonts.blackColor13Medium
    },
    boldText: {
        ...Fonts.blackColor15Bold
    },
    descriptionScrollContent: {
        flex: 1,
        overflow: 'scroll',
    }
})

export default RecipeResult;
