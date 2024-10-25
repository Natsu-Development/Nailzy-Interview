import dotenv from "dotenv";
import express from "express";
import { route } from "./routing";

dotenv.config();
const app = express();
const port = process.env.PORT;
const domain = process.env.APP_DOMAIN_BE;

// router
route(app);

app.listen(port, () => {
	console.log(`Server is running on ${domain}:${port}`);
});
