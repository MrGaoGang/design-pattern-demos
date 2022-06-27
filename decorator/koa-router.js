const Router = require("@koa/router");
const router = new Router();

router.get("/user/login", async (ctx, next) => {
  ctx.body = name; //name is abave class UserController login returned
  await next();
});

router.post("/user/myRegister", async (ctx, next) => {
  ctx.body = user;
  await next();
});

@Controller({
    path: "user",
  })
  export class UserController {
    login({ name }: User) {
      console.log("param", name);
      return name;
    }
  
    @Method({
      path: "myRegister",
      method: "POST",
    })
    async register({ name, pass }: User) {
      const user = new User();
      user.name = name;
      user.pass = pass;
      await mysql().getRepository(User).save(user);
      return user;
    }
  }