import React from 'react';
import Pagination from '@mui/material/Pagination';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Navigation = function ({ pagesCount, currentPage, setCurrentPage }) {
    return (
        <>
            <Pagination
                className="pagination"
                shape="rounded"
                count={pagesCount}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
            />

            <nav>
                <button
                    type="button"
                    className="previous"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ArrowBackIosIcon fontSize="large" />
                </button>
                <button
                    type="button"
                    className="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= pagesCount}
                >
                    <ArrowForwardIosIcon fontSize="large" />
                </button>
            </nav>
        </>
    );
};

export default Navigation;
