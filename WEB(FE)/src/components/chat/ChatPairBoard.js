import { useEffect, useState } from "react";
import ChatPairElement from "./ChatPairElement";
import { dbFunction, dbService } from "../../lib/FStore";
import { whisperSodlierSessionKey } from "../../lib/Const";
import styled from "styled-components";
import media from "../../modules/MediaQuery";
import { arrayUnion, serverTimestamp } from "firebase/firestore";

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #fbfbfb;
  border-radius: 5px;
  border: 1px solid rgb(189, 189, 189);
  width: 300px;
  ${media.tablet`
  width:50%;`
  }
  ${media.mobile`
  width: 100%;
  `}
`;

const ChatListTitleBox = styled.div`
  margin : 0px 0px 10px 0px;
  padding : 10px;
  height: fit-content;
  border-bottom: 1px solid rgb(189, 189, 189);
  width: 100%;
`;

const ChatListTitleText = styled.div`
  font-size: 16px;
  text-align : center;
  font-weight: 600;
  line-height: 1.2;
`;

const ChatPairBoard = ({
  getCurrentChatPair,
  setCurrentChatPair
}) => {
  const { uid: currentUserUid } = JSON.parse(
    sessionStorage.getItem(whisperSodlierSessionKey)
  );
  const { query, collection, orderBy, onSnapshot, where, doc, updateDoc } = dbFunction;
  const [chatPairs, setChatPairs] = useState([]);
  console.log("currentUserUid: ", currentUserUid);
  const onClickTestButton = () => {
    const docRef = doc(dbService, "ChatPair", "YWZl68ZRzIFXhdYECb4b");
    updateDoc(docRef, {
      recentMessage: {
        message_text: "이 문자열이 보인다면 테스트가 성공했을겁니다아마도",
        read_by: arrayUnion(currentUserUid), // 반대는 arrayRemove()
        sent_by: currentUserUid,
        sent_timestamp: serverTimestamp(),
      }
    })
  }
  useEffect(() => {
    const q = query(
      collection(dbService, "ChatPair"),
      orderBy("recentMessage.sent_timestamp", "desc"),
      where("member_ids", "array-contains", currentUserUid),
    );
    onSnapshot(q, (snapshot) => {
      const chatPairArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("chatPairArray: ", chatPairArray);
      setChatPairs(chatPairArray);
    });
  }, []);
  return (
    <ChatListContainer>
      <ChatListTitleBox>
      <ChatListTitleText>{"내 채팅(가칭) 리스트"}</ChatListTitleText>
      <button onClick={onClickTestButton}>테스트버튼</button>
      </ChatListTitleBox>
      
      {chatPairs.length !== 0 ? (
        chatPairs.map((pair, index) => (
          <div key={pair.id} onClick={() => getCurrentChatPair(pair.id)}>
              익명 {index === 0 ? ", [최신]  " : ""}
              {currentUserUid === pair.members[0].member_id ? (
                pair.members[1].member_displayname
              ) : (
                (currentUserUid === pair.members[1].member_id) ? (pair.members[0].member_displayname) : "오류입니다")}
          </div>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )}
      {/* {chatPairs.length !== 0 ? (
        chatPairs.map((pair, index) => (
          <ChatPairElement
            key={pair.id}
            getCurrentChatPair={getCurrentChatPair(pair.id)}
          >
            <div>
              익명 {index === 0 ? ", [최신]  " : ""}
              {currentUserUid === pair.members[0].member_id ? (
                pair.members[1].member_displayname
              ) : (
                (currentUserUid === pair.members[1].member_id) ? (pair.members[0].member_displayname) : "오류입니다")}
            </div>
          </ChatPairElement>
        ))
      ) : (
        <div>잠시만 기다려 주세요</div>
      )} */}
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
      <ChatPairElement></ChatPairElement>
    </ChatListContainer>
  );
};

export default ChatPairBoard;
