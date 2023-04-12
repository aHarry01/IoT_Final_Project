# Installation Instructions for the ECSE 4660 Final Project Web Application

## How to Install and Run Locally for Windows:
    - Download the root folder webApp and save it somewhere on your C:\ drive
	- Open the Command Prompt and navigate to the root folder webApp
	- In the root folder (where the server.js file is) run the following commands to download the necessary packages:
		* npm install
		* npm install express mongoose cors --save
		* npm install dotenv
		* npm install body-parser
		* sudo npm install forever-monitor
		* sudo npm i -g nodemon
		* npm install forever
		* npm install express-handlebars
		* npm install aws-crt
		* npm install aws-iot-device-sdk-v2
	- To run the Node.JS server enter the following command:	
			nodemon server.js 
	- Navigate to: http://localhost:3000/
	- Open up an additional Command Prompt window and navigate to the angularProject folder inside the root directory (webApp)
	- In the angular folder run the following commands to download the necessary packages:
		* npm install
		* npm install -g @angular/cli@11.2.2
		* npm i bootstrap@5.2.2
		* npm install jquery --save
		* npm install datatables.net --save 
		* npm install datatables.net-dt --save
		* npm install angular-datatables --save
		* npm install @types/jquery --save-dev
		* npm install node-sass
		* npm install @types/datatables.net --save-dev
		* npm install bootstrap
		* npm install primeng --save
		* npm install primeicons --save
		* npm install node-fetch
		* npm install ng-image-slider --save
		* npm install --save export-to-csv
	- To run the Angular Project enter the following command:	
			ng serve (for dev environment) or ng build --port 4300
	- Navigate to: http://localhost:4300/
