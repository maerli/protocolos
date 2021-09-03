function Edit(props){
   const {id} = ReactRouterDOM.useParams();
   const refOri = React.useRef();
   const refPar = React.useRef();
   const refObs = React.useRef();
   
   const history = ReactRouterDOM.useHistory();
   
   return (<div>
  
   
   <Div iref={refOri} name="origem"/>
   <Origem iref={refPar} />
   <Div iref={refObs} name="observações"/>
   <button onClick={()=>{
       axios.post("/edit", {ori:refOri.current.value, par: refPar.current.value, obs:refObs.current.value,ref:id, status:0} ).then(result=> history.push("/document/"+id) ).catch(err=>alert(err));
   }} >
   Editar
   </button>
   </div>);
}


