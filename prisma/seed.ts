import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.create({
        data: {
            name: "Samba OG Sporty & Rich",
            uniqueName: "adidas-samba-og-sporty-rich-cloud-white-green-gum",
            searchParameter: "adidassambaogsportyrichcloudwhitegreengumhq6075",
            sku: "HQ6075",
            color: "Cloud White / Green / Gum",
            pictures: ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ed70b56fe9b24738b626af060183eb8d_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_01_standard.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/32408964108c4428a05daf060188882f_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_41_detail.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/10b265376f2d47a6945eaf060188919e_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_42_detail.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/840e0ae4fd4440459261af0601887543_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_05_standard.jpg"],
            features: ["Upper leather", "round toe", "logo patch at the tongue", "signature 3-Stripes logo", "logo print to the side"],
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