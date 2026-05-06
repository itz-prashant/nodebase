import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from '@/lib/prisma'
import {checkout, polar, portal} from '@polar-sh/better-auth'
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword:{
        enabled: true,
        autoSignIn: true
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "26a2fb2a-f04d-494c-9449-42e85893c6ab",
                            slug: "nodebase" // Custom slug for easy reference in Checkout URL, e.g. /checkout/nodebase
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ],
        })
    ]
});