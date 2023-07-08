import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.update({
        where:{
            uniqueName: "adidas-samba-og-cloud-white-green-gum",
        },
        data: {
            name: "Samba OG",
            uniqueName: "adidas-samba-og-cloud-white-green-gum",
            searchParameter: "adidassambacloudwhitegreengumig1024",
            sku: "IG1024",
            color: "Cloud White / Green / Gum",
            pictures: 
            [
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a34f007a106043afb2f3afab00e997ee_9366/Samba_OG_Shoes_White_IG1024_01_standard.jpg", 
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2c3acb92f2c24b55bad4afab00e9e657_9366/Samba_OG_Shoes_White_IG1024_41_detail.jpg",
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/17d2d6e1484d4a048281afab00e9f075_9366/Samba_OG_Shoes_White_IG1024_42_detail.jpg", 
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/23f5da5b3a8a4df5ba14afab00e9da6e_9366/Samba_OG_Shoes_White_IG1024_05_standard.jpg"],
            features: ["Regular fit", "Lace closure", "Full grain leather", "Synthetic leather lining", "Gum rubber midsole"],
            sources: ["https://www.adidas.com/us/samba-og-shoes/IG1024.html"],
            sizing: ["Regular fit"],
            description: "Born on the soccer field, the Samba is a timeless icon of street style. These shoes stay true to their legacy with a soft leather upper and suede overlays.",
            modelId: "cljseu0ps0001v4fgdhrbm5k2",
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