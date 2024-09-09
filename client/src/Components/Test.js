// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
import { getDatabase,set,ref } from "firebase/database";
import { fsdb } from "../firebase/firebaseConfig"; // adjust the path according to your file structure

const db = getDatabase(fsdb);

const MyComponent = () => {
  const putData=()=>{
    set(ref(db,"todos/firstTask"),{
      id:1,
      title:"Task1",
      description:"something",
    });
  };

  return (
    <div>
      <h1>Data from Firestore</h1>
      <button onClick={putData}>Click</button>
    </div>
  );
};

export default MyComponent;
