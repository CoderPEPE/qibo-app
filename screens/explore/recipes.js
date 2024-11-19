import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";

const { width } = Dimensions.get('window');

const breakfastList = [
    {
        id: '1',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '2',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '3',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '4',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '5',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
];

const lunchList = [
    {
        id: '1',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '2',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
];

const dinnerList = [
    {
        id: '1',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '2',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
    {
        id: '3',
        text: 'Refreshing and Invigorating Salad with Herb Dressing'
    },
];
const RecipeScreen = ({ navigation }) => {

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
                >
                    <View style={styles.topContainer}>
                        {header()}
                    </View>
                    {listView()}
                </ScrollView>
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

    function listView() {
        return(
        <View>
            <View style={styles.mealContainer}>
            {currentScreen == 0 &&
                <>
                    <TouchableOpacity 
                        onPress={() => updateState({currentScreen: 1})}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/images/meal-back.png')}
                            style={styles.mealItem}
                            resizeMode="stretch"
                            borderRadius={Sizes.fixPadding * 2.0}
                        >
                            <View style={styles.mealDetails}>
                                <Text style={styles.mealTitle}>Breakfast</Text>
                                <Text style={styles.mealCount}>5</Text>
                                <Entypo name="chevron-thin-right" size={25} color="white" style={styles.mealRight}/>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => updateState({currentScreen: 2})}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/images/meal-back.png')}
                            style={styles.mealItem}
                            resizeMode="stretch"
                            borderRadius={Sizes.fixPadding * 2.0}
                        >
                            <View style={styles.mealDetails}>
                                <Text style={styles.mealTitle}>Lunch</Text>
                                <Text style={styles.mealCount}>2</Text>
                                <Entypo name="chevron-thin-right" size={25} color="white" style={styles.mealRight} />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => updateState({currentScreen: 3})}
                        activeOpacity={0.9}
                    >
                        <ImageBackground
                            source={require('../../assets/images/meal-back.png')}
                            style={styles.mealItem}
                            resizeMode="stretch"
                            borderRadius={Sizes.fixPadding * 2.0}
                        >
                            <View style={styles.mealDetails}>
                                <Text style={styles.mealTitle}>Dinner</Text>
                                <Text style={styles.mealCount}>3</Text>
                                <Entypo name="chevron-thin-right" size={25} color="white" style={styles.mealRight}/>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </>
            }
            {currentScreen == 1 &&
               <FlatList
                    data={breakfastList}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (                        
                        <TouchableOpacity
                            style={styles.foodItem}
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BottomTabBar', {pageView : 'reciperesult'})}
                        >
                            <View style={styles.foodId}><Text style={{...Fonts.WhiteColor34ExtraBold}}>{item.id}</Text></View>
                            <View style={styles.foodContainer}><Text style={{...Fonts.textGrayColor15SemiBold}}>{item.text}</Text></View>
                        </TouchableOpacity>
                    )}
                />
            }
            {currentScreen == 2 &&
               <FlatList
                    data={lunchList}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (                        
                        <TouchableOpacity
                            style={styles.foodItem}
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BottomTabBar', {pageView : 'reciperesult'})}
                        >
                            <View style={styles.foodId}><Text style={{...Fonts.WhiteColor34ExtraBold}}>{item.id}</Text></View>
                            <View style={styles.foodContainer}><Text style={{...Fonts.textGrayColor15SemiBold}}>{item.text}</Text></View>
                        </TouchableOpacity>
                    )}
                />
            }
            {currentScreen == 3 &&
               <FlatList
                    data={dinnerList}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (                        
                        <TouchableOpacity
                            style={styles.foodItem}
                            activeOpacity={0.9}
                            onPress={() => navigation.push('BottomTabBar', {pageView : 'reciperesult'})}
                        >
                            <View style={styles.foodId}><Text style={{...Fonts.WhiteColor34ExtraBold}}>{item.id}</Text></View>
                            <View style={styles.foodContainer}><Text style={{...Fonts.textGrayColor15SemiBold}}>{item.text}</Text></View>
                        </TouchableOpacity>
                    )}
                />
            }
            </View>
        </View>)
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
    mealContainer: {

    },
    mealDetails:{
        flexDirection: 'row',
        alignItems: 'center',        
    },
    mealItem: {
        marginHorizontal: Sizes.fixPadding * 0.8,
        height: 140.0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    mealTitle: {
        position: 'absolute',
        marginLeft: Sizes.fixPadding * 6.0,
        ...Fonts.blackColor27Bold
    },
    mealCount: {
        position: 'absolute',
        left: Sizes.fixPadding * 27.5,
        ...Fonts.pinkColor50ExtraBold
    },
    mealRight: {
        position: 'absolute',
        left: Sizes.fixPadding * 32.5,
    },
    foodItem: {
        marginHorizontal: Sizes.fixPadding * 2,
        marginVertical: Sizes.fixPadding * 0.6,
        height: 80.0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: Colors.pinkColor,
        borderRadius: Sizes.fixPadding * 2.5
    },
    foodId: {
        marginLeft: Sizes.fixPadding * 3.0,

        alignItems: 'center',
        justifyContent: 'center',
        width: Sizes.fixPadding * 5.2,
        height: Sizes.fixPadding * 5.2,
        backgroundColor: Colors.greenColor,
        borderRadius: Sizes.fixPadding * 3,
    },
    foodContainer: {
        width: Sizes.fixPadding * 22,
        marginLeft: Sizes.fixPadding * 2.0,
    }
})

export default RecipeScreen;
