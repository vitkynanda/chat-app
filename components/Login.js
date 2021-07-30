import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";
// import Image from "next/image";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        {/* <Logo
          src={images}
          alt="whatsapp-logo"
          width={30}
          height={30}
        /> */}
        <Title>LOGIN TO WHATSAPP</Title>
        <ButtonLogin onClick={signIn}>
          {/* <ImageButton src="/google.png" alt="Google" width={30} height={30} /> */}
          <p>LOGIN WITH GOOGLE</p>
        </ButtonLogin>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div``;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: #cee5d0;
  width: 500px;
  border-radius: 10px;
  margin: auto;
  margin-top: 70px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    width: 300px;
  }
`;
// const Logo = styled(Image)`
//   height: 150px;
//   width: 100px;
//   margin: auto;
// `;
const ButtonLogin = styled.div`
  padding: 0 20px;
  border-radius: 5px;
  letter-spacing: 1.1px;
  font-weight: 500;
  display: flex;
  align-items: center;
  background-color: #93d9a3;
  color: whitesmoke;
  margin-bottom: 50px;
  cursor: pointer;
  p {
    margin-left: 5px;
  }
  :hover {
    opacity: 0.8;
  }
`;

// const ImageButton = styled(Image)``;
const Title = styled.h3`
  color: white;
  letter-spacing: 1.2px;
`;
