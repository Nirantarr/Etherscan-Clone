import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Style from '../styles/account.module.css';
import { Etherescan } from 'context/Etherscan';
import Ethlogo from 'Images/Ethlogo.jpg';
import Table from 'components/Table';

const account = () => {
  const [account, setaccount] = useState('');
  const [balance, setbalance] = useState('');
  const [totalTransaction, settotalTransaction] = useState('');
  const [open, setopen] = useState(true);
  const [name, setname] = useState('');
  const [loading, setloading] = useState(true);
  //  API STATE
  const [accountHistory, setaccountHistory] = useState([]);
  const [internalByAddress, setinternalByAddress] = useState([]);
  const [blockMinedByAddress, setblockMinedByAddress] = useState([]);
  const [blockRangeTransaction, setblockRangeTransaction] = useState([]);
  const [erc20, seterc20] = useState([]);
  const [erc721, seterc721] = useState([]);
  const [erc1155, seterc1155] = useState([]);
  const API_KEY = "TX842WKJ5EBBPRREXCEVF66RUQCV9VJ1U2";

  const { provider } = useContext(Etherescan);
  const router = useRouter();
  //  we have fetched the object query i.e. the address from the url provided by router.
  const { query } = router;
  //  here we are accessing the 0 index query object element. i.e. address.
  const acc = Object.keys(query)[0];

  const AccountData = async () => {
    try {
      setaccount(acc);
      if (open) {
        setopen(false);
      }
      const ESN = await provider.lookupAddress(acc);
      if (ESN === null) {
        setname(ESN);
        setloading(false);
      } else {
        setname(ESN);
        setloading(false);
      }

    const GetBalance= await provider.getBalance(acc);
    // console.log(GetBalance);
    const EthBalance= ethers.utils.formatEther(GetBalance);
    setbalance(EthBalance);

      // we have fetch() and axios both methods are used to fetch data from api link. axios is good one.
      // await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`).then((response) => response.json()).then((data)=>{setaccountHistory(data.result)});
      
      axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`).then((response)=> setaccountHistory(response.data.result));

      // INTERNAL TRANSACTION BY ACC
      axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${API_KEY}`).then((response) => 
        setinternalByAddress(response.data.result)
    );

      axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`).then((response) => 
        seterc20(response.data.result)
      );

      axios.get(`https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&page=1&offset=10&apikey=${API_KEY}`).then((response) => {
        const blockMinededByAddress = response.data.result;
        setblockMinedByAddress(blockMinededByAddress);
      });

      axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${API_KEY}`).then((response) => 
        setblockRangeTransaction(response.data.result)
      );

      axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`).then((response) =>{       
        seterc721(response.data.result);
    });

      axios.get(`https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=0x76be3b62873462d2142405439777e971754e8e77&address=${acc}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`).then((response) => 
        // const erc1155 = response.data.result;
        seterc1155(response.data.result)
      );

      const transcount = await provider.getTransactionCount(acc);
      settotalTransaction(transcount);
    } catch (error) {
      alert("something went wrong while getting Account Data")
    }

  }

  return (
    <div className={Style.accountDIV}>
    {open ? (
      <div className={Style.btnContainer}>
        <h1>
          {open
            ? `Welcome
           To Ether Finance`
            : "Please wait we are loading your data"}
        </h1>

        <button className={Style.openBtn} onClick={() => AccountData()}>
          Click Me
        </button>
      </div>
    ) : (
      <div>
        {loading ? (
          // <div className={Style.loading}>
          //   <Image src={loader} alt="loading" width={100} height={100} />
          // </div>
          <div className={Style.loader}></div>
        ) : (
          ""
        )}

        {!loading ? (
          <div className={Style.container}>
            <div className={Style.box}>
              <div className={Style.account}>
                <Image  className={Style.img1} src={Ethlogo} alt="logo" width={30} height={30} />
                <p>
                  Address: {acc}
                </p>
              </div>
              <div className={Style.owner}>
                <p onClick={() => AccountData()}>Owner</p>
                {name || "Hello😀"}
              </div>
            </div>

            <div className={Style.overviewBox}>
              <div className={Style.overview}>
                <div className={Style.overviewTitle}>
                  <p className={Style.overview1}> Overview</p>
                  <p className={Style.miner}>
                    {name || "Miner"}:&nbsp; {acc}
                  </p>
                </div>

                <div className={Style.accountBalance}>
                  <p className={Style.color}>Balance</p>
                  <p>{balance} ETH</p>
                </div>
                <div className={Style.accountValue}>
                  <p className={Style.color}>Value</p>
                  <p>$ {balance * 1057.28}</p>
                </div>
              </div>
              <div className={Style.branding}>
                <h2>
                  Welcome <br />
                  To Ether Finance Tracker
                </h2>
                <p>
                  Hey, welcome to ether finance tracker, find out your
                  ethereum &nbsp;
                  {name} &nbsp; financial status
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

{!loading ? (<Table AccountData={AccountData} accountHistory={accountHistory} internalByAddress={internalByAddress} blockMinedByAddress={blockMinedByAddress} blockRangeTransaction={blockRangeTransaction} totalTransaction={totalTransaction} erc20={erc20} erc721={erc721} erc1155={erc1155} />
        ) : (
          ""
        )}
      </div>
    )}
  </div>
);
};

      export default account
