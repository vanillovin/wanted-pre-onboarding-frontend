import { createBrowserRouter } from "react-router-dom";
import paths from "./paths";

const router = createBrowserRouter(paths, {
  basename: process.env.PUBLIC_URL,
});

export default router;
