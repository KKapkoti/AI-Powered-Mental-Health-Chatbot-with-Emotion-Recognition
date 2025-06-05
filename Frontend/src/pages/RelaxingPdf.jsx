
import React from 'react';
import book1Cover from '../images/100 ways.png';
import book2Cover from '../images/Change_your_day.jpg';
import book3Cover from '../images/The little book.jpg';
import book4Cover from '../images/think straigth.jpg';
import book5Cover from '../images/MentalHealthCare.jpg';
// Add more imports as needed

const RelaxingPdf = () => {
  const books = [
    {
      title: '100 Ways to Motivate',
      image: book1Cover,
      pdf: '/pdfs/100 Ways to Motivate Yourself Change Your Life Forever.pdf', // path relative to public/
    },
    {
      title: 'Change your day',
      image: book2Cover,
      pdf: '/pdfs/Change Your Day-Not Your Life.pdf',
    },
    {
      title: 'The Little Book',
      image: book3Cover,
      pdf: '/pdfs/The_little_book_of_mental_health.pdf',
    }, {
      title: 'Think Straight',
      image: book4Cover,
      pdf: '/pdfs/Think_Straight.pdf',
    },
    {
      title: 'Mental Health Care',
      image: book5Cover,
      pdf: '/pdfs/Mental Health Care.pdf',
    },
  ];


return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4 text-center">Relaxing PDF Books</h2>
    <div className="book-gallery-container">
      <div className="book-gallery-row">
        {books.map((book) => (
          <div key={book.title} className="book-card">
            <a href={book.pdf} download>
              <img src={book.image} alt={book.title} />
              <p className="book-card-title">{book.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};


export default RelaxingPdf;
