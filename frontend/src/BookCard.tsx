/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface Book {
  id: number;
  title: string;
  description: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatCurrency = (amount: number) => {
  return currencyFormatter.format(amount);
};

const BooksCard = React.memo(({ book }: { book: Book }) => (
  <div className='py-2 w-fit'>
    <div className='bg-customWhite w-fit'>
      <img
        className='object-cover w-full h-full'
        src={book.coverImage}
        alt={book.coverImage || 'No Image Found'}
      />
    </div>
    <div className='flex flex-col bg-white px-3 py-2'>
      <p className='flex-1 text-sm text-customDarkGray font-notaSans'>
        {book.title}
      </p>
      <div className='flex flex-row items-baseline'>
        <h6 className='text-sm flex-1 text-customRed font-roboto'>{`${book.discountRate}%`}</h6>
        <h5 className='text-base text-customBlack font-roboto'>{`${formatCurrency(
          book.price
        )}`}</h5>
      </div>
    </div>
  </div>
));

export default BooksCard;
