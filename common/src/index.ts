import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string()
        .min(3, "Username must be atleast 3 characters long")
        .max(32, "Username should not be longer than 32 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers, and underscores")
    ,
    name: z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>

export type CreatePostInput = z.infer<typeof createPostInput>
export type UpdatePostInput = z.infer<typeof updatePostInput>