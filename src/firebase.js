import { initializeApp } from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  REACT_APP_TEMPLATE_ID: process.env.REACT_APP_TEMPLATE_ID,
  REACT_APP_SERVICE_ID: process.env.REACT_APP_SERVICE_ID,
  REACT_APP_USER_ID: process.env.REACT_APP_USER_ID
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
