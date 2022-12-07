import {useMemo} from "react";

export const usePagination = (totalCount) => {
    let result = [];
    useMemo(()=>{
        for (let i = 0; i<totalCount; i++) {
            result.push(i+1)
        }
    }, [totalCount, result])
    return result
}
