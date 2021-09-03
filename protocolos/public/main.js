function Main(){

   let user = localStorage.getItem("user");
   if(!user){
      const history = ReactRouterDOM.useHistory();
      history.push("/login");
   }else{
      user = JSON.parse(user);
   }

    const refPtl = React.useRef();
    const refOri = React.useRef();
    const refObs = React.useRef();
    const refInt = React.useRef();
    const refPar = React.useRef();
    const refAss = React.useRef();
    const refDta = React.useRef();

    const refCpf = React.useRef();
    const refEml = React.useRef();
    
    const getValue = v=>v.current.value;
    const setValue = (a,b)=> a.current.value = b;
    
    //const [lastId, setLastId] = React.useState(0);
    
    React.useEffect(()=>{
       axios.get("/lastid").then(result=>{
           const date = Date.now();
           setFakeData(serialize(result.data.id, 1, date) , new Date(date),"brasil", "ceará", "dinheiro", "ok", "maerli", "06321845310","gmail");
       })
    },[]);
    
    function getValues(){
       const ptl = getValue(refPtl);
       const ori = getValue(refOri);
       const obs = getValue(refObs);
       const _int = getValue(refInt);
       const cpf = getValue(refCpf);
       const eml = getValue(refEml);
       const par = getValue(refPar);
       const ass = getValue(refAss);
       
       return {ptl, ori, par,ass,obs, _int, cpf,eml};
    }
    
    function setFakeData(ptl, dta, ori, par, ass, obs, _int, cpf,eml){
       setValue(refPtl, ptl);
       setValue(refOri, user.orgao);
       setValue(refObs, obs);
       setValue(refInt, _int);
       setValue(refCpf, cpf);
       setValue(refEml, eml);
       setValue(refPar, par);
       setValue(refAss, ass);
       setValue(refDta, dta);
    }
    

    
    const history = ReactRouterDOM.useHistory();
    
    async function verify(){
        const data = getValues();
        const {ptl, ori, par,  obs, _int, cpf,eml} = data;
        alert(JSON.stringify(data));
        
        if( ptl && ori && par && obs && _int && cpf && eml){
        //alert("ok");
        try{
            const result = await axios.post("/create", data);
            const lastId = result.data[0].id;
            
            history.push("/document/"+lastId);
         }catch(err){
            alert(err)
         }
            
        }else{
            alert("debug");
        }
    }
    
    const [origens,setOrigens] =React.useState([]);
    const [assuntos,setAssuntos] = React.useState([]);
    
    React.useEffect(()=>{
        axios.get("/origens").then(result=>setOrigens(result.data));
        axios.get("/assuntos").then(result=>setAssuntos(result.data));
    },[]);

return (<div>
<Div iref={refPtl} name="protocolo" />
<Div iref={refDta} name="data" />
    <Div iref={refOri} name="origem" /> 
    <Origem iref={refPar} />
    <div>
       <select ref={refAss}>
          { assuntos.map(a=> <option> {a.name} </option>) }
       </select>
    </div>
    <Div iref={refObs} name="Observaçāo" />
    <Div iref={refInt} name="Interessado" />
    <Div iref={refCpf} name="cpf" />
    <Div iref={refEml} name="email" />
    <button onClick={()=>{
       try{
         verify();
       }catch(err){
         alert(err);
       }
    }} > Cadastrar </button>
    
    </div>);

}
