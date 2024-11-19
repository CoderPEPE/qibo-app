import { atom } from "jotai";

const userInfoAtom = atom({
    auth: false,
    userCredential: {}
});

export default userInfoAtom;
