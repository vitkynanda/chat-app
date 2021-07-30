import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../util/getRecipientEmail";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const [userLoggedIn] = useAuthState(auth);
  const router = useRouter();

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(users, userLoggedIn))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, userLoggedIn);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar />}
      {recipientEmail}
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: lightgray;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
