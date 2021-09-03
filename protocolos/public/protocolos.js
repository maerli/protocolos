
function Protocolos(){

const [protocolos, setProtocolos] = React.useState([]);
React.useEffect(()=>{
        axios.get("/all").then(data=>{
          setProtocolos(data.data);
        }).catch(err=>{
        alert(err);
        });
    },[]);

return (<div>  <Table ptls={protocolos} rows={{"protocolo":(row)=>{
    return <Link to={"/history/"+row.id} > {serialize(row.id, 1, row.tms)} </Link>
}, "origem":"ori","interessado":"_int","cpf":"cpf"}} /> </div>);

}
