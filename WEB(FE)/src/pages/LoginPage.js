import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { authService } from "../lib/fbase";
import LoginForm from "../components/auth/LoginForm";
import useForm from "../modules/useForm";
import { useRecoilState } from "recoil";
import { ErrorInfo, UserInfo } from "../store/AuthStore";

const LoginPage = () => {
  const [state, onChange] = useForm({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [errorInfo, setErrorInfo] = useRecoilState(ErrorInfo);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //const auth = getAuth();
      const data = await signInWithEmailAndPassword(
        authService,
        state.email,
        state.password
      );
      console.log(data);
      if (authService.currentUser.emailVerified === false) {
        setErrorInfo((prev) => ({
          ...prev,
          isErr: true,
          errMsg: "이메일 인증이 안된 계정입니다",
        }));
        authService.signOut();
      } else {
        console.log("[LoginPage.js] : 로그인 정상]");
        setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
        navigate("/");
      }
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          setErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            errMsg: "아이디 또는 비밀번호가 잘못되었습니다",
          }));
          break;
        case "auth/user-not-found":
          setErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            errMsg: "계정이 존재하지 않습니다",
          }));
          break;
        default:
          setErrorInfo((prev) => ({
            ...prev,
            isErr: true,
            errMsg: "잠시후에 다시 시도해주세요",
          }));
      }
      console.log(e.code);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div>로그인 페이지</div>
      <LoginForm
        onSubmit={onSubmit}
        onChange={onChange}
        email={state.email}
        password={state.password}
        isError={errorInfo.isErr}
        errorMsg={errorInfo.errMsg}
      ></LoginForm>
    </div>
  );
};

export default LoginPage;
