import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
// todo fix that
describe("ProfileStatus component", () => {
    test("status from props should be in th state", () => {
        const component = create(<ProfileStatus updateUserStatus={()=>{}} status="good day"/>);
        const instance: any | null = component.getInstance();
        expect(instance.state.status).toBe("good day");
    });
    test("after creation component span should be displayed", () => {
        const component = create(<ProfileStatus  updateUserStatus={()=>{}} status="good day"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation component span with status should be displayed", () => {
        const component = create(<ProfileStatus updateUserStatus={()=>{}} status="good day"/> );
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("good day");
    });
    test("input should be displayed instead of span", () => {
        const component = create(<ProfileStatus updateUserStatus={()=>{}} status="good day"/> );
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("good day");
    });
});
