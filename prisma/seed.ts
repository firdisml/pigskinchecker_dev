import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.create({
        data: {
            name: "Tobacco Gruen",
            uniqueName: "adidas-tobacco-gruen-silver-green-ash-silver-aluminas",
            searchParameter: "adidastobaccogruensilvergreenashsilveraluminasgy7397",
            sku: "GY7397",
            color: "Silver Green / Ash Silver / Aluminas",
            pictures: 
            [
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/547c6ce439b546a9aae1af7b00932090_9366/Tobacco_Shoes_Green_GY7397_01_standard.jpg", 
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/00c7cd95c34e4a318d19af7b009353bb_9366/Tobacco_Shoes_Green_GY7397_41_detail.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fe3e4dee86604297963eaf7b00935d9f_9366/Tobacco_Shoes_Green_GY7397_42_detail.jpg", 
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7f5890a26a664a508089af7b00934a91_9366/Tobacco_Shoes_Green_GY7397_05_standard.jpg"],
            features: ["Lace closure", "Synthetic suede upper", "Textile lining", "Rubber outsole"],
            sources: ["https://www.adidas.co.uk/tobacco-shoes/GY7397.html"],
            sizing: ["Regular fit"],
            description: 'The adidas Tobacco Gruen Shoes tap into elemental energy with wind, earth, and fire inspiration. Faux suede upper ensures a luxurious touch. Gruen, meaning "green" in German, signifies the eco-friendly upgrade with recycled materials.',
            modelId: "cljtk7fk90001y19bbydf4r4c",
            status: false
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