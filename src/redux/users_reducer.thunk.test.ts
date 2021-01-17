import {actions, follow, unfollow} from './users_reducer';
import {usersAPI} from '../api/users- api';
import {ResponsesType, ResultCodesEnum} from '../api/api';

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

jest.mock('../api/users- api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const result: ResponsesType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})