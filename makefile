default: build

BIN=./node_modules/.bin
BROWSERIFY=$(BIN)/browserify
ELECTRON=$(BIN)/electron
B_FLAGS=-t [ babelify --presets [ es2015 react ] ] 

setup:
	npm install

build: 
	$(BROWSERIFY) $(B_FLAGS) app.js -o bundle.js --debug

run: build
	$(ELECTRON) main.js

release:
	$(BROWSERIFY) $(B_FLAGS) -g uglifyify app.js -o bundle.js
