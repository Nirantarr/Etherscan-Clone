import React,{useState,useContext} from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiSendPlaneFill } from "react-icons/ri";
import Style from "./index.module.css";
import { Etherescan } from "context/Etherscan";
import etherlogo from 'Images/Ethlogo.jpg';  
import Image from "next/image";

 const Home = () => {
  const router = useRouter();
  const {transaction,yourBlockTrans} = useContext(Etherescan);
  const [userAccount, setuserAccount] = useState('');
 
 const ConvertToETH=(amount)=>{
  const ETH = ethers.utils.formatUnits(amount);
  return ETH;
 }
//  preventDefault function stops the event from whatever it was doing .
// trim function removes spaces .
 const AccountAddress=(event)=>{
  event.preventDefault();
  const address= document.getElementById("accountAddress").value.trim();
  setuserAccount(address);
  router.push(`/account/?${address}`);
 }

  return (
    <div>
      <div className={Style.header}>
        <form className={Style.accountAddress}>
          <input type="text" placeholder='Enter Address' id='accountAddress'/>
          <Link href={{pathname: '/account/', query: userAccount}} >
          <a onClick={(event)=>AccountAddress(event)}><RiSendPlaneFill/></a>
          </Link>
        </form>
      </div>
      {/*  */}
      <div className={Style.container}>
        <div className={Style.container__box}>
          <h3>Latest Blocks</h3>
          <div className={Style.container__block}>
            
            {yourBlockTrans.map((el,i)=>(
              <div className={Style.oneBlock} key={i+1}>
                <div className={Style.block}>
               <div className={Style.info}>
                <p className={Style.bk}>🧊</p>
                <Link href={{pathname: "/block", query: el.number}}>
                  <a>{el.number}</a>
                </Link>
                <p>{el.timestamp}</p>
                <div className={Style.miner}>
                  <p>
                    <span>
                      Miner: &nbsp;
                      <Link className={Style.link} href={{pathname: "/account/", query: el.miner}}>
                        <a>{el.miner.slice(0,30)}....</a>
                      </Link>
                    </span>
                  </p>
                  <span>
                   <Link href={{pathname: "/account/", query: el.number}}>
                    <a>{el.transactions.length}</a>
                   </Link>
                   &nbsp; Txn in 30 Sec
                  </span>
                  <div className={Style.reward}>
                   <p>{ConvertToETH(el.baseFeePerGas)}</p><span>ETH</span>
                   <Image className={Style.eth} src={etherlogo} alt="logo" height={10} width={10} />
                  </div>
                </div>
               </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.container__box}>
          <h3>Latest Transactions</h3>
          <div className={Style.container__block}>
            {transaction.map((el,i)=>(
              <div className={Style.oneBlock} key={i+1}> 
              <div className={Style.info}> 
              <div>
                <p className={Style.bk}>🗐</p>
              </div>
              <Link href={{pathname:"/transaction", query: el}}>
                <a>Hash: &nbsp; {el.slice(0,40)}...</a>
              </Link>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home
