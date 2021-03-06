require("dotenv").config();

const welcomeTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>BACKEND</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div _id="root" style="background-image: linear-gradient(#0d6efd, rgb(255, 255, 140), rgb(189, 98, 189)); height:100vh">
        <div class="container" style="width: 50vw">
            <div class="row" style="height:25vh"></div>
            <div class="row" style="height:50vh; background-color: rgba(255, 255, 255, 0.20)">
                <div class="col-md-12" style="text-align:center; align-self: center;">
                    <h1 style="font-family: 'fantasy sans-serif'; font-weight: bold; color:azure; text-shadow: 2px 0px 10px rgb(112, 112, 112)">WELCOME</h1>
                    <a href="${
                      process.env.URL_MAIN_APP + process.env.API_DOCS
                    }" style="color: #6c757d">Go to api-docs</a>
                </div>
            </div>
            <div class="row" style="height:25vh"></div>
        </div>
    </div>
  </body>
</html>
`;

export default welcomeTemplate;
