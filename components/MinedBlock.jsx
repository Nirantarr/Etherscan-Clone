import React from 'react'
import {AiFillEye} from 'react-icons/ai';
import Link from 'next/link';
import Style from './style/Table.module.css';
const MinedBlock = ({blockMinedByAddress,AccountData}) => {
  return (
    <div>
   {blockMinedByAddress.length===0?(
    <div className={Style.sorry}>
    <p>No Mined Transactions found</p>
    </div>
   ):(
  <div className={Style.dataTable}>
    <div className={Style.coloum}>
        <div className={Style.dataTitle}>
           <p> Mined Block</p>
        </div>
        <div className={Style.tableInfo}>
            {blockMinedByAddress.map((el,i)=>(
                <div className={Style.transHash} key={i+1}>
                    <AiFillEye/>
                    <p className={Style.toLink}>
                    <Link href={{ pathname: "/block/", query: el.blockNumber }}>
                      <a>{el.blockNumber}</a>
                    </Link>
                    </p>
                </div>
            ))}
        </div>

    </div>
    <div className={Style.coloum}>
            <div className={Style.tableTitle}>
              <p>Block Reward</p>
            </div>
            <div className={Style.tableInfo}>
              {blockMinedByAddress.map((el, i) => (
                <div key={i + 1} className={Style.transHash}>
                  <p>{el.blockReward.slice(0, 10)}..</p>
                </div>
              ))}
            </div>
          </div>
          <div className={Style.coloum}>
            <div className={Style.tableTitle}>
              <p>TimeStamp</p>
            </div>
            <div className={Style.tableInfo}>
              {blockMinedByAddress.map((el, i) => (
                <div key={i + 1} className={Style.transHash}>
                  <p>{el.timeStamp}</p>
                </div>
              ))}
            </div>
          </div>
  </div>
   )}
 </div> )
}

export default MinedBlock