const express = require('express')
const router = express.Router()
const ProposalCtrl = require('../controller/proposal.controller')

router.route('/createProposal').post(ProposalCtrl.createProposal)
router.route('/getProposalList').post(ProposalCtrl.getProposalList)
router.route('/getProposalData').post(ProposalCtrl.getProposalData)
router.route('/deleteProposal').post(ProposalCtrl.deleteProposal)


router.route('/sendVote').post(ProposalCtrl.sendVote)
router.route('/saveResultCID').post(ProposalCtrl.saveResultCID)




// router.route('/getAnnouncementList').post(AnnounceCtrl.getAnnouncementList)





module.exports = router
