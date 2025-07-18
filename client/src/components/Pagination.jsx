import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, basePath }) => {
  const navigate = useNavigate();
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      navigate(`${basePath}/${page}`);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container" aria-label="Paginación">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="page-item next"
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;