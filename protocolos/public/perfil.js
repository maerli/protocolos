function Perfil(props){

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    
    return (<div> Perfil
    <div> {user.name} </div>
    <div> {user.orgao} </div>
    <div> {user.email} </div>
    
     </div>);
}
