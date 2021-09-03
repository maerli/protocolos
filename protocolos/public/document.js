function Document(props){
   const {id} = ReactRouterDOM.useParams();
   const [data,setData] = React.useState([]);
   
   React.useEffect(()=>{
     axios.get("/history/"+id).then(result=>{
        setData(result.data);
     }).catch(err=>alert(err));
  },[]);
  
  function pzeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
  
  function serialize(id,pos, date){
    const year = new Date(date).getFullYear();
    return pzeros(id,5) + "-"+ pzeros(pos,4) + "/"+ year;
  }
  
  
  
  return (<div> 
   {data[0] && (<div>
   <div> Protocolo {serialize(data[0].id, 1, data[0].tms)} </div>
   <div> Orgao {data[0].ori} </div>
   <div> interessaso {data[0]._int} </div>
   <div> assunto {data[0].ass} </div>
   <div> cpf {data[0].cpf} </div>
   <div> observações {data[0].obs} </div>
   <div>
       <table border="1">
   <thead>
            <tr> <th> DE </th> <th> PARA </th><th> OBS</th> <th> resp.</th> </tr>  
    </thead>
    <tbody>
   {
     data.slice(1).map(a=> {
         return (
         <tr>
             <td> {a.ori} </td> <td> {a.par} </td> <td> {a.obs} </td> <td> </td>
         </tr>
         );
     })
   }
   </tbody>
   </table>
   </div>
   <iframe id="pdf"/>
   </div>)
   }
   <button onClick={()=>{
     toPdf();
   }} > imprimir </button>
   </div>);
}
function toPdf(){
    try{
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
         
          // We'll make our own renderer to skip this editor
          var specialElementHandlers = {
            '#getPDF': function(element, renderer){
              return true;
            },
            '.controls': function(element, renderer){
              return true;
            }
          };
        
          // All units are in the set measurement for the document
          // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
          doc.fromHTML(document.body, 15, 15, {
            'width': 170, 
            'elementHandlers': specialElementHandlers
          });
        
        
        var string = doc.output('datauristring');
        
        var iframe = document.querySelector("#pdf");
        iframe.width = "100%";
        iframe.height = "100%";
        
        iframe.src= string;
        
        }catch(err){
        alert(err);
        }
}