import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";

// Commented out so it doesn't get auto-removed by text editors. You may uncomment if needed.
import fetch from "isomorphic-fetch";

//*my code
// fetch("https://catfact.ninja/fact")
// .then((res) => res.json())
// .then((res) => {
// console.log(res.fact);
// quote.textContent = res.fact
// })
// .catch((err) => console.log(err));
//*my code

// Used for reading incoming POST bodies. Commented out for same reason as above.
// See https://github.com/dlau/koa-body#usage-with-koa-router
// import koaBody from "koa-body";

const app = new Koa();
const router = new Router();
const port = 3011;

app.use(cors({ origin: "*" }));

router.get("/", (ctx) => {
  ctx.body = "hello!";
});




























//* acpet any get request to the given path

router.get("/dogPix", async (ctx) => {
  const response =  await fetch(`https://dog.ceo/api/breed/african/images/random`) //!need dynamic value for god.ceo call
	ctx.body = await response.json()
});


//?try/catch
//?callback
//?async/await


router.get("/catFact", async (ctx) => {
  const response =  await fetch(`https://catfact.ninja/fact`)
	ctx.body = await response.json()
});

//*




























app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
