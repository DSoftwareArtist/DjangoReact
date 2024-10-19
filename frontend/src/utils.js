import React from "react";
import { createRoot, hydrateRoot } from 'react-dom/client';

export const mount = (App, rootId) => {
  const domNode = document.getElementById(rootId);
  if (!domNode) {
    console.error(`No element found with id "${rootId}"`);
    return;
  }

  if (domNode.hasChildNodes()) {
    hydrateRoot(domNode, <App />);
  } else {
    const root = createRoot(domNode);
    root.render(<App />);
  }
};
