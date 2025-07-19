import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@shrey_gangwar/main_medium";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

postRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

// Route for user to POST a post.

postRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: post.id
    })
})

// Route to update a specific user's own post

postRouter.put("/:id", async (c) => {
    const postId = c.req.param("id")
    const body = await c.req.json();
    const validation = updatePostInput.safeParse(body);
    if (!validation.success) {
        c.status(422);
        return c.json({
            message: "Invalid or missing fields in input",
            errors: validation.error.format()
        });
    }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const existingPost = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            authorId: true
        }
    })

    if (!existingPost) {
        c.status(404);
        return c.json({
            message: "Post not found"
        })
    }

    if (existingPost.authorId !== userId) {
        c.status(403);
        return c.json({
            message: "You are not authorized to update this post"
        })
    }
    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        message: "Post updated successfully",
        post: updatedPost
    })
})

// Public route to get all post

postRouter.get("/feed", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const postAll = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
        return c.json({
            postAll
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Problem in fetchin posts"
        })
    }
})

// Route to get a specific post

postRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
            select: {
                id: true,
                title: true,
                content: true,

                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            }
        })
        if (post) {
            return c.json({
                post
            })
        } else {
            c.status(404);
            return c.json({
                message: "Post not found"
            })
        }
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Post not found"
        })
    }
})

// Route to get profile specific post for a user
// <Link to={`/users/${userId}/posts`}>View Posts</Link> for routing in frontend

postRouter.get("/:identifier/posts", async (c) => {
    const identifier = c.req.param("identifier"); // Get userId from path param

    if (!identifier) {
        c.status(400);
        return c.json({ message: "Identifier is required" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
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
                id: true
            }
        })
        if (!user) {
            c.status(404);
            return c.json({
                message: "User not found"
            })
        }

        const userPosts = await prisma.post.findMany({
            where: {
                authorId: user.id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            }
        })
        return c.json({
            userPosts
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Unable to fetch posts"
        })
    }
})

postRouter.delete('/:id', async (c) => {
    const postId = c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const existingPost = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                id: true,
                authorId: true
            }
        });

        if (!existingPost) {
            c.status(404);
            return c.json({
                message: "Post not found"
            });
        }

        if (existingPost.authorId !== userId) {
            c.status(403);
            return c.json({
                message: "You are not authorized to delete this post"
            });
        }

        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return c.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error('Delete error:', error);
        c.status(500);
        return c.json({
            error: 'Failed to delete post',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
})




