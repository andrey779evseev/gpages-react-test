import usersReducer, {actions, initialStateType} from './users_reducer';

let state: initialStateType


beforeEach(() => {
    state = {
        users: [
            {
                followed: false, id:0, name: "first name",
                status: "first status", photos:{small: null, large: null}
            },
            {
                followed: false, id:1, name: "second name",
                status: "second status", photos:{small: null, large: null}
            },
            {
                followed: true, id:2, name: "third name",
                status: "third status", photos:{small: null, large: null}
            },
            {
                followed: true, id:3, name: "fourth name",
                status: "fourth status", photos:{small: null, large: null}
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})
test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(2))
    expect(newState.users[2].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
})