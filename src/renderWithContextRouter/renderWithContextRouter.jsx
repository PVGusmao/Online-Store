import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import CommerceProvider, { CommerceContext } from "../context/CommerceProvider";

const renderWithContextRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <CommerceProvider value={CommerceContext}>{component}</CommerceProvider>
      </Router>
    ),
    history,
  };
};
export default renderWithContextRouter;
