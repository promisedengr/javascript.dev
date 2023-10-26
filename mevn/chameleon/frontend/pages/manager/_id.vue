<template>
    <div>
        <div class="content-wrapper">
            <div @click="$router.push(`/manager`)" style="cursor: pointer;">
                <img src="@/assets/images/eric/arrow_back.svg"/>
                Back
            </div>
            <form>
                <label>Data name</label>
                <input type="text" v-model="name"/>
                <label>DataCID</label>
                <input type="text" placeholder="CID of your data on Pinata" v-model="cid"/>
                <label>Overview</label>
                <textarea v-model="overview"/>
                <label>Data Format</label>
                <button @click="format = 'LAS'" :class="format == 'LAS' ? 'selected' : ''" class="submit" type="button">LAS</button>
                <button @click="format = 'LAZ'" :class="format == 'LAZ' ? 'selected' : ''" class="submit" type="button">LAZ</button>
                <br>
                <label>Total Number of Points</label>
                <input type="text" v-model="points"/>
                <label>Area</label>
                <input type="text" v-model="area">
                <label>Point Density</label>
                <input type="text" v-model="pointDensity">
                <label for="classification">Classification</label>
                <div class="inline" v-for="(c, i) in classification" :key="i">
                    <input v-model="c.name" type="text" class="short"> 
                    <input v-model="c.label" type="text" placeholder="Enter class label" class="long"> 
                    <input v-model="c.points" type="text" placeholder="Number of Points" class="medium"> 
                    <a @click="addClassification()" class="box"><font-awesome-icon icon="fa fa-plus" color="#919191"/></a>
                    <a @click="deleteClassification(i)" v-if="i>0" class="box"><font-awesome-icon icon="fa fa-minus" color="#919191"/></a>
                </div>
                <label>Horizontal Coordinate System</label>
                <input type="text" v-model="xCoordinate">
                <label>Vertical Coordinate System</label>
                <input type="text" v-model="yCoordinate">
                <h2>Included Attributes</h2>
                <div class="checkboxCont">
                    <ul class="checkbox">
                        <li>
                            <input type="checkbox" checked disabled>
                            <label for="">X Positions</label>
                        </li>
                        <li>
                            <input type="checkbox" checked disabled>
                            <label for="">Y Positions</label>
                        </li>
                        <li>
                            <input type="checkbox" checked disabled>
                            <label for="">Z Positions</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="intensity_able">
                            <label for="">Intensity</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="returnNumberable">
                            <label for="">Return Number</label>
                        </li>
                        
                    </ul>
                    <ul class="checkbox">
                        <li>
                            <input type="checkbox" v-model="numberReturnable">
                            <label for="">Number of Returns</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="scanDirection_able">
                            <label for="">Scan Direction Flag</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="flightLina_able">
                            <label for="">Edge of Flight Line</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="classificationMark_able">
                            <label for="">Classification</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="scanAngle_able">
                            <label for="">Scan Angle Rank</label>
                        </li>
                        
                    </ul>
                    <ul class="checkbox">
                        <li>
                            <input type="checkbox" v-model="userData_able">
                            <label for="">User Data</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="pointSource_able">
                            <label for="">Point Source ID</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="gpsTime_able">
                            <label for="">GPS Time</label>
                        </li>
                        <li>
                            <input type="checkbox" v-model="rgb_able">
                            <label for="">RGB</label>
                        </li>    
                    </ul>
                </div>
                <h2>Minimum &amp; Maximum Attributes(min, max)</h2>
                <div class="formGrid">
                    <div class="left">
                        <label>XYZ Position</label>
                        <input type="text" class="half" v-model="attributes.xyz">
                        <label>Return Number</label>
                        <input type="text" class="half" v-model="attributes.number" :disabled="!returnNumberable">
                        <label>Scan Direction Flag</label>
                        <input type="text" class="half" v-model="attributes.flag" :disabled="!scanDirection_able">
                        <label>Classification</label>
                        <input type="text" class="half" v-model="attributes.classification" :disabled="!classificationMark_able">
                        <label>User Data</label>
                        <input type="text" class="half" v-model="attributes.user" :disabled="!userData_able">
                        <label>GPS Time</label>
                        <input type="text" class="half" v-model="attributes.gps" :disabled="!gpsTime_able">
                    </div>
                    <div class="right">
                        <label>Intensity</label>
                        <input type="text" class="half" v-model="attributes.intensity" :disabled="!intensity_able">
                        <label>Number of Returns</label>
                        <input type="text" class="half" v-model="attributes.return" :disabled="!numberReturnable">
                        <label>Edge of Flight Line</label>
                        <input type="text" class="half" v-model="attributes.line" :disabled="!flightLina_able">
                        <label>Scan Angle Rank</label>
                        <input type="text" class="half" v-model="attributes.rank" :disabled="!scanAngle_able">
                        <label>Point Source ID</label>
                        <input type="text" class="half" v-model="attributes.id" :disabled="!pointSource_able">
                        <label>RGB Colors</label>
                        <input type="text" class="half" v-model="attributes.rgb" :disabled="!rgb_able">
                    </div>
               </div>
               <label for="dataPeriod">Data Collection Period</label>
               <div class="my-inline">
                    <client-only>
                        <v-date-picker v-model="start_at">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="date" :value="inputValue" v-on="inputEvents">
                            </template>
                        </v-date-picker>
                    </client-only>
                    <span>to</span>
                    <client-only>
                        <v-date-picker v-model="end_at">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="date" :value="inputValue" v-on="inputEvents">
                            </template>
                        </v-date-picker>
                    </client-only>
               </div>
               <label>Data Publication Date</label>
               <client-only>
                    <v-date-picker v-model="publication_date">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input class="date-bg" :value="inputValue" v-on="inputEvents">
                        </template>
                    </v-date-picker>
                </client-only>
               <h2>Data Providers</h2>
               <div class="provider">
                <div class="inline"></div>
                <label>Funders</label>
                <div class="inline" v-for="(f, i) in funders" :key="i">
                    <input v-model="funders[i]" type="text" class="pub">
                    <a @click="addFunders()" class="box"><font-awesome-icon icon="fa fa-plus" color="#919191"/></a>
                    <a v-if="i>0" @click="deleteFunders(i)" class="box"><font-awesome-icon icon="fa fa-minus" color="#919191"/></a>
                </div>
                <label for="partner">Partners</label>
                <div class="inline" v-for="(p, i) in partners" :key="'A'+ i">
                    <input v-model="partners[i]" type="text" class="pub">
                    <a @click="addPartners()" class="box"><font-awesome-icon icon="fa fa-plus" color="#919191"/></a>
                    <a v-if="i>0" @click="deletePartners(i)" class="box"><font-awesome-icon icon="fa fa-minus" color="#919191"/></a>
                </div>

                <label for="collector">Collectors</label>
                <div class="inline" v-for="(c, i) in collectors" :key="'B' + i">
                    <input v-model="collectors[i]" type="text" class="pub">
                    <a @click="addCollectors()" class="box"><font-awesome-icon icon="fa fa-plus" color="#919191"/></a>
                    <a v-if="i>0" @click="deleteCollectors(i)" class="box"><font-awesome-icon icon="fa fa-minus" color="#919191"/></a>
                </div>
               </div>
               <label for="ack">Data Acknowledgment</label>
               <textarea v-model="acknowledgement"/>
               <label for="citation">Data Citation</label>
               <textarea v-model="citation"/>
               <label for="license">License of Data</label>
               <select v-model="license" class="dropdown">
                    <option v-for="(l, i) in licenseArray" :key="i" :value="l">{{l}}</option>
                </select>

                <label for="add">Additional Files</label>
                <div class="inline" v-for="(f, i) in files" :key="'D' + i">
                    <input v-model="f.cid" class="cid" type="text" placeholder="CID of the file on Pinata"> 
                    <input v-model="f.name" class="filename" type="text" placeholder="Name tour file"> 
                    <select v-model="f.tag" class="dropdown filename">
                        <option v-for="(t, i) in tags" :key="'F' + i" :value="t">{{t}}</option>
                    </select> 
                    <a @click="addFiles()" class="box"><font-awesome-icon icon="fa fa-plus" color="#919191"/></a>
                    <a v-if="i>0" @click="deleteFiles(i)" class="box"><font-awesome-icon icon="fa fa-minus" color="#919191"/></a>
                </div>
                <label class="mt-5">Chameleon Sponsor</label>
                <div class="checkbox">
                    <li style="display:flex">
                        <input type="checkbox" v-model="sponsor_able" @click="receiver = ''">
                        <label style=" width: 513px;">If enable, you're accepting financial contributions to your data or project via Chameleon Sponsor. Currently, Chameleon Sponsor supports Polygon (MATIC) donation only</label>
                    </li>
                    <input v-model="receiver" :disabled="!sponsor_able" class="my-4 ms-4" type="text" placeholder="Enter your receiver wallet address on Polygon">

                </div>



                <button @click="updateMetadata()" type="button" class="submit longButt" style="width: 159px;">Update</button>
            </form>






        </div>
    </div>
</template>
<script>
    import pinataSDK from '@pinata/sdk';
    export default {
        data() {
            return {
                idx: this.$route.params['id'],
                existingMetadata: {},

                rootCid: '',
                name: '',
                cid: '',
                overview: '',
                format: '',
                points: 0,
                area: '',
                pointDensity: '',
                classification: [{name:'Class ', label: '', points: 0}],
                xCoordinate: '',
                yCoordinate: '',
                attributes: {},
                start_at: '',
                end_at:'',
                publication_date: '',
                funders:[''],
                partners:[''],
                collectors:[''],
                acknowledgement: '',
                citation: '',
                license: '',
                files: [{cid:'', name: '', tag: ''}],
                receiver: '',
                // checkbox-able
                intensity_able: false,
                returnNumberable: false,
                numberReturnable: false,
                scanDirection_able: false,
                flightLina_able: false,
                classificationMark_able: false,
                scanAngle_able: false,
                userData_able: false,
                pointSource_able: false,
                gpsTime_able: false,
                rgb_able: false,
                licenseArray: ['A', 'B'],
                tags:['LAS','LAZ','CHM','DSM','DEM'],
                sponsor_able: false,
                uploading: false
            }
        },
        created(){
            this.getMetadataById()
        },
        methods: {
            resetMetadata(data) {
                this.existingMetadata = data
                delete this.existingMetadata.data['rootCid'];

                this.rootCid = data.rootCid

                this.name = data.data.name
                this.cid = data.data.cid
                this.overview = data.data.overview
                this.format = data.data.format
                this.points = data.data.points
                this.area = data.data.area
                this.pointDensity = data.data.pointDensity
                this.classification = data.data.classification
                this.xCoordinate = data.data.xCoordinate
                this.yCoordinate = data.data.yCoordinate
                this.start_at = data.data.start_at
                this.end_at = data.data.end_at
                this.publication_date = data.data.publication_date
                this.funders = data.data.funders
                this.partners = data.data.partners
                this.collectors = data.data.collectors
                this.acknowledgement = data.data.acknowledgement
                this.citation = data.data.citation
                this.license = data.data.license
                this.files = data.data.files
                this.attributes.xyz = data.data.attributes.xyz

                if (data.data.attributes.number){
                    this.attributes.number = data.data.attributes.number
                    this.returnNumberable = true
                } else
                    this.returnNumberable = false
                if (data.data.attributes.return){
                    this.attributes.return = data.data.attributes.return
                    this.numberReturnable = true
                } else
                    this.numberReturnable = false
                if (data.data.attributes.flag) {
                    this.attributes.flag = data.data.attributes.flag
                    this.scanDirection_able = true
                } else
                    this.scanDirection_able = false
                if (data.data.attributes.classification) {
                    this.attributes.classification = data.data.attributes.classification
                    this.classificationMark_able = true
                } else
                    this.classificationMark_able = false
                if (data.data.attributes.user) {
                    this.attributes.user = data.data.attributes.user
                    this.userData_able = true
                } else
                    this.userData_able = false
                if (data.data.attributes.gps) {
                    this.attributes.gps = data.data.attributes.gps
                    this.gpsTime_able = true
                } else
                    this.gpsTime_able = false
                if (data.data.attributes.intensity) {
                    this.attributes.intensity = data.data.attributes.intensity
                    this.intensity_able = true
                } else
                    this.intensity_able = false
                if (data.data.attributes.line) {
                    this.attributes.line = data.data.attributes.line
                    this.flightLina_able = true
                } else
                    this.flightLina_able = false
                if (data.data.attributes.rank) {
                    this.attributes.rank = data.data.attributes.rank
                    this.scanAngle_able = true
                } else
                    this.scanAngle_able = false
                if (data.data.attributes.id) {
                    this.attributes.id = data.data.attributes.id
                    this.pointSource_able = true
                } else
                    this.pointSource_able = false
                if (data.data.attributes.rgb) {
                    this.attributes.rgb = data.data.attributes.rgb
                    this.rgb_able = true
                } else
                    this.rgb_able = false
                if (data.receiver) {
                    this.receiver = data.receiver
                    this.sponsor_able = true
                } else
                    this.sponsor_able = false

            },
            getMetadataById() {
                let data ={}
                data._id = this.idx
                this.$api.request.getMetadataById(data, (res => {
                    if (res.data.metadata){
                        this.resetMetadata(res.data.metadata)
                        console.log(res.data.metadata)
                    } else
                        this.$toast.error(`An Internal Error.`)
                }), err =>{
                    this.$toast.error(`Server is disconnected.`)
                    console.log(err)
                })
            },
            async updateMetadata() {
                if (this.uploading)
                    return

                if (this.$store.state.account.pinataKey && this.$store.state.account.pinataSecret) {
                    this.uploading = true
                    var data = {}
                    data.writer = this.$store.state.account.address
                    data.name = this.name;
                    data.cid = this.cid;
                    data.overview = this.overview;
                    data.format = this.format;
                    data.points = this.points;
                    data.area = this.area;
                    data.pointDensity = this.pointDensity;
                    data.classification = this.classification;
                    data.xCoordinate = this.xCoordinate;
                    data.yCoordinate = this.yCoordinate;
                    data.attributes = this.attributes;
                    data.start_at = this.start_at;
                    data.end_at = this.end_at;
                    data.publication_date = this.publication_date;
                    data.funders = this.funders;
                    data.partners = this.partners;
                    data.collectors = this.collectors;
                    data.acknowledgement = this.acknowledgement;
                    data.citation = this.citation;
                    data.license = this.license;
                    data.files = this.files;
                    data.receiver = this.receiver;
                    console.log('888888888888888888888888888888888888')

                    console.log(JSON.stringify(this.existingMetadata.data))
                    console.log(JSON.stringify(data))
                    if (JSON.stringify(this.existingMetadata.data) == JSON.stringify(data)) {
                        console.log('111111111111111111111111111111111111111')

                        this.uploading = false
                        this.$toast.error('No data changed.')
                        return
                    }

                    const pinata = new pinataSDK(this.$store.state.account.pinataKey, this.$store.state.account.pinataSecret);
                    const options = {
                        pinataMetadata: {
                            name: this.name + '-metadata',
                        },
                        pinataOptions: {
                            cidVersion: 0
                        }
                    };
                    pinata.pinJSONToIPFS(data, options).then((result) => {
                        console.log('9999999999999999999999999999')
                        this.$toast.show(`Successfully uploaded to Pinata`)
                        if (result.IpfsHash) {
                            data.rootCid = result.IpfsHash
                            this.$api.request.updateToDB({data:data, rootCid: this.rootCid}, (res => {
                                if (res.data.type) {
                                    this.$toast.show(`Successfully uploaded to Database.`)
                                    this.uploading = false
                                    this.$router.push('/manager')
                                } else{
                                    this.$toast.error('An Internal Error.')
                                    this.uploading = false
                                }
                            }), err =>{
                                this.$toast.error('Server is disconnected.')
                                this.uploading = false
                                console.log(err)
                            })
                        } else {
                            this.$toast.error(`Something went wrong while uploading to pinata.`)
                            this.uploading = false
                        }
                    }).catch((err) => {
                        this.$toast.error(`Something went wrong while uploading to pinata.`)
                        this.uploading = false
                    });
                }
            },
            addPartners() {
                this.partners.push('')
            },
            addCollectors() {
                this.collectors.push('')
            },
            addFunders() {
                this.funders.push('')
                console.log(this.funders)
            },
            deletePartners(index) {
                this.partners.splice(index, 1)
            },
            deleteCollectors(index) {
                this.collectors.splice(index, 1)
            },
            deleteFunders(index) {
                this.funders.splice(index, 1)
            },
            addClassification() {
                let data = {}
                data.name = 'Class '
                data.label = ''
                data.points = 0
                this.classification.push(data)
            },
            addFiles() {
                let data = {}
                data.cid = ''
                data.name = ''
                data.tag = ''
                this.files.push(data)
            },
            deleteClassification(index) {
                this.classification.splice(index, 1)
                console.log(this.classification)
            },
            deleteFiles(index) {
                this.files.splice(index, 1)
            }
        }
    }
</script>
<style lang="css">
.vc-day span{
        margin-bottom: 0px;
}
</style>

<style lang="scss" scoped>
// .vc-day-layer{
//     span {
//         margin-bottom: 0px;
//     }
// }
.provider {
    label {
        color: #919191;
    }
}
.dropdown {
    width: 511px;
    height: 37px;
    margin-top: 10px;
    margin-right: 4px;
    padding: 2px;
    border-radius: 3px;
    background-color: white;
    border: 1px solid #E1E1E1;
    color: #919191;
}
.my-inline {
}
.formGrid {
    display: flex;
    .left {
        margin-right: 14px;
    }
    label {
        color: #919191;
    }
    .half {
        width: 337px;
    }
}
.checkbox {
        margin-top: 17px;
        display: block;
        list-style: none;
    input {
        display: inline-block;
        margin-top: 0px;
    }
    input[type=checkbox] {
        width: 19px;
        height: 19px;
    }
    label {
        display: inline-block;
        margin-top: 0px;
        color: #919191;
    }
    li {
        margin-top: 10px;
        margin-right: 48px;
    }
}
.checkboxCont {
    display: flex;

}
.selected {
    background-color: #4A9EA1!important;
    color: #fff!important;
}
.submit {
    width: 103px;
    height: 38px;
    color: #919191;
    background-color: #fff;
    border-radius: 3px;
    border: #e2e2e2 1px solid;
    margin-top: 47px;
}
form {
    margin-top: 50px;
    h2 {
        margin-top: 25px;
    text-decoration: underline;
    font-size: 18px;
    }
    label {
        display: block;
        margin-top: 23px;
    }
    input {
        width: 513px;
    height: 37px;
    margin-top: 10px;
    margin-right: 4px;
    }
    input.date {
        width: 186px;
        color: #919191;
        background-image: url('@/assets/images/eric/date.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
    }
    input.date-bg {
        width: 513px;
        background-image: url('@/assets/images/eric/date.svg');
        background-repeat: no-repeat;
        background-position: 98% 50%;
    }
    textarea {
        width: 513px;
    margin-top: 10px;
    margin-right: 4px;
    }
     .inline {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    vertical-align: middle;
    span {
        margin: 0 8px;
    }
    .short {
        width: 128px;
        height: 37px;
    }
    .long {
        width: 207px;
    }
    .medium {
        width: 170px;
    }
    .box {
        border: solid 1px #E1E1E1;
    border-radius: 3px;
    width: 37px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-left: 5px;
    }
    .cid {
        width: 317px;
    }
    .filename {
        width: 194px;
    }
}
}
input {
    border: solid 1px #E1E1E1;
    border-radius: 3px;
    padding: 15px;
}
textarea {
    border: solid 1px #E1E1E1;
    border-radius: 3px;
    padding: 15px;
}
</style>