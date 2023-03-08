import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import Style from './style/Navbar.module.css';
import etherlogo from '../Images/Ethlogo.jpg';
import brandlogo from '../Images/Brandlogo.jpg';
import avatarlogo from '../Images/Avatarlogo.jpg';
import { MdOutlineClose } from 'react-icons/md';
import { TbChartArrowsVertical } from 'react-icons/tb';
import { Etherescan } from 'context/Etherscan';
import { ethers } from 'ethers';


const Navbar = () => {
 const {provider} = useContext(Etherescan);
  const [userAccount, setuserAccount] = useState('');
  const [etherPrice, setetherPrice] = useState([]);
  const [etherPriceBtc, setetherPriceBtc] = useState([]);
  const [balance, setbalance] = useState('');
  const [count, setcount] = useState('');
  const [openModel, setopenModel] = useState(true);
  const [etherSupply, setetherSupply] = useState([]);
  const [updatedPriceDate, setupdatedPriceDate] = useState('');
 
  
  const GetEtherPrice = async () => {
    const Ether_Api_key="TX842WKJ5EBBPRREXCEVF66RUQCV9VJ1U2";
    try { 
      axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${Ether_Api_key}`).then((response) => {
        // console.log(response.data.result);
        setetherPrice(response.data.result.ethusd);
        setetherPriceBtc(response.data.result.ethbtc);
        // console.log(etherPrice);
        const timeStamp = Number(response.data.result.ethusd_timestamp);
        const date = new Date(timeStamp);
        setupdatedPriceDate("Updated Date :" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
      })
      //  console.log(updatedPriceDate);

      axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${Ether_Api_key}`).then((response) => {
        setetherSupply(response.data.result);
      })

    } catch (error) {
      alert("Something went wrong while getting Ether Price");
    }
  };

  const ConnectWallet = async () => {
    try {
      if (!window.ethereum) alert("Please Install Metamask")
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length) {
        setuserAccount(accounts[0]);
      }
      const getbalance = await provider.getBalance(accounts[0]);
      const ethbalance = ethers.utils.formatEther(getbalance);
      setbalance(ethbalance);
      console.log(ethbalance);
      const getcount = await provider.getTransactionCount(accounts[0]);
      setcount(getcount);
      console.log(getcount);
    } catch (error) {
      alert("Something went wrong while getting connected to Metamask");
    }
  }
 
  // FUNCTION TO GET ACCOUNT INFO WHEN IT GET CONNECTED
  const OpenUserInfo = async () => {
    if (openModel) {
      setopenModel(false);
    } else if (!openModel) {
      setopenModel(true);
    }
   
  };

  useEffect(() => {
    GetEtherPrice();
  }, [])

  return (
    <div>
      <div className={Style.navbar}>
        <div className={Style.navbar_container} >
          <div className={Style.navbar_container_left}>
            <Link href="/">
              <div>
                <h1 className={Style.desktop} >ETHEREUM TRANSACTION TRACKER</h1>
                <h1 className={Style.mobile} ><Image src={brandlogo} alt="Brand logo" width={50} height={50} /></h1>
                <div className={Style.back}>
                  <p>Go Back</p>
                </div>
              </div>
            </Link>
          </div>

          <div className={Style.navbar_container_right}>
            {userAccount.length ? (
              <div className={Style.connected}>
                <button onClick={() => OpenUserInfo()}>Acc:{userAccount.slice(0, 15)}...</button>
                {openModel ? (
                  <div className={Style.userModal}>
                    <div className={Style.user_box}>
                      <div className={Style.closeBtn}>
                        <MdOutlineClose onClick={() => OpenUserInfo()} />
                      </div>
                      <Image src={avatarlogo} alt="Image" height={50} width={50} />
                      <p>Account: &nbsp; {userAccount.slice(0, 20)}...</p>
                      <p>Balance : &nbsp; {balance} ETH</p>
                      <p>Total Transcation : &nbsp;{count} </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <button onClick={() => ConnectWallet() }>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>
      <div className={Style.price}>
        <div className={Style.price_box}>
          <div className={Style.etherprice}>
            <div>
              <Image src={etherlogo} alt="ether logo" width={30} height={30} />
            </div>
            <div>
              <h1>ETHER PRICE</h1>
              <p> $ {etherPrice}</p>
              <p>Btc {etherPriceBtc}</p>
              <p>{updatedPriceDate}</p>
            </div>
          </div>
          <div className={Style.supplyEther}>
            <div>
              <TbChartArrowsVertical className={Style.supplyIcon} />
            </div>
            <div>
              <h1>ETHER SUPPLY</h1>
              <p>{etherSupply}</p>
              {/* <p>btc 10</p> */}
              <p>{updatedPriceDate}</p>
            </div>
          </div>
        </div>
        <div className={Style.price_box} >
          <div className={Style.tokenbox}>
            <Image src={brandlogo} alt="logo" height={150} width={150}/>
          </div>
          <div className={Style.logowidth} >
            <p>Erc20 Token</p>
            <p>Erc21 Token</p>
            <p>Erc721 Token</p>
            <p>Erc1155 Token</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar
