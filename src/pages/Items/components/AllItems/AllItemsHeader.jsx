import React from "react";
import { Link } from "react-router-dom";
import filterMobile from "/icons/ic_filter_mobile.svg";
import filter from "/icons/ic_filter.svg";
import search from "/icons/ic_search.svg";
import { BestItemsTitle } from "../BestItems/BestItems.styles";
import {
  AllItemsHeaderStyle,
  AllItemsFilterButton,
  AllItemsFilterContainer,
  AllItemsSearchContainer,
  AllItemsSearchInput,
  AllItemsSearchIcon,
  AllItemsAddItemButton,
  AllItemsFilterIcon,
  AllItemsTopRow,
  AllItemsBottomRow,
  AllItemsSortMenu,
  AllItemsSortOption,
} from "./AllItems.styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllItemsHeader = ({
  isMobile,
  searchTerm,
  setSearchTerm,
  sortMenuOpen,
  setSortMenuOpen,
  handleSortOptionSelect,
  getSortButtonText,
  sortMenuRef,
  onSearch,
  loading,
}) => {
  const handleSearch = () => {
    onSearch(); // 검색 실행
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터 키를 눌렀을 때 검색 실행
    }
  };

  if (loading) {
    return isMobile ? (
      <header css={AllItemsHeaderStyle}>
        <div css={AllItemsTopRow}>
          <Skeleton width={92} height={30} style={{ marginBottom: 16 }} />
          <Skeleton width={100} height={36} />
        </div>
        <div css={AllItemsBottomRow}>
          <Skeleton width={220} height={36} style={{ marginRight: 12 }} />
          <Skeleton width={36} height={36} circle />
        </div>
      </header>
    ) : (
      <header css={AllItemsHeaderStyle}>
        <Skeleton width={92} height={30} style={{ marginBottom: 16 }} />
        <div css={AllItemsFilterContainer}>
          <Skeleton width={220} height={36} style={{ marginRight: 16 }} />
          <Skeleton width={120} height={36} style={{ marginRight: 16 }} />
          <Skeleton width={100} height={36} />
        </div>
      </header>
    );
  }

  return (
    <header css={AllItemsHeaderStyle}>
      {isMobile ? (
        <>
          <div css={AllItemsTopRow}>
            <h2 css={BestItemsTitle}>전체 상품</h2>
            <Link css={AllItemsAddItemButton} to="/additem">
              상품 등록하기
            </Link>
          </div>
          <div css={AllItemsBottomRow}>
            <div css={AllItemsSearchContainer}>
              <img
                src={search}
                alt="검색"
                css={AllItemsSearchIcon}
                onClick={handleSearch}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
                placeholder="검색할 상품을 입력해주세요"
                css={AllItemsSearchInput}
              />
            </div>
            <div style={{ position: "relative" }} ref={sortMenuRef}>
              <button
                css={AllItemsFilterButton}
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
              >
                <img src={filterMobile} alt="필터" css={AllItemsFilterIcon} />
              </button>
              {sortMenuOpen && (
                <div css={AllItemsSortMenu}>
                  <button
                    css={AllItemsSortOption}
                    onClick={() => handleSortOptionSelect("recent")}
                  >
                    최신순
                  </button>
                  <button
                    css={AllItemsSortOption}
                    onClick={() => handleSortOptionSelect("favorite")}
                  >
                    좋아요 순
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 css={BestItemsTitle}>전체 상품</h2>
          <div css={AllItemsFilterContainer}>
            <div css={AllItemsSearchContainer}>
              <img
                src={search}
                alt="검색"
                css={AllItemsSearchIcon}
                onClick={handleSearch}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
                placeholder="검색할 상품을 입력해주세요"
                css={AllItemsSearchInput}
              />
            </div>
            <Link css={AllItemsAddItemButton} to="/additem">
              상품 등록하기
            </Link>
            <div style={{ position: "relative" }} ref={sortMenuRef}>
              <button
                css={AllItemsFilterButton}
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
              >
                {getSortButtonText()}
                <img src={filter} alt="필터" css={AllItemsFilterIcon} />
              </button>
              {sortMenuOpen && (
                <div css={AllItemsSortMenu}>
                  <button
                    css={AllItemsSortOption}
                    onClick={() => handleSortOptionSelect("recent")}
                  >
                    최신순
                  </button>
                  <button
                    css={AllItemsSortOption}
                    onClick={() => handleSortOptionSelect("favorite")}
                  >
                    좋아요 순
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default AllItemsHeader;
