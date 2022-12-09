import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios';
const NativeTransfer = (props) => {
    const {email} = props
    const [chain, setChain] = useState('mumbai')
    const [balance, setBalance] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [provider, setProvider] = useState('');

    const api = "https://thedelvierypointe.com"

    useEffect(() => {
      checkBalance()
    })

    const checkBalance = async () => {
      
        
        const response = await axios.post(
          `${api}/balance`,
          { email, chain },
          { withCredentials: true },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setBalance(response.data);
        console.log(response.data);
      
    }

    //Transfer
    const send = async () => {
    
      const response = await axios.post(
        `${api}/send`,
        { email, amount, receiver, chain },
        { withCredentials: true },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      checkBalance(); //calling after transfer
    }

    const handleChange = (e) => {
       checkBalance();  //calling on change
       setChain(e.target.value)
    }

    const handleReceiverInput = (e) => setReceiver(e.target.value)
    const handleAmountInput = (e) => setAmount(e.target.value)

    return <section className="py-12 px-7 shadow-lg rounded-2xl w-fit mx-auto bg-[#141E2F] text-[20px]">
              
                <select value={chain} onChange={handleChange} className='p-4 rounded-full bg-[#263140] text-[#929292] w-full px-7'>
                    <option value="mumbai" className="py-4 text-[#929292]">Mumbai</option>
                    <option value="ethereum" className="py-4 text-[#929292]">Ethereum</option>
                    
                </select>

                <h5 className="text-[#929292] my-4">Balance: {balance}</h5>

                <h5 className="text-white">Receiver Address</h5>
                <div className="flex">
                    <input type="text" value={receiver} onChange={handleReceiverInput} placeholder="Paste receiver address" className="text-[#929292] bg-[#263140] rounded-full w-full p-4 my-3 text-[16px] w-[70%] " />

                    <input type="text" value={amount} onChange={handleAmountInput} placeholder="Amount" className="text-[#929292] bg-[#263140] rounded-full w-full p-4 m-3 text-[16px] w-[30%] text-center" />
                </div>

                <button onClick={send} type="submit" value="Transfer" className="text-white bg-[#17987F] text-center rounded-full w-full p-4 my-3 text-[16px] hover:bg-gray-200 cursor-pointer" />
              
            </section>
}

NativeTransfer.defaultProps = {
    balance: '1.296 rETH'
}

export default NativeTransfer