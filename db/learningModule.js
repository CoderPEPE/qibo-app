import {
  collection,
  getFirestore,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebase/config";

const Lecture = collection(FIREBASE_DB, "Lecture");

const fetchLearningModules = async () => {
  try {
    const querySnapshot = await getDocs(Lecture);
    const modules = [];

    for (const doc of querySnapshot.docs) {
      // Fetch subcollection 'lessons' for each Lecture document
      const lessonsRef = collection(FIREBASE_DB, `Lecture/${doc.id}/lessons`);
      const lessonsSnapshot = await getDocs(lessonsRef);

      const lessons = [];
      lessonsSnapshot.forEach(lessonDoc => {
        const lessonData = lessonDoc.data();
        lessons.push({ id: lessonDoc.id, ...lessonData });
      });

      modules.push({ id: doc.id, ...doc.data(), lessons });
      console.log("Lessons", lessons)
    }

    console.log("Fetched modules with lessons:", modules);
    return modules;
  } catch (error) {
    console.error("Error fetching documents from FireStore:", error);
    return [];
  }
};

export default fetchLearningModules;
