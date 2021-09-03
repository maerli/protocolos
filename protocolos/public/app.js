function App(){
    const history = ReactRouterDOM.useHistory();

    return (<Router> 
    <Link to="/protocolos"> Protocolos </Link>
    <Link to="/"> [ + ] </Link>  ||
    <Link to="/origens"> Origens </Link>
    <Link to="/assuntos"> Assuntos </Link>
    <Link to="/perfil"> Perfil </Link>
    <button onClick={()=>{
        localStorage.clear();
        history.push("/login");
    }}> sair </button>
    <Switch>
       <Route path="/login">
         <Login/>
       </Route>
       <Route path="/" exact > 
          <Main/>
       </Route>
       <Route path="/protocolos">
          <Protocolos/>
       </Route>
       <Route path="/history/:id">
           <History/>
       </Route>
       <Route path="/edit/:id">
           <Edit/>
       </Route>
       <Route path="/document/:id">
       <Document/>
       </Route>
       <Route path="/origens">
          <Origens/>
       </Route>
       <Route path="/assuntos">
          <Assuntos/>
       </Route>
       
       <Route path="/perfil">
          <Perfil/>
       </Route>
    </Switch>
    </Router>);
}