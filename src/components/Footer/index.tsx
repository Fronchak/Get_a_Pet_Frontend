import './styles.css';

const Footer = () => {

  console.log('Footer renderizou');

  return (
    <footer id="footer" className="p-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 text-center text-sm-start">
          <div className="col">
            <h4>Resources</h4>
            <ul className="list-unstyled">
              <li><a href="#">About</a></li>
              <li><a href="#">Resource listing</a></li>
              <li><a href="#">Press kit</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Help</h4>
            <ul className="list-unstyled">
              <li><a href="#">Stack Overflow</a></li>
              <li><a href="#">Join Discord</a></li>
              <li><a href="#">Gitter</a></li>
              <li><a href="#">Report Issues</a></li>
              <li><a href="#">Code of Conduct</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Community</h4>
            <ul className="list-unstyled">
              <li><a href="#">Events</a></li>
              <li><a href="#">Meetups</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Contribute</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Languages</h4>
            <ul className="list-unstyled">
              <li><a href="#">English</a></li>
              <li><a href="#">Español</a></li>
              <li><a href="#">Portuguese</a></li>
              <li><a href="#">简体中文版</a></li>
              <li><a href="#">Complete language list</a></li>
            </ul>
          </div>
        </div>
        <div id="footer-bottom" className="pt-5 text-center" >
          <p>Copyright &copy; 2023 - <span className="primary-color">Get a pet</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
