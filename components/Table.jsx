import React,{useState,useEffect,useContext} from 'react'
import {FaFilter} from 'react-icons/fa';
import Transaction from './Transaction';
import Internal from './Internal';
import BlockRange from './BlockRange';
import MinedBlock from './MinedBlock';
import Erc20Token from './Erc20Token';
import Erc721Token from './Erc721Token';
import Erc1155Token from './Erc1155Token'; 
import Style from './style/Table.module.css';
// Receiving props from Account Page.
const Table = ({AccountData,accountHistory,internalByAddress,blockMinedByAddress,blockRangeTransaction,totalTransaction,erc20,erc721,erc1155}) => {
  
  const [historyAccount, sethistoryAccount] = useState(true);
  const [addressInternalTransaction, setaddressInternalTransaction] = useState(false);
  const [addressByMindedBlock, setaddressByMindedBlock] = useState(false);
  const [transactionRangeBlock, settransactionRangeBlock] = useState(false);
  const [openErc20, setopenErc20] = useState(false);
  const [openErc721, setopenErc721] = useState(false);
  const [openErc1155, setopenErc1155] = useState(false);

  const Tabs=(e)=>{
    const button = e.target.innerText;
    if(button==="Transaction"){
      sethistoryAccount(true);
      setaddressByMindedBlock(false);
      setaddressInternalTransaction(false);
      setopenErc1155(false);
      setopenErc20(false);
      setopenErc721(false);
      settransactionRangeBlock(false);     
    }else if(button==="Internal"){
      sethistoryAccount(false);
      setaddressByMindedBlock(false);
      setaddressInternalTransaction(true);
      setopenErc1155(false);
      setopenErc20(false);
      setopenErc721(false);
      settransactionRangeBlock(false);     
    }else if(button==='Mined'){
      sethistoryAccount(false);
      setaddressByMindedBlock(true);
      setaddressInternalTransaction(false);
      setopenErc1155(false);
      setopenErc20(false);
      setopenErc721(false);
      settransactionRangeBlock(false);     
    }else if(button==='Erc-20'){
      sethistoryAccount(false);
      setaddressByMindedBlock(false);
      setaddressInternalTransaction(false);
      setopenErc1155(false);
      setopenErc20(true);
      setopenErc721(false);
      settransactionRangeBlock(false);     
    }else if(button==='Erc-721'){
      sethistoryAccount(false);
      setaddressByMindedBlock(false);
      setaddressInternalTransaction(false);
      setopenErc1155(false);
      setopenErc20(false);
      setopenErc721(true);
      settransactionRangeBlock(false);     
    }else if(button==='Erc-1155'){
      sethistoryAccount(false);
      setaddressByMindedBlock(false);
      setaddressInternalTransaction(false);
      setopenErc1155(true);
      setopenErc20(false);
      setopenErc721(false);
      settransactionRangeBlock(false);     
    }
  }
  return (
    <div className={Style.table}>
      <div className={Style.table_head}>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Transaction</button>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Internal</button>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Mined</button>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Erc-20</button>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Erc-721</button>
        <button className={Style.btn} onClick={(e)=>Tabs(e)}>Erc-1155</button>
      </div>
     <div className={Style.noofTransaction}>
      <FaFilter/>
      <p>Latest 10 Transaction from total of <span>{totalTransaction}</span> Transaction</p>
     </div>

     {historyAccount? (
     <Transaction handleClick={AccountData} accountHistory={accountHistory} />
     ):(
       ""
     )}

     {addressInternalTransaction?(
      <Internal internalByAddress={internalByAddress} handleClick={AccountData} />
     ):(
      ""
     )}

     {addressByMindedBlock?(
      <MinedBlock handleClick={AccountData} blockMinedByAddress={blockMinedByAddress} />
     ):(
      ""
     )}
     {transactionRangeBlock?(
     <BlockRange handleClick={AccountData} blockRangeTransaction={blockRangeTransaction} />
     ):(
      ""
     )}

     { openErc20? <Erc20Token erc20={erc20} handleClick={AccountData} />:""}
     { openErc721? <Erc721Token erc721={erc721} handleClick={AccountData} />:""}
     { openErc1155? <Erc1155Token erc1155={erc1155} handleClick={AccountData} />:""}
    </div>
  )
}

export default Table