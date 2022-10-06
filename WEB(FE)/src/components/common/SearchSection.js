import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useForm } from "../../modules/useForm";
import { SearchButtonShape, SearchIcon } from "./Buttons";
import { SearchBar, SearchBarTablet } from "./InputBox";

const SearchBoxForDesktop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
`;

const SearchSmallBox = styled.div`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchTabletBox = styled.div`
  position: absolute;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchSection = ({ isDesktop, isSmallDesktop, isTablet }) => {
  const [state, onChange] = useForm({ searchWord: "" });
  return (
    <>
      {isDesktop ? (
        <SearchBoxForDesktop>
          <SearchBar
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBar>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchBoxForDesktop>
      ) : isSmallDesktop ? (
        <SearchSmallBox>
          <SearchBar
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요!!!!"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBar>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchSmallBox>
      ) : isTablet ? (
        <SearchTabletBox>
          <SearchBarTablet
            name="searchWord"
            type="search"
            placeholder="검색어를 입력하세요"
            value={state.searchWord}
            onChange={onChange}
            required
          ></SearchBarTablet>
          <SearchButtonShape>
            <SearchIcon></SearchIcon>
          </SearchButtonShape>
        </SearchTabletBox>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchSection;
