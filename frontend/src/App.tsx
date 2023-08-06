import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BooksCard, { Book } from './BookCard';
// import reactLogo from './assets/react.svg';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from './utils/axios';

export interface Query {
  page: number;
  limit: number;
}

function App() {
  const [hasMore, setHasMore] = useState(true);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = useRef<Query>({ page: 1, limit: 15 });

  const fetchBooks = async (reset: boolean = false) => {
    setIsLoading(true);
    await axiosInstance
      .get(`/books?page=${query.current.page}&limit=${query.current.limit}`)
      .then((res) => {
        setIsLoading(false);
        const arr = reset ? res.data.data : [...bookList, ...res.data.data];
        setBookList(arr);
        if (res.data.total > arr.length) {
          setHasMore(true);
          query.current.page = query.current.page + 1;
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log({ err });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className='flex flex-col items-center justify-between deviceHeight relative overflow-hidden'>
      <div className='flex-1 w-full overflow-auto font-sans'>
        <section>
          <InfiniteScroll
            dataLength={bookList?.length}
            next={fetchBooks}
            hasMore={hasMore}
            loader={
              isLoading && (
                <ScaleLoader color='rgb(0, 255, 204)' className='text-center' />
              )
            }
            refreshFunction={() => {
              query.current.page = 1;
              fetchBooks(true);
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center', color: 'green' }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center', color: 'green' }}>
                &#8593; Release to refresh
              </h3>
            }>
            <div className='pb-4 text-black truncate '>
              <div className='m-4 text-lg text-center font-bold font-notaSans'>
                Books
              </div>
              {bookList.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 m-1 place-items-center'>
                  {bookList?.map((book: Book) => (
                    <BooksCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className='text-center'>Books not found!</div>
              )}
            </div>
          </InfiniteScroll>
        </section>{' '}
      </div>
    </main>
  );
}

export default App;
