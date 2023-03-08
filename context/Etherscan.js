import React,{useContext,useEffect,useState} from 'react';
import {ethers} from 'ethers';
const Api_key="8368f0581bbb4509895da197a7b0aa8c";
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${Api_key}`);

export const Etherescan = React.createContext();

export const EtherescanProvider= ({children})=>{
    const tenBlocksWithDetails=[];
    const [yourBlockTrans, setyourBlockTrans] = useState(tenBlocksWithDetails);
    const [currentBlock, setcurrentBlock] = useState(0);
    const [topTenBlock, settopTenBlock] = useState([]);
    const [transaction, settransaction] = useState([]);
    const [gasPrice, setgasPrice] = useState("");

    const AccountDetails=async()=>{
    try {
        // Here by getBlockNumber() we get the particular block number.
        const getCurrentBlock = await provider.getBlockNumber();
        setcurrentBlock(getCurrentBlock);
        
        // Here by getBlock() we get the information about the particular block.
        const blockTransaction = await provider.getBlock(getCurrentBlock);
        settransaction(blockTransaction.transactions); 
        // Here we are getting last 10 Block in in a array.
        const listTenBlockArray=[];
        const prevTenBlocks=getCurrentBlock-10;
        for(let i=getCurrentBlock; i>prevTenBlocks; i--){
            listTenBlockArray.push([i]);
        }
        const getBlockDetails = listTenBlockArray.flat();
        settopTenBlock(getBlockDetails);
        getBlockDetails.map(async(el)=>{
            const singleBlockData= await provider.getBlock(el);
            tenBlocksWithDetails.push(singleBlockData);
            // console.log(tenBlocksWithDetails);
        });

        // Getting the gas price
        const gasPricee= await provider.getGasPrice();
        const gasPriceeEther = ethers.utils.formatUnits(gasPricee);
        setgasPrice(gasPriceeEther);

    } catch (error) {
        alert("Something went wrong while fetching the Data");
    }
    }
    useEffect(() => {
      AccountDetails();
    }, [])
    

    return(
    <Etherescan.Provider value={{currentBlock,gasPrice,topTenBlock,transaction,provider,yourBlockTrans}}>
        {children}    
    </Etherescan.Provider>
    )
}