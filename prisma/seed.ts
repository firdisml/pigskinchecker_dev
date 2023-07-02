import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const seed = await prisma.shoe.update({
        where: {
            uniqueName: "adidas-samba-og-white-green"
        },
        data: {
            name: "Samba OG",
            uniqueName: "adidas-samba-og-white-green-gum",
            searchParameter: "adidassambaogwhitegreengumig1024",
            sku: "IG1024",
            color: "White/Green/Gum",
            pictures: ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a34f007a106043afb2f3afab00e997ee_9366/Samba_OG_Shoes_White_IG1024_01_standard.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2c3acb92f2c24b55bad4afab00e9e657_9366/Samba_OG_Shoes_White_IG1024_41_detail.jpg","https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/17d2d6e1484d4a048281afab00e9f075_9366/Samba_OG_Shoes_White_IG1024_42_detail.jpg","https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/23f5da5b3a8a4df5ba14afab00e9da6e_9366/Samba_OG_Shoes_White_IG1024_05_standard.jpg"],
            features: ["calf leather", "round toe", "logo patch at the tongue", "signature 3-Stripes logo", "logo print to the side"],
            sources: ["https://www.farfetch.com/my/shopping/men/adidas-samba-og-sneakers-item-20552905.aspx?size=26&storeid=11218&utm_source=google&utm_medium=cpc&utm_keywordid=13762581&utm_shoppingproductid=20552905-26&pid=google_search&af_channel=Search&c=799386477&af_c_id=799386477&af_siteid=&af_keywords=aud-308563155802:pla-174595662067&af_adset_id=40929348869&af_ad_id=190061990109&af_sub1=13762581&af_sub5=20552905-26&is_retargeting=true&shopping=yes&gclid=Cj0KCQjwwISlBhD6ARIsAESAmp69f498j0fGz2hRmrVCiFHKGWnhpTmjRK2p7bdIs79neX8t6xoVhGcaAhFWEALw_wcB"],
            sizing: "True To Size",
            description: "First released in 1950, adidas' Samba sneakers were designed d to provide footballers with grip and stability. This iteration is presented in white leather with green signature serrated 3-Stripes to the sides, while sat atop the traditional gum rubber outsole.",
            modelId: "cljlfb0gd0001v4qonm6qkj6z"
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