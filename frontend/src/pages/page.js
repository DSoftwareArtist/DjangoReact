import React from "react";
import { Test } from "comps";
import { mount } from "utils";

export const getApp = ({message}) => {
  const App = () => {
    return <div className="container">
      { message }
      <Test></Test>
    </div>
  };
  return App;
};


if (!window.IS_SSR) {
  const App = getApp(window.REACT_CONTEXT);
  mount(App, "app");
}
