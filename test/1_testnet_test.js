const OfferManager = artifacts.require("OfferManager");
const LoanManager = artifacts.require("LoanManager");
const FeeManager = artifacts.require("FeeManager");

const LendingPool = artifacts.require("LendingPool");

const PriceFeed = artifacts.require("PriceFeed");

const Activity = artifacts.require("Activity");
const ZapsterScore = artifacts.require("ZapsterScore");
const LoanToValueRatio = artifacts.require("LoanToValueRatio");

const ZAP = "0x4641ace1A8D5C4F9B445E2d3C1139D4C4b5ba3c0"
const BTCB = "0xdFd7C2d5c1006323E2D990464BcC9ff81541c01A"
const WETH = "0xE9281185E3C4853d1C55F4A637c2D3a61BDda6dd"
const USDT = "0x7bc36d01a87806bBc812cBFeDE87bb38C3239EDC"
const USDC = "0x15413BCb970e69DBD50C43A4baae0ad1d9fDd048"
const WBNB = "0xc332fEC9Dcf2335163a597ad0e54B111EA916825"
const BUSD = "0xEDA730654aDDb79617f085837A1F9a6F7b45f7D6"
const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

contract("CreateLendingOffer" async accounts => {
    it("setValues", async () => {
        const priceFeed = await PriceFeed.deployed()
        await priceFeed.addPriceFeed(BUSD, "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa")
        await priceFeed.addPriceFeed(NATIVE, "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526")
        await priceFeed.addPriceFeed(ZAP, "0x298619601ebCd58d0b526963Deb2365B485Edc74")
        await priceFeed.addPriceFeed(BTCB, "0x5741306c21795FdCBb9b265Ea0255F499DFe515C")
        await priceFeed.addPriceFeed(WETH, "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7")
        await priceFeed.addPriceFeed(USDT, "0xEca2605f0BCF2BA5966372C99837b1F182d3D620")
        await priceFeed.addPriceFeed(USDC, "0x90c069C4538adAc136E051052E14c1cD799C41B7")
        await priceFeed.addPriceFeed(WBNB, "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526")
        await priceFeed.addUSDFeed("0x90c069C4538adAc136E051052E14c1cD799C41B7")
    };
    it("setValues 2", async () => {
        const ltv = await LoanToValueRatio.deployed()
        await ltv.setzapsterScore(ZapsterScore _address, 100, 120)

        const zapsterScore = await ZapsterScore.deployed()
        await zapsterScore.setActivity(Activity.address)

        const offerManager = await OfferManager.deployed()
        await offerManager.setlendingPool(LendingPool.address)

        const loanManager = await LoanManager.deployed()
        await loanManager.setLendingPool(LendingPool.address),

        const feeManager = await FeeManager.deployed()
        await feeManager.setLendingPool(LendingPool.address),

        const activity = await Activity.deployed()
        await activity.setLendingPool(LendingPool.address)
    })
    it("setValues 3",async function ( {
        const lendingPool = await LendingPool.deployed()
        await lendingPool.setFeeds(
            LoanToValueRatio.address,
            Activity.address,
            PriceFeed.address)
        
        await lendingPool.setManagers(
            LoanManager.address,
            OfferManager.address,
            FeeManager.address
        )
    })
})