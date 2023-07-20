import { NavLink } from 'react-router-dom';
import "./index.css";

export function Header() {
    return(
        <div style={{width: "100%", height: "8vh", background: "rgb(86,50,50)", color: "white", display: "flex", lineHeight: "8vh", justifyContent: "center"}}>
            <div className="button">
                <NavLink style={{color: "white", textDecoration: "none"}} to="/usuarios">Usuários</NavLink>
            </div>
            <div className="button">
                <NavLink style={{color: "white", textDecoration: "none"}} to="/">Sala</NavLink>
            </div>
        </div>
    )
}