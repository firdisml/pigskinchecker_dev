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
            take: 5,
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
        .input(z.object({ userId: z.string(), shoeUniqueName: z.string(), status: z.boolean() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.rating.upsert({
                where: {
                    userId_shoeUniqueName: {
                        userId: input.userId,
                        shoeUniqueName: input.userId
                    }
                },
                update: {
                    status: input.status
                },
                create: {
                    shoeUniqueName: input.shoeUniqueName,
                    userId: input.userId,
                    status: input.status
                }
            })
        }),

    getRatingCount: publicProcedure.input(z.object({ shoeUniqueName: z.string(), status: z.boolean() })).query(({ input, ctx }) => {
        return ctx.prisma.rating.count({
            where: {
                shoeUniqueName: input.shoeUniqueName,
                status: input.status
            }
        })
    }),

    getUniqueRating: publicProcedure .input(z.object({ userId: z.string(), shoeUniqueName: z.string()})).query(({ input, ctx }) => {
        return ctx.prisma.rating.findUnique({
            where: {
                userId_shoeUniqueName: {
                    userId: input.userId,
                    shoeUniqueName: input.shoeUniqueName
                }
            }
        })
    }),

    searchShoe: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.shoe.findMany({
        where: {
          uniqueName: {
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
