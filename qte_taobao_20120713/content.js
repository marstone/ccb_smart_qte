function qte_tick() {
	console.log(new Date());
	setTimeout(qte_tick, 1000);
}

// qte_tick();