import React from "react";
import profileReducer, {actions} from "./profile_reducer";
import {PostType, ProfileType} from "../types/types";


let state = {
    posts: [
        {id: 1, message: 'What is your name?', likesCount: 12},
        {id: 2, message: 'My name is Andrew', likesCount: 24},
        {id: 3, message: 'Hi', likesCount: 15},
        {id: 4, message: 'Hi', likesCount: 2},
        {id: 5, message: 'My friend', likesCount: 6},
        {id: 6, message: 'Yes', likesCount: 19},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

describe("",() => {
    test('length of posts should be incremented', () => {
        // 1. Test data
        let action = actions.addPostActionCreator("Gosha Dimych")
        //2. Action
        let newState = profileReducer(state, action)

        //3. Expectation
        expect(newState.posts.length).toBe(7)
    });

    test('message text of new post should be correct', () => {
        // 1. Test data
        let action = actions.addPostActionCreator("Gosha")
        //2. Action
        let newState = profileReducer(state, action)

        //3. Expectation
        expect(newState.posts[0].message).toBe("Gosha")
    });

    test('after deleting length of posts should be increment', () => {
        // 1. Test data
        let action = actions.deletePost(1)
        //2. Action
        let newState = profileReducer(state, action)

        //3. Expectation
        expect(newState.posts.length).toBe(5)
    });

    test("after deleting length of posts shouldn't be increment if id is incorrect", () => {
        // 1. Test data
        let action = actions.deletePost(1000)
        //2. Action
        let newState = profileReducer(state, action)

        //3. Expectation
        expect(newState.posts.length).toBe(6)
    });
})


