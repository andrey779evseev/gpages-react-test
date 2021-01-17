import React from 'react';
import SamuraiJSApp from "./App";
import {unmountComponentAtNode, render} from "react-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<SamuraiJSApp />, div);
  unmountComponentAtNode(div);
});