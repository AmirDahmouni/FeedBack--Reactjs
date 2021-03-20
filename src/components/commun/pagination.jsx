import React, { Component } from 'react';
import _ from "lodash";
const Pagination=(props)=>{
    const {itemsCount,pageSize,onChangePage,currentPage}=props;
    const pagesCount=Math.ceil(itemsCount/pageSize);
    if(pagesCount===1) return null;
    const pages= _.range(1,pagesCount+1);
    console.log(currentPage);
   return (
    <div className="col-12 col-12-small">
        {
            pages.map(page=>(<li key={page} 
            className={page==currentPage?"button primary small":"button small"} 
            onClick={()=>onChangePage(page)}>{page}</li>))

        }
    </div>
   );
}
 
export default Pagination;