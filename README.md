# hackathon2015

1) Make sure you have the latest verion of node installed: https://nodejs.org/ (i.e. I use sudo apt-get install nodejs)
2) You will need gulp, bower and a few other items.  I think I have all of those in the packages.json so
   the two following steps should get you going.
3) run: npm install
4) run: bower install
5) If you want to add additional js libraries your bower install.
6) make sure you also run: npm install gulp and npm install gulp-cli
7) run: gulp  -- This will create a dist folder in the project with a minified and optimized web application.
8) run: gulp serve -- You do not need to run step 7 all the time, just at time of deployment.  gulp serve
   will start a node server and use liverload and watch to allow you to continously run the web app while
   making changes.  So as you make changes in your favorite editor / IDE it will refresh the pages you are viewing.
Have Fun!!

https://raw.githubusercontent.com/phaseone2015/hackathon2015/master/beforesearch.png

https://raw.githubusercontent.com/phaseone2015/hackathon2015/master/aftersearch.png
