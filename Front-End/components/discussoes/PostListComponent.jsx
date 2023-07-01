import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import LoadingPostListComponent from "./LoadingPostListComponent";
import { useRouter } from "next/router";
import { paginate } from "@/utils/pageUtils";

const PostCardComponent = dynamic(
  () => import("./PostCardComponent"),
  {
    ssr: false,
  }
);

function PaginationButton(props) {
  const className = twMerge(
    "p-2 rounded-md border hover:bg-blue-500 hover:text-white",
    props.className
  );
  return <button {...props} className={className} />;
}

export default function PostListComponent({ query }) {
  const router = useRouter();

  if (!router.query.page) {
    router.query.page = 1;
    router.push(router, null, { shallow: true });
  }
  if (!!router.query.title === null) {
    router.query.title = "";
    router.push(router, null, { shallow: true });
  }

  const [postList, setPostList] = useState(null);

  useEffect(() => {
    setPostList(() => null);

    async function fetchData() {
      const response = await fetch(
        `api/post/SEARCH/search?page=${router.query.page}&title=${router.query.title}&caseId=${query}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const postList = await response.json();

      setPostList(() => {
        return postList;
      });
    }

    fetchData();
  }, [router.query, query]);

  if (!postList) {
    return <LoadingPostListComponent />;
  }

  if (router.query.page > postList.totalPages) {
    router.push({
      query: { page: postList.totalPages, title: router.query.title }
    }, null, {shallow: true})
  }

  return (
    <>
      <ul className="grid w-full auto-rows-auto gap-8 md:grid-cols-2 max-[400px]:justify-center">
        {postList.data.map((post) => {
          return (
            <li key={post.id} className="w-full">
              <PostCardComponent {...post} />
            </li>
          );
        })}
      </ul>
      {!postList.empty && (
        <div className="flex gap-2 justify-center">
          {router.query.page > 1 && (
            <>
              <PaginationButton
                onClick={() => {
                  if (parseInt(router.query.page === 1)) return;
                  router.push({
                    query: { page: 1, title: router.query.title}
                  }, null, { shallow: true });
                }}
                className="max-sm:hidden"
              >
                <HiOutlineChevronDoubleLeft className="h-5 w-5" />
              </PaginationButton>
              <PaginationButton
                onClick={() => {
                  if (parseInt(router.query.page) <= 1) return;
                  router.push({
                    query: { page: parseInt(router.query.page) - 1, title: router.query.title }
                  }, null, { shallow: true });
                }}
              >
                <HiOutlineChevronLeft className="h-5 w-5" />
              </PaginationButton>
            </>
          )}
          {paginate(router.query.page, postList.totalPages).map((value) => {
            if (typeof value !== "number")
              return (
                <div className="rounded-md border p-2 text-center max-sm:hidden">
                  <p className="h-5 w-5">...</p>
                </div>
              );

            return (
              <PaginationButton
                key={value}
                disabled={parseInt(router.query.page) === value}
                onClick={() => {
                  router.push({
                    query: { page: value, title: router.query.title }
                  }, null, { shallow: true });
                }}
                className={
                  parseInt(router.query.page) === value &&
                  "bg-blue-500 text-white"
                }
              >
                <p className="h-5 w-5">{value}</p>
              </PaginationButton>
            );
          })}
          {router.query.page < postList.totalPages && (
            <>
              <PaginationButton
                onClick={() => {
                  router.push({
                    query: {page: parseInt(router.query.page) + 1, title: router.query.title}
                  }, null, { shallow: true });
                }}
              >
                <HiOutlineChevronRight className="h-5 w-5" />
              </PaginationButton>

              <PaginationButton
                onClick={() => {
                  router.push({
                    query: { page: parseInt(postList.totalPages), title: router.query.title}
                  }, null, { shallow: true });
                }}
                className="max-sm:hidden"
              >
                <HiOutlineChevronDoubleRight className="h-5 w-5" />
              </PaginationButton>
            </>
          )}
        </div>
      )}
    </>
  );
}
