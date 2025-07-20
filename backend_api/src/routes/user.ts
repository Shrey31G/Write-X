import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@shrey_gangwar/main_medium";
import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                username: body.username,
                name: body.name
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token,
            userId: user.id,
            username: user.username
        })
    } catch (error) {
        c.status(411);
        return c.text("User already exist")
    }
})

userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid signin credentials" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403);
            return c.text("Invalid email and password")
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token,
            userId: user.id,
            username: user.username
        })
    } catch (error) {
        c.status(403);
        return c.json({ e: "Wrong Credentials" })
    }
})

userRouter.get("/:identifier", async (c) => {
    const identifier = c.req.param("identifier");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { id: identifier },
                    { username: identifier }
                ]
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        });
        if (!user) {
            c.status(404);
            return c.json({ message: "User not found" });
        }

        return c.json({ user });
    } catch (error) {
        c.status(500);
        return c.json({ message: "Error fetching user" });
    }
});
