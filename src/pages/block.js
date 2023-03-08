import React,{useState,useEffect,useContext} from 'react';
import { ethers } from 'ethers';
import { Etherescan } from 'context/Etherscan';
import Style from '../styles/block.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const block = () => {
 const {provider} = useContext(Etherescan);
 const router = useRouter();
 const {query} = router;
 const blockNumber= Number(Object.keys(query)[0]);

 const [open, setopen] = useState(false);
 const dataBlock=[];
 const [blockData, setblockData] = useState([]);
 const [transaction, settransaction] = useState([]);

 const [ethGasLimit, setethGasLimit] = useState("");
 const [ethGasDifficulty, setethGasDifficulty] = useState("");
 const [ethGasUsed, setethGasUsed] = useState("");

 const [blockNo, setblockNo] = useState(true);
 const [transactionTab, settransactionTab] = useState(false);

 const [blockHash, setblockHash] = useState([]);
 const [blockParentHash, setblockParentHash] = useState([]);
 const [getBlockNumber, setgetBlockNumber] = useState([]);
 const [blockTimestamp, setblockTimestamp] = useState([]);
 const [blockNonce, setblockNonce] = useState([]);
 const [blockMiner, setblockMiner] = useState([]);

 const OpenTab=()=>{
  if(blockNo){
    setblockNo(false);
    settransactionTab(true);
  }else if(transaction){
    setblockNo(true);
  }
 };
 const GetBlockDetails=async()=>{
  try{
    const getBlockk = await provider.getBlock(blockNumber);
    dataBlock.push(getBlockk);
    setblockData(dataBlock);
    setblockHash(getBlockk.hash);
    setgetBlockNumber(getBlockk.number);
    setblockParentHash(getBlockk.parentHash);
    setblockMiner(getBlockk.miner);
    setblockNonce(getBlockk.nonce);
    setblockTimestamp(getBlockk.timestamp);
   
    const gasLimit=  ethers.utils.formatEther(getBlockk.gasLimit);
    setethGasLimit(gasLimit);
 
    const gasUsed = ethers.utils.formatEther(getBlockk.gasUsed);
    setethGasUsed(gasUsed);

    const gasDifficulty = ethers.utils.formatEther(getBlockk._difficulty);
    setethGasDifficulty(gasDifficulty);
    settransaction(getBlockk.transactions);
  }catch(e){
    alert("Something went wrong in fetching block Data");
  } 
 }
 useEffect(() => {
  GetBlockDetails();
 }, [])
 

  return (
    <div className={Style.block}>
      <div className={Style.box}>
        <div className={Style.box_header}>
          <h1>Block Number</h1>
          <h3>{blockNumber}</h3>
        </div>
        <div className={Style.blockTable}>
          <div className={Style.blockBtn}>
            <button onClick={()=>OpenTab()}>Block Details</button>
            <button onClick={()=>OpenTab()}>Block Transactions</button>
          </div>
          {blockNo?(
            <div>
              <div className={Style.dataRow}>
                <p>Number</p>
                <p>{getBlockNumber}</p>
              </div>
              <div className={Style.dataRow}>
                <p>TimeStamp</p>
                <p>{ blockTimestamp ? blockTimestamp :"No TimeStamp Available"}</p>
              </div>
              <div className={Style.dataRow}>
                <p  >Miner</p>
               <p>{blockMiner ? blockMiner:"No Miner Available"}</p>         
              </div>
              <div className={Style.dataRow}>
                <p>Hash</p>
                <p>{blockHash ? blockHash :"No Hash Available"}</p>
              </div>
              <div className={Style.dataRow}>
                <p>ParentHash</p>
                <p>{blockParentHash? blockParentHash : "NO parent Hash Available"}</p>            
              </div>
              <div className={Style.dataRow}>
                <p>Nonce</p>
                <p>{blockNonce? blockNonce:"No Nonce Available"}</p>
              </div>
              <div className={Style.dataRow}>
                <p>Gas Used</p>
                <p>{ethGasUsed}</p>
              </div>
              <div className={Style.dataRow}>
                <p>Gas Limit</p>
                <p>{ethGasLimit}</p>
              </div>
              <div className={Style.dataRow}>
                <p>Gas Difficulty</p>
                <p>{ethGasDifficulty}</p>
              </div>
            </div>
          ):(
            <div className={Style.dataTable}>
              <div className={Style.coloum}>
                <div className={Style.tableTitle}>
                  <p>Total Transaction In The Block are {transaction.length}</p>
                </div>
                <div className={Style.tableInfo}>
                  {transaction.map((el, i) => (
                    <div key={i + 1} className={Style.transHash}>
                      <samp>{i + 1}</samp>
                      <Link
                        href={{
                          pathname: "/transaction/",
                          query: blockData.hash,
                        }}
                      >
                        <p className={Style.color}>{el}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default block