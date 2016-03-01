#put electron on the path if it is not installed globally
export PATH="`pwd`/node_modules/.bin/:$PATH"

ps -x | grep watchify | grep -v grep | cut -d" " -f2 | xargs kill
watchify -t [ babelify --presets [ es2015 react ] ] app.js -o bundle.js --debug &
