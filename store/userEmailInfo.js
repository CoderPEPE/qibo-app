import { atom } from "jotai";

const userEmailInfoAtom = atom({
    auth: false,
    userCredential: {}
});

export default userEmailInfoAtom;
