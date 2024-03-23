import "../../bootstrap-5.3.2/bootstrap.min.css";
import "ui-kit/style.css";
import {Device} from "ui-kit";
import AppRouter from "./app-router";

document.addEventListener("DOMContentLoaded", () => {
  const router = new AppRouter();
  Device.run(document.getElementById("-ui-kit-root"), router);
});
