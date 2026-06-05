import React from 'react'
import Ellipse from '../assets/Ellipse 395.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faUser, faStar, faArrowRightFromBracket, faPlusMinus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './style/navbar.css'

function Navbar() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const toogleMenu = () => {
        setMenuOpen(!menuOpen);
    }
  return (
    <nav>
        <div className="logo">
            <p>SDU</p>
        </div>
        <ul className='nav-link'>
            <li>
                <Link to="/dashboard" className='nav-link'>Dashboard</Link>
            </li>
            <li>
                <Link to="/transaksi" className='nav-link'>Transaksi</Link>
            </li>
            <li>
                <Link to="/riwayat" className='nav-link'>Riwayat</Link>
            </li>
        </ul>

        <div className="profil">
            <img src={Ellipse} alt="fotoProfil" />
            <button className="toogle" onClick={toogleMenu}>
                <FontAwesomeIcon icon={faArrowDown} style={{color: "rgb(255, 255, 255)",}} />
            </button>

            {menuOpen && (
                <div className="menu" >
                    <ul>
                        <Link to="/profil"><li><FontAwesomeIcon icon={faUser} style={{color: "rgb(255, 255, 255)",}} /> Profil Saya</li></Link>
                        <Link to="/login"><li><FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "rgb(255, 255, 255)",}} /> Keluar</li></Link>
                    </ul>
                </div>
            )}
        </div>

    </nav>
  )
}

export default Navbar