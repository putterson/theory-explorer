export default {
    getFrets(n) {
	var frets = []
	for(var i = 0; i <= n; i++){
	    frets.push({n: i})
	}
	return frets
    }
}
