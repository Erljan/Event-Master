import { useNavigate} from "react-router-dom"


export const Home = () => {
    const navigate = useNavigate()

  return (
    <div>
        Home
        
        <button onClick={()=> navigate("/logout")}>Logout</button>
    </div>
  )
}
