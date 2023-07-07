import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.update({
        where: {
            uniqueName: "adidas-samba-decon-core-black-cloud-white-gum",
        },
        data: {
            name: "Samba Decon",
            uniqueName: "adidas-samba-decon-core-black-cloud-white-gum",
            searchParameter: "adidassambadeconcoreblackcloudwhitegumhqif0641",
            sku: "IF0641",
            color: "Core Black / Core White / Gum",
            pictures: ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/883a6bdaeb7b4e708219afd2010a0f52_9366/Samba_Decon_Shoes_Black_IF0641_01_standard.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/14e2932de63546a19018afd2010a4cb6_9366/Samba_Decon_Shoes_Black_IF0641_41_detail.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5d47116a679c434285eaafd2010a553d_9366/Samba_Decon_Shoes_Black_IF0641_42_detail.jpg", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0cd0b30cdaca4746b624afd2010a41bd_9366/Samba_Decon_Shoes_Black_IF0641_05_standard.jpg"],
            features: ["Regular fit", "Lace closure", "Leather upper", "Leather lining", "Rubber outsole"],
            sources: ["https://www.adidas.com.my/en/samba-decon-shoes/IF0641.html"],
            sizing: ["Regular Fit"],
            description: "The adidas Samba shoes take on a deconstructed aesthetic without missing a beat in style. These shoes reflect a rich legacy with their timeless design. From the feet of football athletes to the high-fashion runways, the adidas Samba shoes embody self-expression and effortless style.",
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