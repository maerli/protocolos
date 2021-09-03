function Table(props){
  const ptls = props.ptls;
  const rows = props.rows;
  
  const head = Object.keys(rows);

  return (<div> <table>
  <thead> <tr> { head.map((b,i)=> (<th key={i}>{ b } </th>)) }  </tr> </thead>
  <tbody>
     {ptls.map((y,j) =>{
         return (<tr key={j} >
         {head.map((row,i)=> (<td key={i}> {typeof rows[row] == "function"?rows[row](y,i):y[rows[row]]}</td>))}
         </tr>);
     })}
  </tbody>
  </table> </div>);
}