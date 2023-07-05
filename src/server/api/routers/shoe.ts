import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const shoeRouter = createTRPCRouter({

    //Get Unique Shoe 
    getUniqueShoe: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.shoe.findUnique({
                where: {
                    uniqueName: input.name
                },
                include: {
                    model: {
                        include: {
                            brand:true
                        }
                    }
                }
            })
        }),

    //Get All Shoe 
    getAllShoe: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.shoe.findMany({
            skip: 0,
            take: 4,
            include: {
                model: {
                    include: {
                        brand:true
                    }
                }
            }
        })
    }),

    addRating: protectedProcedure
        .input(z.object({ userId: z.string(), shoeUniqueName: z.string(), title: z.string(), body: z.string(), status: z.boolean() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.rating.create({
                data: {
                    shoeUniqueName: input.shoeUniqueName,
                    userId: input.userId,
                    title: input.title,
                    body: input.body,
                    status: input.status
                }
            })
        }),

    getRatingCount: publicProcedure.input(z.object({ name: z.string(), status: z.boolean() })).query(({ input, ctx }) => {
        return ctx.prisma.rating.count({
            where: {
                shoeUniqueName: input.name,
                status: input.status
            }
        })
    }),

    getAllRatingCount: publicProcedure.input(z.object({ name: z.string() })).query(({ input, ctx }) => {
        return ctx.prisma.rating.count({
            where: {
                shoeUniqueName: input.name,
            },
        })
    }),

    getAllRating: publicProcedure.input(z.object({ name: z.string() })).query(({ input, ctx }) => {
        return ctx.prisma.rating.findMany({
            skip: 0,
            take : 5,
            where: {
                shoeUniqueName: input.name,
            },
            include: {
                User:true
            }
        })
    }),

    getUniqueRating: publicProcedure .input(z.object({ userId: z.string(), name: z.string()})).query(({ input, ctx }) => {
        return ctx.prisma.rating.findUnique({
            where: {
                userId_shoeUniqueName: {
                    userId: input.userId,
                    shoeUniqueName: input.name
                }
            }
        })
    }),

    searchShoe: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.shoe.findMany({
        where: {
          searchParameter: {
            contains: input.name,
          },
        },
        include: {
            model: {
                include: {
                    brand:true
                }
            }
        }
      });
    }),
});
