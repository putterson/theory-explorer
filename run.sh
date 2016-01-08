export PATH="`pwd`/node_modules/.bin/:$PATH"

npm install

#mkdir -p bin/
#browserify app.js > bin/app.js

electron main.js
