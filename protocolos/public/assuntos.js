function Assuntos(props){
   const [data,setData] = React.useState([]);
     const refName= React.useRef();
     
     function load(){
       axios.get("/assuntos").then(result=>setData(result.data))
     }
     
     React.useEffect(()=>{
         load();
     },[]);
     
     return (<div>
       <input ref={refName} /> <button onClick={()=>{
       axios.post("/assuntos",{name:refName.current.value}).then(result=>{
         load();
       }); 
      }} > Criar </button>
      <Table ptls={data} rows={{"id":"id", nome:"name"}} />
      </div>);
}
