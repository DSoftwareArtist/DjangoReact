import React from "react";
import { createRoot } from 'react-dom/client';

export const mount = (App, rootId) => {
  const domNode = document.getElementById(rootId);
  const root = createRoot(domNode);
  if (root.hasChildNodes()) {
    root.hydrate(<App />, root);
  } else {
    root.render(<App />);
  }
};