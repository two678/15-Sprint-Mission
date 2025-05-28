import { useState, useRef, useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import useProducts from "@/hooks/useProducts";
import useScreenSize from "@/hooks/useScreenSize";
import heart from "/icons/ic_heart.svg";
import defaultImage from "/images/Img_default.png";
import {
  BestItemsContainer,
  BestItemsHeartContainer,
  BestItemsHeart,
  BestItemsName,
  BestItemsPrice,
} from "../BestItems/BestItems.styles";
import {
  AllItemsGridContainer,
  AllItemsContainer,
  AllItemsImage,
} from "./AllItems.styles";
import { Link } from "react-router-dom";
import AllItemsHeader from "./AllItemsHeader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AllItems() {
  const { isMobile, isTablet } = useScreenSize();
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState("recent");
  const sortMenuRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { items, totalCount, loading, error } = useProducts(
    currentPage,
    10,
    sortOption,
    keyword
  );

  const onPageChange = (e, page) => {
    setCurrentPage(page);
  };

  const displayItems = isMobile
    ? items?.slice(0, 4)
    : isTablet
    ? items?.slice(0, 6)
    : items;

  // 정렬 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 정렬 옵션 선택 핸들러
  const handleSortOptionSelect = (option) => {
    setSortOption(option);
    setCurrentPage(1);
    setSortMenuOpen(false);
  };

  // 검색 실행 핸들러
  const handleSearch = () => {
    setKeyword(searchTerm);
    setCurrentPage(1);
  };

  const getSortButtonText = () => {
    if (isMobile) return "";
    return sortOption === "recent" ? "최신순" : "좋아요 순";
  };

  // 상품 목록 Skeleton 개수
  const skeletonCount = isMobile ? 4 : isTablet ? 6 : 10;

  return (
    <section css={BestItemsContainer}>
      <AllItemsHeader
        isMobile={isMobile}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortMenuOpen={sortMenuOpen}
        setSortMenuOpen={setSortMenuOpen}
        handleSortOptionSelect={handleSortOptionSelect}
        getSortButtonText={getSortButtonText}
        sortMenuRef={sortMenuRef}
        onSearch={handleSearch}
        loading={loading}
      />
      <main>
        {error ? (
          <div>에러: {error}</div>
        ) : loading ? (
          <ul css={AllItemsGridContainer}>
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <li key={i}>
                <Skeleton width={221} height={243} />
                <Skeleton width="70%" height={24} style={{ marginBottom: 8 }} />
                <Skeleton width="40%" height={20} />
              </li>
            ))}
          </ul>
        ) : Array.isArray(items) && items.length > 0 ? (
          <ul css={AllItemsGridContainer}>
            {displayItems.map((item) => (
              <Link key={item.id} to={`/items/${item.id}`}>
                <article css={AllItemsContainer}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {item.images && (
                      <img
                        src={item.images}
                        alt={item.name}
                        css={AllItemsImage}
                        onError={(e) => {
                          e.target.src = defaultImage;
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 css={BestItemsName}>{item.name}</h3>
                    <p css={BestItemsPrice}>{item.price?.toLocaleString()}원</p>
                    <p css={BestItemsHeartContainer}>
                      <img src={heart} alt="좋아요" css={BestItemsHeart} />
                      {item.favoriteCount}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </ul>
        ) : (
          <div>상품이 없습니다.</div>
        )}
      </main>
      {!loading && (
        <Pagination
          count={Math.ceil(totalCount / 10)}
          page={currentPage}
          onChange={onPageChange}
          defaultPage={1}
          siblingCount={2}
          size="medium"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "15px 0",
            margin: "0 auto 58px",
            "& .MuiPaginationItem-ellipsis": {
              display: "none",
            },
          }}
          renderItem={(item) => {
            if (item.type === "page") {
              const pageNum = item.page;
              let startPage, endPage;
              if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
              } else if (currentPage >= Math.ceil(totalCount / 10) - 2) {
                startPage = Math.max(1, Math.ceil(totalCount / 10) - 4);
                endPage = Math.ceil(totalCount / 10);
              } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
              }
              if (pageNum < startPage || pageNum > endPage) {
                return null;
              }
            }
            return <PaginationItem {...item} sx={{ fontSize: 12 }} />;
          }}
        />
      )}
    </section>
  );
}

export default AllItems;
