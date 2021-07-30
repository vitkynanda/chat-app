import { Avatar } from "@material-ui/core";
import { useState, useRef } from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import { IconButton } from "@material-ui/core";
import {
  InsertEmoticon,
  MoreVert,
  AttachFile,
  Mic,
  Send,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import Message from "./Message";
import firebase from "firebase/app";
import TimeAgo from "timeago-react";

function ChatScreen({ messages, recipient }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const endOfMessageData = useRef(null);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipient)
  );

  const recipientData = recipientSnapshot?.docs?.[0]?.data();

  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const scrollToBottom = () => {
    endOfMessageData.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // update user lastSeen
    db.collection("users")
      .doc(user.uid)
      .set(
        { lastSeen: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );

    // add message to firestore
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  return (
    <Container>
      <Header>
        {recipientData ? <Avatar src={recipientData.photoURL} /> : <Avatar />}
        <HeaderInformation>
          <h3>{recipient}</h3>
          {recipient ? (
            <p>
              Last active:{" "}
              {recipientData?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipientData?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active ...</p>
          )}
        </HeaderInformation>
        <HeaderIcon>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcon>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageData} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        {input.length > 0 ? (
          <SendButton onClick={sendMessage} />
        ) : (
          <SendButton />
        )}
        <Mic />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 0;
  position: sticky;
  margin-top: 10px;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: 0;
  border-radius: 10px;
  z-index: 100;
  padding: 10px;
  background-color: whitesmoke;
  margin: 0 15px;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px;
  border-bottom: 1px solid whitesmoke;
  height: 80px;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  h3 {
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
  height: 90vh;
  padding: 30px;
  overflow-y: scroll;
  background-color: #faf3f3;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const EndOfMessage = styled.p`
  margin-bottom: 50px;
`;

const SendButton = styled(Send)``;
