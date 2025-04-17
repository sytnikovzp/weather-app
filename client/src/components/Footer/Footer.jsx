import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div id='footer'>
      <p>Designed by Alexandr Sytnikov</p>
      <p>© 2024 - {currentYear}</p>
    </div>
  );
}

export default Footer;
