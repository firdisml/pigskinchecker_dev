import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.create({
        data: {
            name: "Samba Vegan",
            uniqueName: "adidas-samba-vegan-cloud-white-core-black-gum",
            searchParameter: "adidassambavegancloudwhitecoreblackgumh01877",
            sku: "H01877",
            color: "Cloud White / Core Black / Gum",
            pictures: ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9882f76dc5b14339a92bac5a0160ac4f_9366/Samba_Vegan_Shoes_White_H01877_01_standard.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c43c749826c4ded8205ac5a0160d535_9366/Samba_Vegan_Shoes_White_H01877_41_detail.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1e36883340dc42bc8aecac5a0160db1e_9366/Samba_Vegan_Shoes_White_H01877_42_detail.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5380f2473cb745b48ea4ac5a0160ce45_9366/Samba_Vegan_Shoes_White_H01877_05_standard.jpg"],
            features: ["Vegan leather", "round toe", "logo patch at the tongue", "signature 3-Stripes logo", "logo print to the side"],
            sources: ["https://www.farfetch.com/my/shopping/men/adidas-samba-vegan-white-gum-sneakers-item-19517753.aspx"],
            sizing: ["True To Size"],
            description: "First released in 1950, adidas' Samba sneakers were designed d to provide footballers with grip and stability. This iteration is presented in white leather with green signature serrated 3-Stripes to the sides, while sat atop the traditional gum rubber outsole.",
            modelId: "cljlfb0gd0001v4qonm6qkj6z",
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