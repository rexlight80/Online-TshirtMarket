const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "b9hnc3yxpp5pcm9s",
  publicKey: "844rtcdytggwxpf9",
  privateKey: "1b95d30edc228d41070c597e28df62a4	"
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, function(error, response) {
        if(error){
            return res.status(500).send(error);
        }else{
            return res.send(response)
        }
      });
}

exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce;
    let amountFromClient=req.body.amount;
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err);
          }else{
                 res.json(result);
          }
      });

}