import { type JSX } from "react";
import { Routes, Route } from "react-router";
import { PATH_GIOCO, PATH_HOME } from "../path";
import { Home, Gioco, NotFound } from "../components";

export const SwitchContent = (): JSX.Element => (
  <Routes>
    <Route path={PATH_HOME} element={<Home />} />
    <Route path={PATH_GIOCO} element={<Gioco />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
