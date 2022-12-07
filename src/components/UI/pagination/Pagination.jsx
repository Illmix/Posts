import React from 'react';
import MyButton from "../button/MyButton";
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({page, changePage, totalPages}) => {
    let pagesArray = usePagination(totalPages);
    return (
        <div style={{display: "flex", justifyContent: 'space-between', margin: "10px 0"}}>
            {pagesArray.map(p =>
                <MyButton key={p} onClick={()=>changePage(p)}>
                <span
                    className={page === p
                        ?
                        'page__current'
                        :
                        'page'
                    }>{p}</span>
                </MyButton>
            )}
        </div>
    );
};

export default Pagination;