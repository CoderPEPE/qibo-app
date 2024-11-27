import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase/config";

const userCollection = collection(FIREBASE_DB, "users");


export const addUser = async (userId, email, authProvider) => {
  const dbData = {
    email,
    authProvider,
    subscription: {
      plan: "",
      status: "",
      renewalDate: null,
    },
    bodyConstitution: {
      result: null,
      testDate: null
    },
    completedLessons: [],
    unlockedIngredients: [],
    unlockedRecipes: [],
    lastCheckInDate: null,
    consecutiveCheckIns: 0
  };
  return await setDoc(doc(userCollection, userId), dbData);
};

export const getUserData = async (userId) => {
  const userDocRef = doc(userCollection, userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? userDoc.data() : null;
};

export const updateBodyConstitution = async (userId, result) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        bodyConstitution: {
            result,
            testDate: serverTimestamp()
        }
    });
}

export const updateSubscription = async (userId, plan, status) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        subscription: {
            plan,
            status,
            renewalDate: serverTimestamp()
        }
    });
}

export const addUserCheckIn = async (userId, rewarded) => {
    const checkInData = {
        date: serverTimestamp(),
        rewarded
    }
    const userDocRef = doc(userCollection, userId);
    const checkInsCollection = collection(userDocRef, "checkIns");
    return await addDoc(checkInsCollection, checkInData);
}

export const updateConsecutiveCheckIns = async (userId, count) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        consecutiveCheckIns: count,
        lastCheckInDate: serverTimestamp()
    });
}

export const getUserCheckIns = async (userId) => {
    const userDocRef = doc(userCollection, userId);
    const checkInsCollection = collection(userDocRef, "checkIns");
    const checkInsSnapshot = await getDocs(checkInsCollection);
    return checkInsSnapshot.docs.map((doc) => doc.data());
}

export const updateUserLessonProgress = async (userId, lessonId) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        completedLessons: arrayUnion(lessonId)
    });
}

export const unlockIngredientForUser = async (userId, ingredientId) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        unlockedIngredients: arrayUnion(ingredientId)
    });
}

export const unlockRecipeForUser = async (userId, recipeId) => {
    const userRef = doc(userCollection, userId);
    return await updateDoc(userRef, {
        unlockedRecipes: arrayUnion(recipeId)
    });
}
