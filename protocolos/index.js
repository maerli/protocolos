class FakeDB{
	constructor(){
		this.db = []
	}
	addRow(row){
		row.tms = Date.now();
		this.db.push(row);
	}
	getLastRow(){
		return this.db.slice(-1);
	}
	getLastId(){
		const last = this.getLastRow();
		if(last.length === 0){
			return null;
		}
		return last[0].id;
	}
	filter(f){
		return this.db.filter(f);
	}
	static maxId(db1, db2){
		return Math.max(db1.getLastId(), db2.getLastId());
	}
}


function getHistory(id){
	const f = fakedb.filter(a=>a.id == id);
	const o = cfakedb.filter(a=>a.ref == id);
	
	return f.concat(o);
	
}


const fakedb = new FakeDB();
fakedb.addRow({id:1, ori:"adm",par:"adm",cpf:"063",eml:"gmail",_int:"maerli",obs:"genesis block",status:0});


const cfakedb = new FakeDB();
cfakedb.addRow({id:1+ FakeDB.maxId(fakedb, cfakedb) ,ori:"other",par:"other", obs:"teste",  ref:1,status:0});



const origens = new FakeDB();
origens.addRow({id:1, name:"facebook"});

const users = new FakeDB();
users.addRow({id:1, name:"maerli", orgao:"adm", level:1, email:"maerli", senha:"expires5"});

const assuntos = new FakeDB();
assuntos.addRow({id:1, name:"ferias"});


const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});

app.get("/history/:id",(req,res)=>{
	const y = req.params.id;
	res.json(getHistory(y));
});

app.get("/created/:id", (req,res)=>{
	const x = req.params.id;
	res.json(fakedb.filter(a=>a._id == x));
});
app.get("/all", (req,res)=>{
	res.json(fakedb.db);
});


app.post("/edit",(req,res)=>{
	console.log("debug");
	 const body = req.body;
	 body.id = 1 + FakeDB.maxId(fakedb,cfakedb);
	 cfakedb.addRow(body);
	 res.json(cfakedb.db);
});


app.get("/origens", (req,res)=>{
	  res.json(origens.db);
});
app.post("/origens", (req,res)=>{
	const {name} = req.body;
	origens.addRow({id:users.getLastId() +1, name
		});
		res.json(origens.db);
});

app.get("/assuntos", (req,res)=>{
	console.log("origem");
	res.json(assuntos.db);
});
app.post("/assuntos", (req,res)=>{
	const {name} = req.body;
	assuntos.addRow({id:assuntos.getLastId() +1, name
		});
		res.json(assuntos.db);
		console.log("eita");
});


app.post("/login", (req, res)=>{
	console.log("login");
	const {email, pwd} =req.body;
	res.json(users.filter(a=>{
		return a.email == email && a.senha == pwd
	}));
	
});

// create
app.post("/create", (req,res)=>{
	//console.log(req.body);
	const id = FakeDB.maxId(fakedb,cfakedb);
	const body = req.body;
	body.id = id + 1;
	delete body.ptl;
 fakedb.addRow(body);
 
 	res.json(fakedb.getLastRow());
	
});
app.get("/pdf", (req,res)=>{
	res.sendFile(__dirname+"/pdf.html");
});
app.get("/lastid", (req,res)=>{
	const lastid = FakeDB.maxId(fakedb, cfakedb)+1;
	res.json({id:lastid});
});
app.listen(3000, ()=>{
	console.log("maerli");
});
