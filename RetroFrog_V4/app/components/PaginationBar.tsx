import { Link, useSearchParams } from '@remix-run/react';
import {
  DoubleLeftArrow,
  DoubleRightArrow,
  LeftArrow,
  RightArrow,
} from './general/IconsSVG';

export default function PaginationBar({ total }: { total: number }) {
  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get('$skip')) || 0;
  const top = Number(searchParams.get('$top')) || 10;
  const totalPages = Math.ceil(total / top);
  const currentPage = Math.floor(skip / top) + 1;
  const maxPages = 7;
  const halfMaxPages = Math.floor(maxPages / 2);
  const canPageBackwards = skip > 0;
  const canPageForwards = skip + top < total;
  const pageNumbers = [] as Array<number>;

  function setSearchParamsString(
    searchParams: URLSearchParams,
    changes: Record<string, string | number | undefined>,
  ) {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value === undefined) {
        newSearchParams.delete(key);
        continue;
      }
      newSearchParams.set(key, String(value));
    }
    // Print string manually to avoid over-encoding the URL
    // optional: return newSearchParams.toString()
    return Array.from(newSearchParams.entries())
      .map(([key, value]) =>
        value ? `${key}=${encodeURIComponent(value)}` : key,
      )
      .join('&');
  }

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex mt-4 items-center gap-1">
      <Link
        to={{
          search: setSearchParamsString(searchParams, {
            skip: 0,
          }),
        }}
        preventScrollReset
        prefetch="intent"
        className={`text-neutral-600 rounded-md p-2 hover:bg-primary ${
          !canPageBackwards ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <span className="sr-only"> First page</span>
        <DoubleLeftArrow />
      </Link>

      <Link
        to={{
          search: setSearchParamsString(searchParams, {
            skip: Math.max(skip - top, 0),
          }),
        }}
        preventScrollReset
        prefetch="intent"
        className={`text-neutral-600 rounded-md p-2 hover:bg-primary ${
          !canPageBackwards ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <span className="sr-only"> Previous page</span>
        <LeftArrow></LeftArrow>
      </Link>

      {pageNumbers.map((pageNumber) => {
        const pageSkip = (pageNumber - 1) * top;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <Link
            key={pageNumber}
            to={{
              search: setSearchParamsString(searchParams, {
                skip: pageSkip,
              }),
            }}
            preventScrollReset
            prefetch="intent"
            aria-current={isCurrentPage ? 'page' : undefined} // Indica la página actual para accesibilidad
            className={`w-8 h-8 flex items-center justify-center rounded-md transition
        ${
          isCurrentPage
            ? 'bg-primary text-white font-bold pointer-events-none'
            : 'text-primary-reverse hover:bg-neutral-200'
        }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Link
        to={{
          search: setSearchParamsString(searchParams, {
            skip: skip + top,
          }),
        }}
        preventScrollReset
        prefetch="intent"
        className={`text-neutral-600 rounded-md p-2 hover:bg-primary ${
          !canPageForwards ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <span className="sr-only"> Next page</span>
        <RightArrow></RightArrow>
      </Link>

      <Link
        to={{
          search: setSearchParamsString(searchParams, {
            skip: (totalPages - 1) * top,
          }),
        }}
        preventScrollReset
        prefetch="intent"
        className={`text-neutral-600 rounded-md p-2 hover:bg-primary ${
          !canPageForwards ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <span className="sr-only"> Last page</span>
        <DoubleRightArrow />
      </Link>
    </div>
  );
}
