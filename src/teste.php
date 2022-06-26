curl --request POST \
  --url https://api.sendinblue.com/v3/smtp/email \
  --header 'accept: application/json' \
  --header 'api-key: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' \
  --header 'content-type: application/json' \
  --data '{  
   "sender":{  
      "name":"Sender Alex",
      "email":"senderalex@example.com"
   },
   "to":[  
      {  
         "email":"testmail@example.com",
         "name":"John Doe"
      }
   ],
   "subject":"Hello world",
   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
}'
