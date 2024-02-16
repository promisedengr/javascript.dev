const axios = require('axios')
var Zendesk = require('zendesk-node-api');
const config = process.env;

var zendesk = new Zendesk({
  url: config.zendesk_domain,
  email: config.zendesk_email,
  token: config.zendesk_token
});

exports.send_support = async (req, res) => {
  zendesk.tickets.create(
    {
      subject: req.body.subject,
      comment: {
        body: req.user.email + '\n' + req.body.content
      }
    }
  ).then(function(result){
    // console.log(result);
  });

  res.send('ok')
}
