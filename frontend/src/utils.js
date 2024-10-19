import React, { useEffect } from "react";
import { hydrate, render } from "react-dom";

export const mount = (App, rootId) => {
  const root = document.getElementById(rootId);
  if (root.hasChildNodes()) {
    hydrate(<App />, root);
  } else {
    render(<App />, root);
  }
};

export const useOutsideClick = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const intWithCommas = (x) => {
  const rounded = Math.round(Number(String(x).replace(",", "")));
  if (isNaN(rounded)) {
    return "";
  } else {
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const debounce = (delay) => {
  let timer = null;
  return (func) => {
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
};

// Debounce user input, returns a promise
export const debouncePromise = (delay) => {
  let timer = null;
  return (func) => {
    return (...args) =>
      new Promise((resolve) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args).then(resolve), delay);
      });
  };
};

// Wait n seconds
export const waitSeconds = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay * 1000));


export const getSearchResults = (searchURL, query, page_qs) => {
  let url;
  if (page_qs) {
    url = `${searchURL}${page_qs}`;
  } else {
    const qs = new URLSearchParams(query).toString();
    url = `${searchURL}?${qs}`;
  }
  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(url, config)
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error when fetching search results:", err.message);
    });
};

export const getSearchQuery = (q) => ({
  ...q,
  price_lower: q.price_lower || "",
  price_upper: q.price_upper || "",
});

// Set URL query parameters
export const setQueryParam = (key, value) => {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  history.replaceState(null, "", url.toString());
};

export const NoResults = () => <h2 className="no-results">No results found</h2>;