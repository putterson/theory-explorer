export PATH="`pwd`/node_modules/.bin/:$PATH"

npm install

browserify -t [ babelify --presets [ es2015 react ] ] -t [ uglifyify ] app.js -o bundle.js --debug

electron main.js
