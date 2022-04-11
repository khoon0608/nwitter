/** @format */
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect, useRef } from "react";
import { dbService, storageService } from "fBase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Nweet from "components/Nweet";
import { get } from "firebase/database";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  const attachmentInput = useRef();

  //   const getNweets = async () => {
  //     const q = query(collection(dbService, "nweets"));
  //     const querySnapshot = await getDocs(q);
  //     setNweets([]);
  //     querySnapshot.forEach((doc) => {
  //       const nweetObj = {
  //         ...doc.data(),
  //         id: doc.id,

  //       };
  //       setNweets((prev) => [nweetObj, ...prev]);
  //     });
  //   };

  // 위의 방식은 오래된 데이터만 가져옴

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const submitHandle = async (event) => {
    event.preventDefault();
    
    let attachmentUrl = "";
    if (attachment) {
      const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
      console.log(attachmentUrl);
    }

    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        creatorId: userObj.uid,
        createdAt: serverTimestamp(),
        attachmentUrl,
      });
    } catch (error) {
      console.log(error);
    }
    setNweet("");
    setAttachment(null);
    attachmentInput.current.value = null;
  };

  const changeHandle = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const clearAttachment = () => {
    setAttachment(null);
    attachmentInput.current.value = null;
  };

  return (
    <>
      <form onSubmit={submitHandle}>
        <input
          type='text'
          onChange={changeHandle}
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          required
        />
        <input
          ref={attachmentInput}
          onChange={onFileChange}
          type='file'
          accept='image/*'
        />
        <button>Ntweet</button>
      </form>
      {attachment && (
        <>
          <img src={attachment} alt='nweet-img' width='50px' height='50px' />
          <button onClick={clearAttachment}>Clear</button>
        </>
      )}
      <ul>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </ul>
    </>
  );
};

export default Home;
