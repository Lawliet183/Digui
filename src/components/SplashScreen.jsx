import logoDigui from './../assets/images/SplashScreen/Logo DIGUI 2.1.svg';
import './SplashScreen.css';

function SplashScreen() {
  return (
    <div className='container'>
      <p className='welcome-text'>Bienvenido</p>
      <img className='logo' src={logoDigui}></img>
    </div>
  );
}

export default SplashScreen;