import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.create({
        data: {
            name: "Samba OG",
            uniqueName: "adidas-samba-og-clay-strata",
            color: "Clay Strata",
            brandId: "cljbl91170000v4bwydxxs73t",
            sku: "ID2047"
        }
    })

    console.log(seed)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })