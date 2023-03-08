import '@/styles/globals.css'
import Navbar from 'components/Navbar.jsx';
import Footer from 'components/Footer.jsx';
import { EtherescanProvider } from 'context/Etherscan';
// In app.js components which are used remains same all the time even if we change the page inside app it will remain same.
const App=({ Component, pageProps })=> (
  
  <EtherescanProvider>
    <div> 
  <Navbar/>
  <Component {...pageProps} />
  
  <Footer/>
  </div>
  </EtherescanProvider>

);
export default App;
