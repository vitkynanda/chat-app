import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TyOfMessage = userLoggedIn.email === user ? Sender : Receiver;

  return (
    <Container>
      <TyOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TyOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 20px;
  position: relative;
  text-align: right;
  display: flex;
  flex-direction: column;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: gray;
`;
