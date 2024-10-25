import { Express } from "express";

import { other_route } from "./other-route";

export const route = (app: Express) => {
	app.use("/", other_route);
};
