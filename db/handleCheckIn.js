import { FIREBASE_DB } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";

export const handleCheckIn = async userId => {
  const userRef = doc(FIREBASE_DB, "users", userId);
  const userDoc = await getDoc(userRef);

  const today = Timestamp.now();
  const todayDate = today.toDate();

  if (userDoc.exists()) {
    const { lastCheckInDate, consecutiveCheckIns } = userDoc.data();

    if (lastCheckInDate) {
      const lastCheckIn = lastCheckInDate.toDate();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const diffTime =
        todayDate.setHours(0, 0, 0, 0) - lastCheckIn.setHours(0, 0, 0, 0);
      const diffDays = diffTime / oneDayInMs;

      if (diffDays === 0) {
        throw new Error(
          "Already checked in today. Rewards can only be claimed once per day."
        );
      }
    }

    const updatedConsecutiveCheckIns = (consecutiveCheckIns || 0) + 1;

    await updateDoc(userRef, {
      lastCheckInDate: today,
      consecutiveCheckIns: updatedConsecutiveCheckIns
    });

    return updatedConsecutiveCheckIns; // Return new consecutive check-in count
  }
};
