const SendEther = artifacts.require("SendEther");
contract("SendEther", (accounts) => {
    let [alice, bob, server] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await SendEther.new();
    });

    it("send ether", async () => {
        const tmp = await contractInstance.TransAble(1000000, {from: alice});
        console.log(tmp)
        const result = await contractInstance.TransEther(bob, {from: alice, value: 1000000});
        expect(result.receipt.status).to.equal(true);
        console.log(result)
    })
})