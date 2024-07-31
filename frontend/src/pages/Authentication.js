import { json ,redirect} from 'react-router';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
export async function action({request}){
  const searchParams= new URL(request.url).searchParams;

  const mode =searchParams.get("mode")||'login';

  if(mode !== 'login' && mode!== 'signup' ){
    throw json({message:"unsupported mode"},{status:422})
  }
  const data = await request.formData();
  const authData={
    email:data.get("email"),
    password:data.get('password')
  }
  console.log(mode)
  const response=await fetch("http://localhost:8080/" + mode,{
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
    throw json({message:"Could not authentificate user"},{status:500});

  }
  const resData=await response.json();
  const token=resData.token;
  localStorage.setItem("token",token);

  const expiration=new Date();
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem("expiration",expiration.toISOString())
  return redirect("/")
  
}