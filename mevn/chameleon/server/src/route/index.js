const express = require('express')
const router = express.Router()
// const AccountRoute = require('./account.route')
// const TownhallRoute = require('./townhall.route')
// const ProposalRoute = require('./proposal.route')
// const AnnounceRoute = require('./announce.route')
// const SearchService = require('./search.service')
const UserRoute = require('./user.route')
const MetadataRoute = require('./metadata.route')
router.use('/user', UserRoute)
router.use('/metadata', MetadataRoute)




// router.use('/account', AccountRoute)
// router.use('/townhall', TownhallRoute)
// router.use('/proposal', ProposalRoute)
// router.use('/announce', AnnounceRoute)







module.exports = router