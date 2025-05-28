import useScreenSize from "@/hooks/useScreenSize";
import useProducts from "@/hooks/useProducts";
import {
  BestItemsContainer,
  BestItemsTitle,
  BestItemsGridContainer,
  BestItemsImage,
  BestItemsHeart,
  ItemsContainer,
  BestItemsName,
  BestItemsHeartContainer,
  BestItemsPrice,
} from "./BestItems.styles";
import heart from "/icons/ic_heart.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function BestItems() {
  const { isMobile, isTablet } = useScreenSize();
  const { items, loading, error } = useProducts(1, 4, "favorite");

  if (loading) {
    const skeletonCount = isMobile ? 1 : isTablet ? 2 : 4;
    const imageWidth = isTablet || isMobile ? 343 : 282;
    const imageHeight = isMobile || isTablet ? 387 : 318;
    const nameWidth = isMobile ? 100 : isTablet ? 140 : 166;
    const priceWidth = isMobile ? 60 : isTablet ? 80 : 100;

    return (
      <div css={BestItemsContainer}>
        <Skeleton width={92} height={30} />
        <ul css={BestItemsGridContainer}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <li key={i}>
              <Skeleton
                width={imageWidth}
                height={imageHeight}
                style={{ marginBottom: 12 }}
              />
              <Skeleton
                width={nameWidth}
                height={24}
                style={{ marginBottom: 8 }}
              />
              <Skeleton width={priceWidth} height={20} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) return <div>에러: {error}</div>;
  if (!Array.isArray(items) || items.length === 0)
    return <div>상품이 없습니다.</div>;

  const displayItems = isMobile
    ? items.slice(0, 1)
    : isTablet
    ? items.slice(0, 2)
    : items;

  return (
    <section css={BestItemsContainer}>
      <header>
        <h2 css={BestItemsTitle}>베스트 상품</h2>
      </header>
      <main>
        <ul css={BestItemsGridContainer}>
          {displayItems.map((item) => (
            <Link key={item.id} to={`/items/${item.id}`}>
              <article css={ItemsContainer}>
                {item.images && (
                  <img src={item.images} alt={item.name} css={BestItemsImage} />
                )}
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
      </main>
    </section>
  );
}

export default BestItems;
