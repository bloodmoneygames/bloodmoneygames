'use client';

import styles from './styles/TopGames.module.scss';
import {IPostCard} from "@/utils/interfaces/posts";
import TopGame from './TopGame';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useSuspenseQuery} from "@apollo/client";
import {QUERY_TOP_POSTS} from "@/utils/data/posts";
import {mapPostCardData} from "@/utils/helpers/posts";
import {IQueryData} from "@/utils/interfaces/commons";

const TopGames = () => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef<SwiperType>();

  const { data } = useSuspenseQuery<IQueryData>(QUERY_TOP_POSTS);
  const posts = data?.posts.edges.map(({node = {}}) => node);
  const topPosts = Array.isArray(posts) && posts.map(mapPostCardData);

  useEffect(() => {
    setSlidesPerView(calcSlidesPerView());
  }, []);

  function calcSlidesPerView() {
    let view = 2;

    if (window.innerWidth > 1024) {
      view = 10;
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      view = 8;
    } else if (window.innerWidth < 768 && window.innerWidth > 640) {
      view = 6;
    } else if (window.innerWidth < 640 && window.innerWidth > 460) {
      view = 4;
    } else if (window.innerWidth < 460 && window.innerWidth > 320) {
      view = 3;
    }

    return view;
  }

  if (!topPosts) {
    return null;
  }

  return (
    <section className={styles.topGames}>

      <div
        className={styles.sideWidget}
      >
        <div className={styles.topGamesWrapper}>
          <Swiper
            className={styles.topGamesSlider}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {topPosts.map((post) => {
              return (
                <SwiperSlide key={post.slug}>
                  <TopGame
                    post={post}
                    key={post.slug}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={styles.topGamesNavs}>
            <button
              className={styles.topGamesNavPrev}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg className="icon" width="20px" height="20px">
                <use href="#angle-left"></use>
              </svg>
            </button>
            <button
              className={styles.topGamesNavNext}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg className="icon" width="20px" height="20px">
                <use href="#angle-right"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopGames;
