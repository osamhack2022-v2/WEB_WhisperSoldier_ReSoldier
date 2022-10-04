import { useNavigate } from "react-router-dom";
import { authService } from "../lib/FAuth";
import { dbService } from "../lib/FStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import WriteContainer from "../components/container/WriteContainer";
import { useForm } from "../modules/useForm";
import { useState } from "react";

const WritePage = ({ isDesktop, isTablet }) => {
  const [state, onChange] = useForm({ postContent: "" });
  const [errorWritePostInfo, setErrorWritePostInfo] = useState({
    isError: false,
  });
  const navigate = useNavigate();

  const onClick = async (e) => {
    e.preventDefault();
    if (state.postContent.length === 0) {
      setErrorWritePostInfo((prev) => ({ ...prev, isError: true }));
      setTimeout(() => {
        setErrorWritePostInfo((prev) => ({ ...prev, isError: false }));
      }, 3000);
    } else {
      try {
        const docRef = await addDoc(collection(dbService, "WorryPost"), {
          created_timestamp: serverTimestamp(),
          creator_id: authService.currentUser.uid, // 현재 사용자의 uid
          like_count: 0,
          post_rep_accept: false,
          tag_name: "",
          text: state.postContent,
        });
        console.log("Document written with ID: ", docRef.id);
        alert("고민이 정상적으로 업로드되었습니다.");
        navigate("/");
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    }
  };
  return (
    <>
      <WriteContainer
        state={state}
        onChange={onChange}
        errorWritePostInfo={errorWritePostInfo}
        onClick={onClick}
        isDesktop={isDesktop}
        isTablet={isTablet}
      ></WriteContainer>
    </>
  );
};

export default WritePage;
