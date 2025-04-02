"use client";

import MovieCard from "./movie-card";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { searchState } from "@/utils/recoil/atoms";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
  const search = useRecoilValue(searchState); // 해당 state의 값만 가져옴

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search],
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage) =>
        // 마지막으로 호출한 페이지 값에 + 1
        lastPage.page ? lastPage.page + 1 : null,
    });

  const { ref, inView } = useInView();

  console.log(inView);

  useEffect(() => {
    // inview 노출에 다음 페이지가 있고, 현재 fetching 중이 아닐때
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="grid gap-1 grid-cols-3 md:grid-cols-4 w-full h-full">
      {/* 데이터를 가지고 오거나, 다음 데이터를 가지고 오고 있는 상황 */}
      {isFetching || (isFetchingNextPage && <Spinner />)}

      {/* data에는 data.pageParams (현재 어느 페이지에 있는지),
        data.pages (전체 페이지 데이터를 가지고 있음),
        필요한 데이터는 data.pages 로 해당 데이터 전체를 조회
      */}

      {/* 각 페이지마다 영화 데이터가 있어, 배열이 이중으로 중첩된 모습
      [[{1}, {2}], [{3}, {4}]]
      으로 flat() 함수를 사용하여 
      [{1}, {2}, {3}, {4}]
      으로 변경
      */}
      {
        <>
          {data?.pages
            ?.map((page) => page.data) // 각 페이지 조회에서 영화데이터만 가져옴 (어느 페이지인지, 페이지 안의 데이터 개수 등)
            ?.flat()
            .map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}

          {/* 맨 밑 무한스크롤을 위한 ref, ref가 감지되면 inview 가 true */}
          <div ref={ref} />
        </>
      }
    </div>
  );
}
