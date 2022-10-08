import { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TabletQuery } from "../../lib/Const";
import { SideOptionContainer } from "../../styles/post/PostBoardStyle";
import {
  SearchBarInSearchPage,
  SearchContainerBox,
  SearchContentBox,
} from "../../styles/search/SearchContainerStyle";
import { SideOptionFormForPostBoard } from "../common/SideOptionForm";
import MoreLoadPostButton from "../post/MoreLoadPostButton";
import PostBoardBodyContainer from "../post/PostBoardBodyContainer";
import PostBoardTitleContainer from "../post/PostBoardTilteContainer";
import PostElement from "../post/PostElement";
import { BeforeSearchContentBox, PopularTagBox } from "./PopularTagBox";

const SearchContainer = ({
  onSearchSubmit,
  inputValue,
  onChange,

  isInputError,
  currentSearchKeyword,
  //onSearchInputChange,
  countResult,
  searchResults,
  isNextResultExist,
  onClick,
  onKeyUp,
  setTimeDepthValue,
  timeDepthSelect,
  setTimeDepthSelect,
  isResultDesc,
  setIsResultDesc,
  setOrderDescOrAsc,
  notSearch,
  isLoading,
}) => {
  const isTablet = useMediaQuery({ query: TabletQuery });

  const [isShowContainer, setIsShowContainer] = useState(false);
  const onShowSideContainer = useCallback(() => {
    setIsShowContainer((prev) => !prev);
  }, []);

  return (
    <SearchContainerBox>
      <SearchBarInSearchPage
        inputValue={inputValue}
        onChange={onChange}
        onSearchSubmit={onSearchSubmit}
        onKeyUp={onKeyUp}
        isInputError={isInputError}
      ></SearchBarInSearchPage>
      {notSearch ? (
        <BeforeSearchContentBox>
          <PopularTagBox></PopularTagBox>
        </BeforeSearchContentBox>
      ) : (
        <>
          <SearchContentBox>
            <PostBoardTitleContainer
              onShowSideContainer={onShowSideContainer}
              isShowContainer={isShowContainer}
            >
              '{currentSearchKeyword}' 검색 결과 : {countResult}개의 고민 포스트
              {/*중{" "} {searchResults.length}개 고민 포스트 표시*/}
            </PostBoardTitleContainer>
            {!isTablet && isShowContainer && (
              <SideOptionContainer>
                <SideOptionFormForPostBoard
                  onSearchSubmit={onSearchSubmit}
                  setTimeDepthValue={setTimeDepthValue}
                  timeDepthSelect={timeDepthSelect}
                  setTimeDepthSelect={setTimeDepthSelect}
                  isResultDesc={isResultDesc}
                  setIsResultDesc={setIsResultDesc}
                  setOrderDescOrAsc={setOrderDescOrAsc}
                ></SideOptionFormForPostBoard>
              </SideOptionContainer>
            )}

            <PostBoardBodyContainer>
              {searchResults.map((result) => (
                <PostElement key={result.id} post={result}></PostElement>
              ))}
              {isLoading
                ? "잠시만 기다려주세요"
                : !isNextResultExist && "검색 결과 마지막입니다."}
            </PostBoardBodyContainer>
            {isNextResultExist && (
              <MoreLoadPostButton updatePostList={onClick}>
                10개 더보기
              </MoreLoadPostButton>
            )}
          </SearchContentBox>
          {isTablet && (
            <SideOptionContainer>
              <SideOptionFormForPostBoard
                onSearchSubmit={onSearchSubmit}
                setTimeDepthValue={setTimeDepthValue}
                timeDepthSelect={timeDepthSelect}
                setTimeDepthSelect={setTimeDepthSelect}
                isResultDesc={isResultDesc}
                setIsResultDesc={setIsResultDesc}
                setOrderDescOrAsc={setOrderDescOrAsc}
              ></SideOptionFormForPostBoard>
            </SideOptionContainer>
          )}
        </>
      )}
    </SearchContainerBox>
  );
};

export default SearchContainer;
