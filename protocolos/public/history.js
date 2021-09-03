function History(props){
  const [data,setData] = React.useState([]);
  const {id} = ReactRouterDOM.useParams();
  
  React.useEffect(()=>{
     axios.get("/history/"+id).then(result=>{
        setData(result.data);
        
     }).catch(err=>alert(err));
  },[]);
  
  return (<div> <Link to={"/document/"+id} > as document </Link>
  <Table ptls={data} rows={{"protocolo":(row,i)=>{
      return (<span> {serialize(row.id,i+1, row.tms)} </span>);
     },"origem":"ori","para":"par","obs":"obs"}} />
    </div>);
  
  
}