import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Dimensions, ActivityIndicator, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";
import fetchLearningModules from "../../db/learningModule";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const LessonScreen = ({ navigation }) => {

    const [userInfo, setUserInfo] = useAtom(userInfoAtom)

    const [state, setState] = useState({
        currentScreen: 0,
        pageTitle: 'Lessons',
        moduleId: 1,
        lessonId: 1,
    });

    const [learningModules, setLearningModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadModules = async () => {
            try {
                const modules = await fetchLearningModules();
                const updatedModules = await checkUnlockStatus(modules);
                setLearningModules(updatedModules);
            } catch (error) {
                console.error("Error fetching learning modules:", error);
            } finally {
                setLoading(false);
            }
        };

        loadModules();
    }, []);

    const checkUnlockStatus = async (modules) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const lastUnlockDate = await AsyncStorage.getItem('lastUnlockDate');
            const completedLessons = JSON.parse(await AsyncStorage.getItem('completedLessons')) || {};
            
            // Check if this is the first time running the app
            const isFirstTime = await AsyncStorage.getItem('isFirstTimeLoad');
            
            if (!isFirstTime) {
                // First time initialization
                await AsyncStorage.setItem('isFirstTimeLoad', 'false');
                await AsyncStorage.setItem('lastUnlockDate', today);
                await AsyncStorage.setItem('lastUnlockedLesson', JSON.stringify({ moduleId: 1, lessonId: 1 }));
                
                // Only unlock the first lesson of the first module
                modules[0].lessons[0].unlocked = true;
                modules[0].unlocked = true;
                
                // Lock all other modules and lessons
                for (let i = 0; i < modules.length; i++) {
                    if (i === 0) {
                        // For first module, lock all lessons except the first one
                        for (let j = 1; j < modules[i].lessons.length; j++) {
                            modules[i].lessons[j].unlocked = false;
                        }
                    } else {
                        // Lock all other modules and their lessons
                        modules[i].unlocked = false;
                        modules[i].lessons.forEach(lesson => {
                            lesson.unlocked = false;
                        });
                    }
                }
                
                return modules;
            }
    
            // Normal daily check logic
            const lastUnlockedLesson = JSON.parse(await AsyncStorage.getItem('lastUnlockedLesson')) || { moduleId: 1, lessonId: 1 };
    
            if (lastUnlockDate !== today) {
                await AsyncStorage.setItem('lastUnlockDate', today);
                
                let newLessonUnlocked = false;
                for (let module of modules) {
                    for (let lesson of module.lessons) {
                        if (!newLessonUnlocked && 
                            (module.moduleId < lastUnlockedLesson.moduleId || 
                            (module.moduleId === lastUnlockedLesson.moduleId && lesson.lessonsId <= lastUnlockedLesson.lessonId) ||
                            completedLessons[`${module.moduleId}-${lesson.lessonsId}`])) {
                            lesson.unlocked = true;
                        } else if (!newLessonUnlocked && 
                            (module.moduleId === lastUnlockedLesson.moduleId && lesson.lessonsId === lastUnlockedLesson.lessonId + 1)) {
                            lesson.unlocked = true;
                            newLessonUnlocked = true;
                            await AsyncStorage.setItem('lastUnlockedLesson', 
                                JSON.stringify({ moduleId: module.moduleId, lessonId: lesson.lessonsId }));
                        } else {
                            lesson.unlocked = false;
                        }
                    }
                    module.unlocked = module.lessons.some(lesson => lesson.unlocked);
                }
            } else {
                // Same day - maintain current unlock status
                for (let module of modules) {
                    for (let lesson of module.lessons) {
                        lesson.unlocked = completedLessons[`${module.moduleId}-${lesson.lessonsId}`] || 
                            (module.moduleId === lastUnlockedLesson.moduleId && lesson.lessonsId <= lastUnlockedLesson.lessonId);
                    }
                    module.unlocked = module.lessons.some(lesson => lesson.unlocked);
                }
            }
    
            return modules;
        } catch (error) {
            console.error("Error in checkUnlockStatus:", error);
            Alert.alert("Error", "Failed to check lesson unlock status. Please try again.");
            return modules;
        }
    };
    const completeLesson = async (moduleId, lessonId) => {
        try {
            const completedLessons = JSON.parse(await AsyncStorage.getItem('completedLessons')) || {};
            completedLessons[`${moduleId}-${lessonId}`] = true;
            await AsyncStorage.setItem('completedLessons', JSON.stringify(completedLessons));

            const updatedModules = await checkUnlockStatus([...learningModules]);
            setLearningModules(updatedModules);
        } catch (error) {
            console.error("Error in completeLesson:", error);
            Alert.alert("Error", "Failed to complete the lesson. Please try again.");
        }
    };

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
                    {loading ? (
                        <ActivityIndicator // Spinner while loading
                            size="large"
                            color="#008000"
                            style={styles.spinner}
                        />
                    ) : (
                        listView()
                    )}
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
                    <Image src={userInfo.userCredential._tokenResponse.photoUrl} style={styles.profilePhoto}/>
                </View>
                <View style={styles.helloContainer}>
                    {currentScreen == 0 &&
                        <Text style={{marginTop: Sizes.fixPadding * -1.5, ...Fonts.WhiteColor24ExtraBold}}>{pageTitle}</Text>
                    }
                    {currentScreen == 1 &&
                        <>
                            <Text style={{marginTop: Sizes.fixPadding * -1.9, ...Fonts.whiteColor17Medium}}>MODULE {moduleId}</Text>
                            <Text style={{...Fonts.WhiteColor20ExtraBold}}>{learningModules[moduleId - 1].title}</Text>
                        </>
                    }
                    {currentScreen == 2 &&
                        <>
                            <Text style={{marginTop: Sizes.fixPadding * -1.9, ...Fonts.whiteColor17Medium}}>LESSONS {lessonId}</Text>
                            <Text style={{...Fonts.WhiteColor20ExtraBold}}>{learningModules[moduleId - 1]?.lessons[lessonId - 1].title}</Text>
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
                    data={learningModules}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.lessonItem, !item.unlocked && styles.lockedItem]}
                            activeOpacity={0.9}
                            onPress={() => {
                                if (item.unlocked) {
                                    updateState({currentScreen: 1, moduleId: parseInt(item.moduleId)});
                                } else {
                                    Alert.alert("Module Locked", "This module is not yet available. Complete previous lessons to unlock it.");
                                }
                            }}
                        >
                            {item.done ?
                                <View style={styles.moduleId}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                                :
                                <View style={styles.moduleIdPink}>
                                {!item.unlocked && <Feather name="lock" size={24} color="white" />}
                                </View>
                            }
                            <View style={styles.foodContainer}>
                                <Text style={{...Fonts.blackColor17Medium}}>MODULE {item.moduleId}</Text>
                                <Text style={{...Fonts.blackColor20ExtraBold}}>{item.title}</Text>
                            </View>
                            <Entypo name="chevron-thin-right" size={25} color="black" style={styles.rightSelector}/>
                        </TouchableOpacity>
                    )}
                />
            }
            {currentScreen == 1 &&
               <FlatList
                    data={learningModules[moduleId-1].lessons}
                    keyExtractor={(item) => item.id}                    
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.lessonItem, !item.unlocked && styles.lockedItem]}
                            activeOpacity={0.9}
                            onPress={() => {
                                if (item.unlocked) {
                                    updateState({currentScreen: 2, lessonId: parseInt(item.lessonsId)});
                                } else {
                                    Alert.alert("Lesson Locked", "This lesson is not yet available. Complete previous lessons or wait for it to unlock.");
                                }
                            }}
                        >
                            {item.done ?
                                <View style={styles.moduleId}>
                                    <Feather name="check" size={24} color="white" />
                                </View>
                                :
                                <View style={styles.moduleIdPink}>
                                    {!item.unlocked && <Feather name="lock" size={24} color="white" />}
                                </View>
                            }
                            <View style={styles.foodContainer}>
                                <Text style={{...Fonts.blackColor17Medium}}>LESSON {item.lessonsId}</Text>
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
                        <Text>{learningModules[moduleId-1].lessons[lessonId - 1].description}</Text>
                    </ScrollView>
               </View>
            }
            </View>
        </View>)
    }


    function bottomButton() {
        return (
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    disabled={lessonId - 1 === 0}
                    onPress={() => updateState({lessonId: Number(lessonId) - 1})}
                    style={styles.bottomBtn}
                >
                    <Entypo name="chevron-left" size={25} color="white"/>
                    <Text style={{...Fonts.whiteColor20Bold}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        await completeLesson(moduleId, lessonId);
                        const currentModule = learningModules[moduleId - 1];
                        if (currentModule.lessons.length > lessonId) {
                            if (currentModule.lessons[lessonId].unlocked) {
                                updateState({lessonId: Number(lessonId) + 1});
                            } else {
                                Alert.alert("Lesson Locked", "You've completed this lesson. The next lesson will be unlocked tomorrow.");
                                updateState({currentScreen: 1}); // Go back to lesson list
                            }
                        } else if (moduleId < learningModules.length) {
                            const nextModule = learningModules[moduleId];
                            if (nextModule.unlocked) {
                                updateState({moduleId: moduleId + 1, lessonId: 1, currentScreen: 1});
                            } else {
                                Alert.alert("Module Locked", "You've completed all lessons in this module. The next module will be unlocked when available.");
                                updateState({currentScreen: 0}); // Go back to module list
                            }
                        } else {
                            Alert.alert("Congratulations!", "You've completed all available lessons.");
                            updateState({currentScreen: 0}); // Go back to module list
                        }
                    }}
                    style={styles.bottomBtn}
                >
                    <Text style={{...Fonts.whiteColor20Bold}}>Next</Text>
                    <Entypo name="chevron-right" size={25} color="white"/>
                </TouchableOpacity>
            </View>
        );
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
    },
    lockedItem: {
        opacity: 0.5,
    },
})

export default LessonScreen;
