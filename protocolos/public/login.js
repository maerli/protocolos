function Login(props){
   const refEml = React.useRef();
   const refPwd = React.useRef();
   const history = ReactRouterDOM.useHistory();
   function login(){
      axios.post("/login", {
         email:refEml.current.value,
         pwd: refPwd.current.value
      }).then(result=>{
         localStorage.setItem("user", JSON.stringify(result.data[0]));
         history.push("/");
      })
   }

   return (<div>
   <input ref={refEml} type="text"/>
   <hr/>
   <input ref={refPwd} type="password"/>
   <hr/>
   <button onClick={()=> login()}>
   Login
   </button>
   </div>);
   
}