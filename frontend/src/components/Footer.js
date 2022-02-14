function Footer() {
  const chekDate = new Date().getFullYear();
  
  return(
    <footer className="footer page__footer">
      <p className="footer__title">&#169; {chekDate} Mesto Russia</p>
    </footer>
  )
}
export default Footer;