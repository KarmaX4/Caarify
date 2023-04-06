import NextAuth,{NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
// import NextAuth from "next-auth/next";
  const  authOptions : NextAuthOptions ={
     session: {
        strategy: "jwt"
     },
     providers: [
            CredentialsProvider({
                type: "credentials",
                credentials: {},
                authorize(credentials,req){
                    const {email,password} = credentials as {
                        email: string; 
                        password: string;
                    };
                    if ( email !== "React@tms.com" || password !== "12345"){
                        return null;
                    }

                    return {id: '123', name:"react", email:"React@tms.com"}
                }

                 })
     ],
     pages:{
            signIn: "pages/login",
     },
  }

export default NextAuth(authOptions);