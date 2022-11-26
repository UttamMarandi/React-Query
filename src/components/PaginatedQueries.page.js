import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const INITIAL_PAGE_NUMBER = 1;

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber], // pagenNumber is the querykey
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4} // last page number should come from the api
        >
          Next Page
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
};
