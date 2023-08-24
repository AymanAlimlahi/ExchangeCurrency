import './App.css';
import TypeWriterEffect from 'react-typewriter-effect';
import { AiOutlineMenu } from 'react-icons/ai';
import CurrencyInput from './CurrencyInput';
import {useState, useEffect} from "react";
import axios from "axios";
import Fade from 'react-reveal/Fade';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('USD');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('https://api.apilayer.com/fixer/latest?base=USD&apikey=e73f69b76011cfba0062123e1507a2bc')
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);


  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }
  

  return (
    <div>
      <div className='firstpage'>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={'./pictures/logo2.png'} alt="Logo" />
        </div>
        <ul className={isOpen ? 'navbar-menu open' : 'navbar-menu'}>
          <li><a href="#home">Home</a></li>
          <li><a href="#Exchange">Exchange</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <AiOutlineMenu />
        </div>
      </div>
    </nav>
    <div className='p1'>
      <div className='par'>
        <h1>Welcome </h1>
        <p>To Currency Exchange Website</p>
        <br></br>
        <TypeWriterEffect
        textStyle={{
          fontFamily: 'Red Hat Display',
          color: 'black',
          fontWeight: 500,
          fontSize: '1.5em',
        }}
        startDelay={2000}
        cursorColor="white"
        multiText={[
          'To Currency Exchange Website',
          'We offer secure currency exchange.',
          'Stay updated with live exchange rates.',
          'Unlock the potential of international currencies.',
          'Simplify your currency exchange process.',
        ]}
        multiTextDelay={1000}
        typeSpeed={30}
      />
      </div>
      <div>
        <img src={"./pictures/icon1.png"} />
      </div>
    </div>
    </div>
    <div className='part2' id="Exchange">
      <Fade left><h1>Currency Converter</h1></Fade><br/>
      <br/><br/><br/><br/><br/>
      <CurrencyInput currencies={Object.keys(rates)} amount={amount1} currency={currency1}  onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change}/>
      <CurrencyInput currencies={Object.keys(rates)} amount={amount2} currency={currency2}  onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change}/>
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div className='part3' id="About" >
    <section class="about-section">
  <div class="container">
    <div class="content">
      <Fade left>
      <div class="text" id="text">
        <p>With our user-friendly interface, you can easily navigate through different currencies and obtain real-time exchange rates. Our advanced algorithms ensure accurate conversions, allowing you to make informed decisions when exchanging currencies We prioritize security and privacy, implementing industry-standard encryption and data protection measures. Your personal information and transactions are kept confidential, ensuring a safe environment for all users</p>
      </div></Fade>
      <Fade left><div class="image">
        <img src={"./pictures/icon2.png"} />
      </div></Fade>
    </div>
  </div>
</section>
    </div>
    </div>
  );
}

export default App;

