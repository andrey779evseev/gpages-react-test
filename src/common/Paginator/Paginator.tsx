import React, {FC} from "react";
import {Pagination} from "antd";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: FC<PropsType> = (props) => {

    return <Pagination defaultCurrent={2}  style={{marginLeft: 200}} pageSize={5} showSizeChanger={false} onChange={props.onPageChanged} total={props.totalUsersCount} />
}

export default Paginator