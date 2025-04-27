import './Footer.css';

function Footer() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();

  const years =
    startYear === currentYear
      ? `${startYear}`
      : `${startYear} - ${currentYear}`;

  return (
    <footer className='footer'>
      <p>© {years} Alexandr Sytnikov</p>
      <p>All rights reserved</p>
    </footer>
  );
}

export default Footer;
