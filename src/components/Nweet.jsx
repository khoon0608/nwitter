/** @format */

import { dbService, storageService } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Nweet = ({
  
  nweetObj: { id, text, createdAt, creatorId, attachmentUrl },
  isOwner,
}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(text);

  const NweetTextRef = doc(dbService, "nweets", `${id}`);

  const deleteHandle = async () => {
    const ok = window.confirm("트윗을 삭제하겠습니까?");

    if (ok) {
      await deleteDoc(NweetTextRef);
      attachmentUrl && (await deleteObject(ref(storageService, attachmentUrl)));
    }
  };

  const changeHandle = (event) => {
    const {
      target: { value },
    } = event;

    setNewNweet(value);
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const deleteAttachment = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      attachmentUrl: "",
    });
    await deleteObject(ref(storageService, attachmentUrl));
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <li>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={submitHandle}>
                <input
                  onChange={changeHandle}
                  type='text'
                  value={newNweet}
                  required
                />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{text}</h4>
          {attachmentUrl && (
            <>
              <img
                src={attachmentUrl}
                alt='nweet-img'
                height='50px'
                width='50px'
                style={{ borderRadius: "50%" }}
              />
              <button onClick={deleteAttachment}>Delete Image</button>
            </>
          )}

          {isOwner && (
            <>
              <button onClick={deleteHandle}>Del</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Nweet;
