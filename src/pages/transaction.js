import React,{useState,useEffect,useContext}from 'react';
import { ethers } from 'ethers';
import Style from '../styles/block.module.css';
import { Etherescan } from 'context/Etherscan';
import Link from 'next/link';
import { useRouter } from 'next/router';

const transaction = () => {
  const {provider} = useContext(Etherescan);
  const router = useRouter();
  const {query} = router;
  const txnHash = Object.keys(query)[0];

  const transDetails =[];
  const [transactionData, settransactionData] = useState([]);
  const [gasLimit, setgasLimit] = useState([]);
  const [gasPrice, setgasPrice] = useState([]);
  const [etherValue, setetherValue] = useState([]);

  const [txnFrom, settxnFrom] = useState([]);
  const [txnTo, settxnTo] = useState([]);
  const [blockNo, setblockNo] = useState([]);
  const [txnNonce, settxnNonce] = useState([]);
  const [txnChainId, settxnChainId] = useState([]);
  const [txnConfirmations, settxnConfirmations] = useState([]);

  const GetTransactionDetails=async()=>{
    try {
      const getTransactionDetails = await provider.getTransaction(txnHash);
    transDetails.push(getTransactionDetails);
    settransactionData(getTransactionDetails);
    const getgasLimit= ethers.utils.formatEther(getTransactionDetails.gasLimit);
    setgasLimit(getgasLimit);
    const getgasPrice = ethers.utils.formatEther(getTransactionDetails.gasPrice);
    setgasPrice(getgasPrice);
    const getetherValue = ethers.utils.formatEther(getTransactionDetails.value);
    setetherValue(getetherValue);
    const gettxnFrom = getTransactionDetails.from;
    settxnFrom(gettxnFrom);
    const gettxnTo = getTransactionDetails.to;
    settxnTo(gettxnTo);
    const getblockNo = getTransactionDetails.number;
    setblockNo(getblockNo);
    const gettxnNonce= getTransactionDetails.nonce;
    settxnNonce(gettxnNonce);
    const gettxnChainId= getTransactionDetails.chainId;
    settxnChainId(gettxnChainId);
    const gettxnConfirmations = getTransactionDetails.confirmations;
    settxnConfirmations(gettxnConfirmations);
    } catch (error) {
      alert("Something went wrong while getting Transaction Data.")
    }
    
  }

  useEffect(() => {
    GetTransactionDetails();
  }, [])
  
  return (
    <div className={Style.block}>
      <div className={Style.box}>
        <div className={Style.box_header}>
          <h1>Transaction</h1>
          <h3>{txnHash}</h3>
        </div>
        <div className={Style.blockTable}>
        <div className={Style.dataRow}>
            <p>Txn Hash</p>
            <p >{txnHash ? txnHash:"Not Available"}</p>
            
          </div>
          <div className={Style.dataRow}>
            <p>From</p>
            <Link href={{pathname:"/account", query: transactionData.from}}>
              <p className={Style.color} >{txnFrom ? txnFrom:"Not Available"}</p>
            </Link>
          </div>
          <div className={Style.dataRow}>
            <p>To</p>
            <Link href={{pathname:"/account", query: transactionData.to}}>
              <p className={Style.color} >{txnTo ? txnTo:"Not Available"}</p>
            </Link>
          </div>
          <div className={Style.dataRow}>
            <p>Block Number</p>
              <p className={Style.color}>{blockNo ? blockNo:"Not Available"}</p>           
          </div>
          <div className={Style.dataRow}>
            <p>Nonce</p>
              <p>{txnNonce ? txnNonce:"Not Available"}</p>           
          </div>
          <div className={Style.dataRow}>
            <p>Chain Id</p>
              <p>{txnChainId ? txnChainId:"Not Available"}</p>          
          </div>
          <div className={Style.dataRow}>
            <p>Confirmations</p>
              <p>{txnConfirmations ? txnConfirmations:"Not Available"}</p>          
          </div>
          <div className={Style.dataRow}>
            <p>Gas Price</p>
              <p>{gasPrice ? gasPrice:"Not Available"}</p>          
          </div>
          <div className={Style.dataRow}>
            <p>Gas Limit</p>
              <p>{gasLimit ? gasLimit:"Not Available"}</p>          
          </div>
          <div className={Style.dataRow}>
            <p>Value</p>
              <p>{etherValue ? etherValue:"Not Available"}</p>          
          </div>
        </div>
      </div>
    </div>
  )
}

export default transaction