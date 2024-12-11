// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase-config";
// import {
//   collection,
//   addDoc,
//   where,
//   serverTimestamp,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore";

// import "./Chat.css";

// export const Chat = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesRef = collection(db, "messages");

//   useEffect(() => {
//     const queryMessages = query(
//       messagesRef,
//       where("room", "==", room),
//       orderBy("createdAt")
//     );
//     const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
//       let messages = [];
//       snapshot.forEach((doc) => {
//         messages.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(messages);
//       setMessages(messages);
//     });

//     return () => unsuscribe();
//   }, []);

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   if (newMessage === "") return;
//   //   await addDoc(messagesRef, {
//   //     text: newMessage,
//   //     createdAt: serverTimestamp(),
//   //     user: auth.currentUser.displayName,
//   //     room,
//   //   });

//   //   setNewMessage("");
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (newMessage === "") return;
  
//     if (!auth.currentUser ) {
//       console.error("User  is not authenticated");
//       return;
//     }
  
//     try {
//       await addDoc(messagesRef, {
//         text: newMessage,
//         createdAt: serverTimestamp(),
//         user: auth.currentUser .displayName,
//         room,
//       });
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error adding message: ", error);
//     }
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome to: {room.toUpperCase()}</h1>
//       </div>
//       <div className="messages">
//         {messages.map((message) => (
//           <div key={message.id} className="message">
//             <span className="user">{message.user}:</span> {message.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           className="new-message-input"
//           placeholder="Type your message here..."
//         />
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config"; // Ensure this is correctly set up
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "./Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log("Fetched messages:", messages); // Log fetched messages
      setMessages(messages);
    }, (error) => {
      console.error("Error fetching messages: ", error); // Log any errors
    });

    return () => unsubscribe();
  }, [room]); // Ensure room is in the dependency array

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    if (!auth.currentUser ) {
      console.error("User  is not authenticated");
      return;
    }

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser .displayName,
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.length === 0 ? (
          <p></p> // Display a message if there are no messages
        ) : (
          messages.map((message) => (
            <div key={message.id} className="message">
              <span className="user">{message.user}:</span> {message.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};