<template>
    <div>
        <div class="content-wrapper" v-if="metadata.data">
            <div @click="$router.push(`/`)" style="cursor: pointer;">
                <img src="@/assets/images/eric/arrow_back.svg"/>
                Back
            </div>
            <div class="top mt-4">
                <h1>{{metadata.data.name}}</h1>
                <p class="copy">Contributed by: {{metadata.writer}} <img src="@/assets/images/eric/copy.svg" alt=""></p>
                <p>Date: {{metadata.date}}</p>
                <p class="copy">Data CID: {{metadata.data.cid}} <img src="@/assets/images/eric/copy.svg" alt=""></p>
                <p class="copy">Metadata CID: {{metadata.rootCid}} <img src="@/assets/images/eric/copy.svg" alt=""></p>
                <p>IPFS Storage Tool: Pinata</p>
            </div>
            <div class="data">
                <h2>Data Overview</h2>
                <p>{{metadata.data.overview}}</p>

                <h2>Data Acknowledgment</h2>
                <p>{{metadata.data.acknowledgement}} <img src="@/assets/images/eric/copy.svg" alt=""></p>

                <h2>Data Citation</h2>
                <p> {{metadata.data.citation}}
                    <img src="@/assets/images/eric/copy.svg" alt=""></p>
                <p><span>License:</span> {{metadata.data.license}}</p>
                <p><span>Data Collection Period:</span> {{metadata.data.start_at}} - {{metadata.data.end_at}}</p>
                <p><span>Data Publication Date:</span> {{metadata.data.publication_date}}</p>
                <h2>Data Providers</h2>
                <div class="list">
                    Funder
                    <ul v-for="(f, i) in metadata.data.funders" :key="i">
                        <li>{{f}}</li>
                    </ul>
                    Partners
                    <ul v-for="(p, i) in metadata.data.partners" :key="'A' +i">
                        <li>{{p}}</li>
                    </ul>
                    Collector
                    <ul v-for="(c, i) in metadata.data.collectors" :key="'B' +i">
                        <li>{{c}}</li>
                    </ul>
                </div>
            </div>
            <div class="details">
                <h2>Details of Data</h2>
                <p>Total number of Points : <span>{{metadata.data.points}} pts</span></p>
                <p>Area: <span>81.64 km²</span> </p>
                <p>Point density: <span> {{metadata.data.area}} pts/m²</span></p>
                <p>Classifications: </p>
                <ul v-for="(c, i) in metadata.data.classification">
                    <li>{{c.name}} - {{c.label}}: {{c.points}} pts</li>
                </ul>
                <p>Horizontal Coordinate System: <span> {{metadata.data.xCoordinate}}</span></p>
                <p>Vertical Coordinate System: <span> {{metadata.data.yCoordinate}}</span></p>
            </div>

            <div class="attribute" v-if="metadata.data.attributes">
                <h2>Included Attributes</h2>
                <div class="checkboxCont">
                    <ul class="checkbox">
                        <li>
                            <input disabled checked type="checkbox">
                            <label for="">X Positions</label>
                        </li>
                        <li>
                            <input disabled checked type="checkbox">
                            <label for="">Y Positions</label>
                        </li>
                        <li>
                            <input disabled checked type="checkbox">
                            <label for="">Z Positions</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.intensity" type="checkbox">
                            <label for="">Intensity</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.return" type="checkbox">
                            <label for="">Return Number</label>
                        </li>
                        
                    </ul>
                    <ul class="checkbox">
                        <li>
                            <input disabled :checked="metadata.data.attributes.number" type="checkbox">
                            <label for="">Number of Returns</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.flag" type="checkbox">
                            <label for="">Scan Direction Flag</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.line" type="checkbox">
                            <label for="">Edge of Flight Line</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.classification" type="checkbox">
                            <label for="">Classification</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.rank" type="checkbox">
                            <label for="">Scan Angle Rank</label>
                        </li>
                        
                    </ul>
                    <ul class="checkbox">
                        <li>
                            <input disabled :checked="metadata.data.attributes.user" type="checkbox">
                            <label for="">User Data</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.id" type="checkbox">
                            <label for="">Point Source ID</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.gps" type="checkbox">
                            <label for="">GPS Time</label>
                        </li>
                        <li>
                            <input disabled :checked="metadata.data.attributes.rgb" type="checkbox">
                            <label for="">RGB</label>
                        </li>    
                    </ul>
                </div>
            </div>
        </div>
        
        <h2>Minimum &amp; Maximum Attributes (min, max)</h2>
        <div class="minMaxAttr">
            <p v-if="metadata.data.attributes.xyz">XYZ Positions: {{metadata.data.attributes.xyz}}</p>
            <p v-if="metadata.data.attributes.intensity">Intensity: {{metadata.data.attributes.intensity}}</p>
            <p v-if="metadata.data.attributes.number">Return Number: {{metadata.data.attributes.number}}</p>
            <p v-if="metadata.data.attributes.return">Number of Returns: {{metadata.data.attributes.return}}</p>
            <p v-if="metadata.data.attributes.flag">Scan Direction Flag: {{metadata.data.attributes.flag}}</p>
            <p v-if="metadata.data.attributes.line">Edge of Flight Line: {{metadata.data.attributes.line}}</p>
            <p v-if="metadata.data.attributes.classification">Classification: {{metadata.data.attributes.classification}}</p>
            <p v-if="metadata.data.attributes.rank">Scan Angle Rank: {{metadata.data.attributes.rank}}</p>
            <p v-if="metadata.data.attributes.user">User Data: {{metadata.data.attributes.user}}</p>
            <p v-if="metadata.data.attributes.id">Point Source ID: {{metadata.data.attributes.id}}</p>
            <p v-if="metadata.data.attributes.gps">GPS Time: {{metadata.data.attributes.gps}}</p>
            <p v-if="metadata.data.attributes.rgb">RGB Colors: {{metadata.data.attributes.rgb}}</p>
        </div>

        <h2>Download data file(LAS/LAZ)</h2>
        <div class="down">
            <div class="fileBox short" @click="downloadFile(metadata.rootCid, metadata.data.name, metadata.data.format)" style="cursor: pointer;">{{metadata.data.format}}</div>
        </div>

        <h2>Additional Files</h2>
        <div class="additional" v-for="(f, i) in metadata.data.files" :key="i">
            <p class="copy">File CID: {{f.cid}} <img src="@/assets/images/eric/copy.svg"></p>
            <div @click="downloadFile(f.cid, f.name, f.tag)" class="fileBox long" style="cursor: pointer;">{{f.tag}} file</div>
        </div>
        <div v-if="metadata.receiver">
            <h2 class="mt-5">Chameleon Sponsor</h2>
            <div class="sponsor">
                <p style="width: 513px;">This data had enable Chameleon Sponsor to receive financial contribution. Show your love and support to the data provider!</p>
                <input v-model="amount" class="my-3" type="text" placeholder="Enter an amount(MATIC)" style="width: 513px;">
            </div>
            <button @click="donateMatic()" type="button" class="submit longButt mt-4" style="width: 159px; background-color: #8247E5;">
                <img src="@/assets/images/eric/love_white.svg" class="me-2"/>Sponsor</button>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                idx: this.$route.params['id'],
                metadata: {
                    data: {
                        attributes: {

                        }
                    }
                },
                amount: 0,
            }
        },
        created () {
            this.getMetadataById()
        },
        methods: {
            async downloadFile(cid, name, format) {
                let result = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`)
                console.log(result.data)
                var file = new Blob([result.data], {type: 'text'});
                var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                a.href = url;
                a.download = `${name}.${format}`;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0);

            },
            async donateMatic() {
              if (this.$store.state.account.address) {
                    if (this.$store.state.account.address == this.metadata.receiver) {
                        this.$toast.error(`You can't donate yourself.`)
                        return
                    } else {
                        if ( parseFloat(this.amount) > 0) {
                            const yourNetworkId = '137'
                            let networkId = await window.$web3.eth.net.getId()
                            console.log(networkId)
                            if (networkId == yourNetworkId) {
                                let result = await window.$web3.eth.sendTransaction({
                                    from: this.$store.state.account.address,
                                    to: '0x9Cb65a09De77AE70A752d0a725196909059DdD08',
                                    value: `${parseFloat(this.amount) * 10 ** 18}`,
                                    // value: `${parseFloat(this.amount)}`
                                })
                                if (!result)
                                    return
                                if (result.blockHash) {
                                        let data = {}
                                        console.log('time to db')
                                        data.metadata_id = this.metadata._id
                                        data.sender = this.$store.state.account.address
                                        data.amount = parseFloat(this.amount)
                                        console.log('data')

                                        console.log(data)

                                        this.$api.request.donateMatic(data, (res => {
                                            console.log(data)
                                            if (res.data.type){
                                                this.$toast.show('You successfully donate your matic.')
                                                this.$router.push('/')
                                            } else
                                                this.$toast.error(`An Internal Error.`)
                                        }), err =>{
                                            this.$toast.error(`Server is disconnected.`)
                                            console.log(err)
                                        })
                                } else {
                                    this.$toast.error(`A metamask transaction error`)
                                    return
                                }
                            } else {
                                this.$toast.error(`Please switch your network to polygon`)
                                return
                            }
                            // .then( async (networkId) => {
                            //     if (networkId == yourNetworkId) {
                            //         console.log(networkId)
                            //         console.log(this.$store.state.account.address)

                            //         window.$web3.eth.sendTransaction({
                            //             from: this.$store.state.account.address,
                            //             to: '0x9Cb65a09De77AE70A752d0a725196909059DdD08',
                            //             value: `${parseFloat(this.amount) * 10 ** 18}`,
                            //             // value: `${parseFloat(this.amount)}`
                            //         })
                            //         .then(function(receipt){
                            //             console.log(receipt)
                                                    
                            //             let data = {}
                            //             console.log('time to db')
                            //             data.metadata_id = this.metadata._id
                            //             data.sender = this.$store.state.account.address
                            //             data.amount = parseFloat(this.amount)
                            //             console.log('data')

                            //             console.log(data)

                            //             this.$api.request.donateMatic(data, (res => {
                            //                 console.log(data)
                            //                 if (res.data.type){
                            //                     this.$toast.show('You successfully donate your matic.')
                            //                     this.$router.push('/')
                            //                 } else
                            //                     this.$toast.error(`An Internal Error.`)
                            //             }), err =>{
                            //                 this.$toast.error(`Server is disconnected.`)
                            //                 console.log(err)
                            //             })
                            //         })
                            //         .catch((err) => {
                            //             console.log('here is a error')
                            //             console.log(err)
                            //         });
                            //     } else {
                            //         this.$toast.error(`Please switch your network to polygon`)
                            //     }
                            // })
                            // .catch((err) => {
                            // // unable to retrieve network id
                            // });
                        } else {
                            this.$toast.error('Please type the matic amount')
                            return
                        }
                    }
                } else {
                    this.$toast.error('Please connect your wallet first')
                    return
                }
                





    //             await window.ethereum.request({
    //    method: 'wallet_switchEthereumChain',
    //    params: [{ chainId: "0x137" }],
    // })
                // var paymentAddress = '0x9Cb65a09De77AE70A752d0a725196909059DdD08'
                // var amountEth = 0.1
                // window.$web3.eth.sendTransaction({
                //         to: paymentAddress,
                //         value: toWei(amountEth, 'ether')
                //     }, (err, transactionId)=>{
                //         if(err){
                //             console.log("Payment Failed", err)
                //             // $('#status').html("Payment failed")
                //         }else{
                //             console.log("Payment Successful", transactionId)
                //             // $('#status').html("Payment Successful")
                //         }
                //     }
                //     )




                // if (this.$store.state.account.address) {
                //     if (this.$store.state.account.address == this.metadata.receiver) {
                //         this.$toast.error(`You can't donate yourself.`)
                //         return
                //     } else {
                //         if ( parseInt(this.amount) < 1) {
                //             this.$toast.error('Please type the matic amount')
                //             return
                //         } else {
                //             let data = {}
                //             data.metadata_id = this.metadata._id
                //             data.sender = this.$store.state.account.address
                //             data.amount = parseInt(this.amount)
                //             this.$api.request.donateMatic(data, (res => {
                //                 if (res.data.type){
                //                     this.$toast.show('You successfully donate your matic.')
                //                     this.$router.push('/')
                //                 } else
                //                     this.$toast.error(`An Internal Error.`)
                //             }), err =>{
                //                 this.$toast.error(`Server is disconnected.`)
                //                 console.log(err)
                //             })
                //         }
                //     }
                // } else {
                //     this.$toast.error('Please connect your wallet first')
                //     return
                // }
            },
            getMetadataById() {
                let data ={}
                data._id = this.idx
                this.$api.request.getMetadataById(data, (res => {
                    if (res.data.metadata){
                        this.metadata = res.data.metadata
                        console.log(this.metadata)
                    } else
                        this.$toast.error(`An Internal Error.`)
                }), err =>{
                    this.$toast.error(`Server is disconnected.`)
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sponsor {
        color: #919191;
        input {
            border: solid 1px #E1E1E1;
            border-radius: 3px;
            padding: 10px;
            width: 100%;
            background-image: url('@/assets/images/eric/matic.svg');
            background-repeat: no-repeat;
            background-position: 98% 50%;
        }
    }
    .additional {
        color: #919191;
        line-height: 2em;
        .copy {
            margin-top: 16px;
        }
    }
    .fileBox {
        border: solid 1px #E1E1E1;
        border-radius: 3px;
        display: flex;
        padding: 20px 50px;
        align-items: center;
        background-image: url('@/assets/images/eric/file.svg');
        background-repeat: no-repeat;
        color: #919191;
    }
    .short {
        width: 287px;
        height: 59px;
        background-position: 5% 50%;
    }
    .long {
        width: 586px;
        height: 59px;
        background-position: 3% 50%;
    }
    .down {
        margin: 16px 0;
        
    }
    .minMaxAttr {
        margin-bottom: 32px;
        p {
            margin-top: 10px;
            color: #919191;
        }
    }
    .attribute {
        margin-top: 15px;
        padding: 15px 0;
        .checkboxCont {
            display: flex;
            .checkbox {
                margin-top: 17px;
                display: block;
                list-style: none;
                li {
                    margin-top: 10px;
                    margin-right: 48px;
                }
            }
        }
    }
    .top {
        h1 {
            font-size: 25px;
        }
        p {
            margin-top: 11px;
            color: #919191;
            text-align: justify;
        }
    }
    .details {
        margin-top: 30px;
        p {
            margin-top: 11px;
            text-align: justify;
            span {
                color: #919191;
            }
        }
        ul {
            list-style: none;
            li {
                padding: 11px 0 0 11px;
                color: #919191;
            }
        }
    }
    h2 {
        text-decoration: underline;
        font-weight: 100;
        font-size: 16px;
        margin: 11px 0;
    }
    .data {
        
        p {
            color: #919191;
            margin-top: 4px;
            margin-bottom: 22px;
            text-align: justify;
        }
        .list {
            margin-top: 11px;
            color: #919191;
            padding-left: 15px;
            ul {
                margin: 11px 0 11px 0;
            }
            li {
                margin-left: 25px;
            }
        }
    }
</style>