import { json ,redirect} from 'react-router';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
export async function authAction({request}){
  const searchParams= new URL().searchParams();

  const mode =searchParams.get("mode")||'login'

  if(mode!== 'login' || mode!== 'signup' ){
    throw json({message:"unsupported mode"},{status:422})
  }
  const data = await request.fromData();
  const authData={
    email:data.get("email"),
    password:data.get('password')
  }
  const response=await fetch("http://localhost:/"+mode,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(authData)
  })
  if(response.status===422 || response.status===401){
    return response;
  }
  if(!response.ok){
    throw json({message:"Could authentificate user"},{status:500});

  }
  return redirect("/")
  
}