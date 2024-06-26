import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const lessonData = [
    {
        id: '1',
        done: true,
        title: 'Intro to TCM',
        lessons: [
            {
                id: '1',
                done: true,
                title: 'TCM 101',
                description: `Welcome to Qibo - in this lesson we will do a brief introduction to TCM. TCM stands for Traditional Chinese Medicine. It's a 3000+ year old approach that views your body as a mini-landscape: a microcosm within the macrocosm of the universe. Modern science continues to delve into TCM's wisdom and finds revealing connections between our body, mind, and environment. Each module will help you understand how this ancient knowledge can guide you to a healthier, more balanced life as you unlock new recipes and ingredients.`
            },
            {
                id: '2',
                done: true,
                title: 'Yin and Yang',
                description: `We all have heard of Yin and Yang or seen the iconic black and white symbol. But what is it really? Yin and Yang are the super guardians of balance in TCM. They represent the forces of duality in the universe. This duo works together to maintain harmony and stability in all aspects of life, from your physical health to your emotional well-being. They're similar to the idea of homeostasis, keeping all in equilibrium. In TCM, these interconnected forces are similar to the idea of homeostasis, the body's internal equilibrium. A balanced lifestyle promotes a healthy Yin and Yang relationship, while an imbalance, such as too much work and not enough rest, can lead to disharmony and illness.`
            },
            {
                id: '3',
                done: true,
                title: 'The Qi Concept',
                description: `Welcome to Qibo - in this lesson we will do a brief introduction to TCM. TCM stands for Traditional Chinese Medicine. It's a 3000+ year old approach that views your body as a mini-landscape: a microcosm within the macrocosm of the universe. Modern science continues to delve into TCM's wisdom and finds revealing connections between our body, mind, and environment. Each module will help you understand how this ancient knowledge can guide you to a healthier, more balanced life as you unlock new recipes and ingredients.`
            },
            {
                id: '4',
                done: true,
                title: 'Five Elements',
                description: `In TCM, the concept of Five Elements theory suggests that the body's reactions mirror the way nature reacts to the environment. Your mood changing with the weather isn't just a saying, it's science.The five elements are Fire, Earth, Metal, Water, and Wood. They constantly interact, either nourishing or controlling one another. Each element ties to certain flavors and qualities, impacting the body. Food plays a key role in maintaining elemental balance. By consuming a variety of foods, we nourish our Qi and achieve harmony among the elements. Drawing on this interactive essence of the five elements, TCM proposes mindful eating to enhance holistic wellness.`
            },
            {
                id: '5',
                done: true,
                title: 'The Organ Network',
                description: `In TCM, your organs are like a well-oiled, interlinked machinery. Western science nods, highlighting our organs truly function as a network, passing messages and keeping peace. If you were looking for a condensed TCM crash course, there you go! Unravel these wisdom nuggets one by one and let the ancient wisdom of TCM steer your health voyage. Remember, as QiBo often jests, "Good health is no laughing matter—but it sure doesn't hurt to chuckle along the way!"`
            }
        ]
    },
    {
        id: '2',
        done: false,
        title: 'My Constitution',
        lessons: [
            {
                id: '1',
                done: false,
                title: 'TCM 101',
                description: `Welcome to Qibo - in this lesson we will do a brief introduction to TCM. TCM stands for Traditional Chinese Medicine. It's a 3000+ year old approach that views your body as a mini-landscape: a microcosm within the macrocosm of the universe. Modern science continues to delve into TCM's wisdom and finds revealing connections between our body, mind, and environment. Each module will help you understand how this ancient knowledge can guide you to a healthier, more balanced life as you unlock new recipes and ingredients.`
            },
            {
                id: '2',
                done: false,
                title: 'Yin and Yang',
                description: `We all have heard of Yin and Yang or seen the iconic black and white symbol. But what is it really? Yin and Yang are the super guardians of balance in TCM. They represent the forces of duality in the universe. This duo works together to maintain harmony and stability in all aspects of life, from your physical health to your emotional well-being. They're similar to the idea of homeostasis, keeping all in equilibrium. In TCM, these interconnected forces are similar to the idea of homeostasis, the body's internal equilibrium. A balanced lifestyle promotes a healthy Yin and Yang relationship, while an imbalance, such as too much work and not enough rest, can lead to disharmony and illness.`
            }
        ]
    },
    {
        id: '3',
        done: false,
        title: 'My Constitution',
        lessons: [
            {
                id: '1',
                done: true,
                title: 'TCM 101',
                description: `Welcome to Qibo - in this lesson we will do a brief introduction to TCM. TCM stands for Traditional Chinese Medicine. It's a 3000+ year old approach that views your body as a mini-landscape: a microcosm within the macrocosm of the universe. Modern science continues to delve into TCM's wisdom and finds revealing connections between our body, mind, and environment. Each module will help you understand how this ancient knowledge can guide you to a healthier, more balanced life as you unlock new recipes and ingredients.`
            },
            {
                id: '2',
                done: false,
                title: 'Yin and Yang',
                description: `We all have heard of Yin and Yang or seen the iconic black and white symbol. But what is it really? Yin and Yang are the super guardians of balance in TCM. They represent the forces of duality in the universe. This duo works together to maintain harmony and stability in all aspects of life, from your physical health to your emotional well-being. They're similar to the idea of homeostasis, keeping all in equilibrium. In TCM, these interconnected forces are similar to the idea of homeostasis, the body's internal equilibrium. A balanced lifestyle promotes a healthy Yin and Yang relationship, while an imbalance, such as too much work and not enough rest, can lead to disharmony and illness.`
            },
            {
                id: '3',
                done: false,
                title: 'The Qi Concept',
                description: `Welcome to Qibo - in this lesson we will do a brief introduction to TCM. TCM stands for Traditional Chinese Medicine. It's a 3000+ year old approach that views your body as a mini-landscape: a microcosm within the macrocosm of the universe. Modern science continues to delve into TCM's wisdom and finds revealing connections between our body, mind, and environment. Each module will help you understand how this ancient knowledge can guide you to a healthier, more balanced life as you unlock new recipes and ingredients.`
            },
            {
                id: '4',
                done: true,
                title: 'Five Elements',
                description: `In TCM, the concept of Five Elements theory suggests that the body's reactions mirror the way nature reacts to the environment. Your mood changing with the weather isn't just a saying, it's science.The five elements are Fire, Earth, Metal, Water, and Wood. They constantly interact, either nourishing or controlling one another. Each element ties to certain flavors and qualities, impacting the body. Food plays a key role in maintaining elemental balance. By consuming a variety of foods, we nourish our Qi and achieve harmony among the elements. Drawing on this interactive essence of the five elements, TCM proposes mindful eating to enhance holistic wellness.`
            },
        ]
    }
];

const LessonScreen = ({ navigation }) => {

    const [state, setState] = useState({
        currentScreen: 0,
        pageTitle: 'Lessons',
        moduleId: 1,
        lessonId: 1,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data}));

    const{
        currentScreen,
        pageTitle,
        moduleId,
        lessonId,
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
            {currentScreen == 2 && bottomButton()}
        </SafeAreaView>
    )

    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/topbar-back.png')}
                style={styles.headerWrapStyle}
                resizeMode="stretch"
             >
                <Entypo name="chevron-thin-left" size={22} style={{marginLeft: -5, marginRight: 20}} color="white" onPress={() => {currentScreen != 0 ? updateState({currentScreen : 0}) : navigation.push('BottomTabBar', {pageView : 'main'})}}/>
                <View style={styles.profileContainer}>
                    <Image source={require('../../assets/images/profile-photo.png')} style={styles.profilePhoto}/>
                </View>
                <View style={styles.helloContainer}>
                    {currentScreen == 0 &&
                        <Text style={{marginTop: Sizes.fixPadding * -1.5, ...Fonts.WhiteColor24ExtraBold}}>{pageTitle}</Text>
                    }
                    {currentScreen == 1 &&
                        <>
                            <Text style={{marginTop: Sizes.fixPadding * -1.9, ...Fonts.whiteColor17Medium}}>MODULE {moduleId}</Text>
                            <Text style={{...Fonts.WhiteColor20ExtraBold}}>{lessonData[moduleId - 1].title}</Text>
                        </>
                    }
                    {currentScreen == 2 &&
                        <>
                            <Text style={{marginTop: Sizes.fixPadding * -1.9, ...Fonts.whiteColor17Medium}}>LESSONS {lessonId}</Text>
                            <Text style={{...Fonts.WhiteColor20ExtraBold}}>{lessonData[moduleId - 1].lessons[lessonId - 1].title}</Text>
                        </>
                    }
                </View>
                <View style={styles.boltContainer}>
                    <MaterialIcons
                        name='bolt'
                        size={35}
                        color={Colors.whiteColor}
                    />
                    <Text style={styles.notifyNumber}>11</Text>
                </View>
            </ImageBackground>
        )
    }

    function listView() {
        return(
        <View>
            <View>
            {currentScreen == 0 &&
               <FlatList
                    data={lessonData}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (                        
                        <TouchableOpacity
                            style={styles.lessonItem}
                            activeOpacity={0.9}
                            onPress={() => updateState({currentScreen: 1, moduleId: item.id})}
                        >
                            {item.done ?
                                <View style={styles.moduleId}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                                :
                                <View style={styles.moduleIdPink}>
                                </View>
                            }
                            <View style={styles.foodContainer}>
                                <Text style={{...Fonts.blackColor17Medium}}>MODULE {item.id}</Text>
                                <Text style={{...Fonts.blackColor20ExtraBold}}>{item.title}</Text>
                            </View>
                            <Entypo name="chevron-thin-right" size={25} color="black" style={styles.rightSelector}/>
                        </TouchableOpacity>
                    )}
                />
            }
            {currentScreen == 1 &&
               <FlatList
                    data={lessonData[moduleId-1].lessons}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (                        
                        <TouchableOpacity
                            style={styles.lessonItem}
                            activeOpacity={0.9}
                            onPress={() => updateState({currentScreen: 2, lessonId: item.id})}
                        >
                            {item.done ?
                                <View style={styles.moduleId}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                                :
                                <View style={styles.moduleIdPink}>
                                </View>
                            }
                            <View style={styles.foodContainer}>
                                <Text style={{...Fonts.blackColor17Medium}}>LESSON {item.id}</Text>
                                <Text style={{...Fonts.blackColor20ExtraBold}}>{item.title}</Text>
                            </View>
                            <Entypo name="chevron-thin-right" size={25} color="black" style={styles.rightSelector}/>
                        </TouchableOpacity>
                    )}
                />
            }
            {currentScreen == 2 &&
               <View style={styles.lessonContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.5, paddingHorizontal: Sizes.fixPadding * 4.0}}
                    >
                        <Text>{lessonData[moduleId - 1].lessons[lessonId - 1].description}</Text>
                    </ScrollView>
               </View>
            }
            </View>
        </View>)
    }

    function bottomButton() {
        return(<View style={styles.bottomButtonContainer}>
            <TouchableOpacity
                disabled={lessonId - 1 == 0 ? true : false}
                onPress={() => updateState({lessonId: Number(lessonId) - 1})}
                style={styles.bottomBtn}
            >
                <Entypo name="chevron-left" size={25} color="white"/>
                <Text style={{...Fonts.whiteColor20Bold}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={lessonData[moduleId - 1].lessons.length == lessonId ? true : false}
                onPress={() => updateState({lessonId: Number(lessonId) + 1})}
                style={styles.bottomBtn}
            >
                <Text style={{...Fonts.whiteColor20Bold}}>Next</Text>
                <Entypo name="chevron-right" size={25} color="white"/>
            </TouchableOpacity>
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
        paddingVertical: Sizes.fixPadding * 2.2,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding *3.5,
        overflow: "hidden",
        borderBottomRightRadius: Sizes.fixPadding * 3.2,
        borderBottomLeftRadius: Sizes.fixPadding * 3.2,
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
        marginTop: Sizes.fixPadding * 1.8,
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
    lessonItem: {
        marginHorizontal: Sizes.fixPadding * 2,
        marginVertical: Sizes.fixPadding * 0.8,
       
        height: 100.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',

        alignItems: 'center',
        position: 'relative',

        shadowColor: '#0009',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.9,
        elevation: 5,

        borderRadius: Sizes.fixPadding * 2.5
    },
    moduleId: {
        marginLeft: Sizes.fixPadding * 3.0,

        alignItems: 'center',
        justifyContent: 'center',
        width: Sizes.fixPadding * 5.2,
        height: Sizes.fixPadding * 5.2,
        backgroundColor: Colors.greenColor,
        borderRadius: Sizes.fixPadding * 3,
    },
    moduleIdPink: {
        marginLeft: Sizes.fixPadding * 3.0,

        alignItems: 'center',
        justifyContent: 'center',
        width: Sizes.fixPadding * 5.2,
        height: Sizes.fixPadding * 5.2,
        backgroundColor: Colors.pinkColor,
        borderRadius: Sizes.fixPadding * 3,
    },
    foodContainer: {
        width: Sizes.fixPadding * 22,
        marginLeft: Sizes.fixPadding * 2.0,
    },
    lessonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    bottomButtonContainer: {
        width: '100%',

        position: 'absolute',
        bottom: Sizes.fixPadding * 11.8,
        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bottomBtn: {
        backgroundColor: Colors.greenColor,

        width: Sizes.fixPadding * 11.0,
        height: Sizes.fixPadding * 3.8,

        borderRadius: Sizes.fixPadding * 2,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
    }
})

export default LessonScreen;
