import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import fetch from "isomorphic-fetch";

const app = new Koa();
const router = new Router();
const port = 3011;

app.use(cors({ origin: "*" }));

router.get("/", (ctx) => {
  ctx.body = "hello!";
});


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Added by:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Brian Reisman>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Create an endpoint on http://localhost:3011 at /dogPix.
//Since we are reaching out to dog.ceo/api we are dealing with asynchronous behavior. I will deal with this using the async/await pattern.
//In the get request to this localhost:3011/dogPix endpoint I have embedded a breed= query-string which here I extract off the ctx object and then embed again into the dog.ceo fetch request.
//For fun I added a default value using the || operator inside my string interpolation so if a submit is made without any input value, it will return a Golden Retriever
router.get("/dogPix", async (ctx) => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${
      ctx.request.query.breed || "retriever/golden"
    }/images/random`
  );
  ctx.body = await response.json();
});

router.get("/catFact", async (ctx) => {
  const response = await fetch("https://catfact.ninja/fact");
  ctx.body = await response.json();
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Added by:^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Brian Reisman^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


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
