// magic - widget ui
export default async function showMagicUI(APP) {

    const walletInfo = await APP.magic.user.getInfo(),
        walletType = walletInfo.walletType;

    if (walletType === "magic") {
        await APP.magic.wallet.showUI();
    };
}