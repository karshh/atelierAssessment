# Angular JS Technical Exercise

1. Integrate latest Bootstrap version
2. Add new Login page that takes an email and password calls login endpoint:

curl -i -X POST \
   -H "Content-Type:application/x-www-form-urlencoded" \
   -d "grant_type=password" \
   -d "username=simon@atelier.technology" \
   -d "password=Password!2" \
   -d "scope=offline_access openid profile" \
   -d "resource=api://enterprise" \
 'https://id.pe.atelierclient.com/connect/token'

3. Call our authenticated endpoint with the token returned:

curl -i -X GET \
   -H "Authorization:Bearer <<token>>" \
 'https://pe.atelierclient.com/api/home/auth-ping'

 4. Docker host the application