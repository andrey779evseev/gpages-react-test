import React, {FC, useEffect} from 'react';
import s from './Users.module.css';
import Paginator from '../../common/Paginator/Paginator';
import User from './User';
import {UsersSearchForm} from './UseraSearchForm';
import {follow, unfollow, FilterType, getUsers, actions} from '../../redux/users_reducer';
import {useDispatch, useSelector} from "react-redux";
import {
    currentPageGet, followingInProgressGet,
    getUsersFilterGet,
    pageSizeGet,
    totalUsersCountGet,
    usersGet
} from "../../redux/users_selectors";
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";


type  QueryParamsType = {term?: string, friend?: string, page?: string}
const Users: FC = () => {
    const totalUsersCount = useSelector(totalUsersCountGet)
    const currentPage = useSelector(currentPageGet)
    const pageSize = useSelector(pageSizeGet)
    const filter = useSelector(getUsersFilterGet)
    const users = useSelector(usersGet)
    const followingInProgress = useSelector(followingInProgressGet)

    const dispatch = useDispatch()
    const history = useHistory()





    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, friend: string, page: string}

        let actualPage = currentPage
        let actualFilter = filter

        if(parsed.page) actualPage = +parsed.page
        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])



    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const follows = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollows = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const setCurrentPage = (pageNumber: number) => {
        dispatch(actions.setCurrentPage(pageNumber))
    }




    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
        setCurrentPage(pageNumber)
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
        setCurrentPage(currentPage)
    }

    return <div>
        <UsersSearchForm  onFilterChanged={onFilterChanged}/>
        <Paginator totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>

        <div className={s.block}>
            <h2>Users</h2>
            {users.map(u => <User user={u}
                                        followingInProgress={followingInProgress}
                                        unfollow={unfollows}
                                        follow={follows}
                                        key={u.id}/>)}
        </div>
    </div>
}


export default Users