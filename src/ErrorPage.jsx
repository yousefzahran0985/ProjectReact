import { Link } from "react-router-dom"
const ErrorPage = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"20px",alignItems:"center",justifyContent:"center",marginTop:"200px"}}>
        <span style={{color:"red",fontSize:"30px",fontWeight:"bold"}}>404</span>
        <h1>Page not found</h1>
        <p style={{color:"#969696"}}>Sorry, we couldn’t find the page you’re looking for.</p>
        <div>
            <Link to={"/"}>
              <button>
                Go back <i class="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
        </div>
    </div>
  )
}

export default ErrorPage