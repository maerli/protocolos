
async function loadOrigem(){
    
    let result = await axios.get("/origens");
    return result.data;
    
}
function Origens(props){
     const [data,setData] = React.useState([]);
     const refName= React.useRef();
    
     React.useEffect(()=>{
         loadOrigem().then(result=> setData(result));
     },[]);
     
     return (<div>
       <input ref={refName} /> <button onClick={()=>{
       axios.post("/origens",{name:refName.current.value}).then(result=>{
        loadOrigem().then(result=> setData(result));
       }); 
      }} > Criar </button>
      <Table ptls={data} rows={{"id":"id", nome:"name"}} />
       </div>);
}
function Origem(props){
    const [data,setData] = React.useState([]);
    React.useEffect(()=>{
        loadOrigem().then(result=> setData(result));
    });
    return (<div> <select ref={props.iref}> {data.map((a,i)=> <option key={i}>{a.name} </option>)} </select></div>);
}