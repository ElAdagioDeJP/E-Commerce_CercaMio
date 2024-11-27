import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text"> CopyRigth © {new Date().getFullYear()} CercaMio.com . Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="/privacidad" className="footer-link">Política de Privacidad</a>
            <a href="/terminos" className="footer-link">Términos y Condiciones</a><br></br>
            <p>Contactenos a este número: 0412-4507593</p>

          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;