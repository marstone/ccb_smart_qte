function qte_tick() {
	console.log(new Date());
	setTimeout(qte_tick, 1000);
}

// qte_tick();

function qte_echo(x) {
	return x;
}