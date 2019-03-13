const cool = require('cool-ascii-faces');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));
app.get('/getRate', calculateRate);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function calculateRate(request, response) {
    console.log("Calculating Rate...");
    const type = request.query.type;
    console.log("Mail Type: " + type);
    const weight = request.query.weight;
    console.log("Mail Weight: " + weight);
	
	var cost;
	if(type == "stamped") {
		if (weight <= 3 && weight >= 1)
			cost = (weight * .15) + .40;
		else if (weight == 3.5)
			cost = 1.00;
		else
			cost = "Invalid input";
	}
	if(type == "metered") {
		if (weight <= 3 && weight >= 1)
			cost = (weight * .15) + .35;
		else if (weight == 3.5)
			cost = 0.95;
		else
			cost = "Invalid input";
	}
	if(type == "flats") {
		if (weight <= 13 && weight >= 1)
			cost = (weight * .15) + .85;
		else
			cost = "Invalid input";
	}
	if(type == "retail") {
		if (weight <= 13 && weight >= 1){
			if (weight <= 4 && weight >= 1)
				cost = 3.66;
			if (weight <= 8 && weight >= 5)
				cost = 4.39;
			if (weight <= 12 && weight >= 9)
				cost = 5.19;
			if (weight == 13)
				cost = 5.71;
		}
		else
			cost = "Invalid input";
	}
	const params = {
		weight: weight,
		type: type,
		cost: cost
	};
    response.render("results", params);
}