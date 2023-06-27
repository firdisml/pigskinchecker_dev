import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.create({
        data: {
            name: "Samba OG",
            uniqueName: "adidas-samba-og-white-black-gum",
            color: "White Black Gum",
            brandId: "cljbl91170000v4bwydxxs73t",
            sku: "B75806"
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