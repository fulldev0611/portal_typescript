import React, { useState, useEffect } from 'react';
import '../../../styles/styles.css';
import '../../../styles/custom.css';
import axios from "axios";
import { apiClient } from "middleware/apiClient";
import { BILLING } from "config/endpoints";


const paymentDataFormat = {
    "payments": [
      {
        "issuedDate": "",
        "amount": "",
        "currency": "",
        "method": ""
      }
      
    ]
};

const  tableHeaderData = [
    ['Date', 'Amount', 'Currency', 'Method'] 
];

const api = apiClient();


export const Billing = (): JSX.Element => {
    const [payment_history, setPaymentHistory] = useState(paymentDataFormat.payments); // Setting test value for paymentHistory
    const [result_state, setResultState] = useState(false);// no result check state


    // Get Payment History API consume
    const getPaymentHistory = () => {
        api.get(BILLING.GET_PAYMENT_HISTORY)
            .then((res)=> {                
                setPaymentHistory(res.data.payments);
                setResultState(true);
                
                                
            })
            .catch((error) => {
                
                setResultState(false);

            });
   }

   React.useEffect(getPaymentHistory, []);

      
    return (
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <div className = "shadow sm:rounded-md sm:overflow-hidden">
                <div className = "bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div className = "billing-title text-2xl font-sans text-2xl text-gray-900">
                        Billing & Payment History
                    </div>
                    <div className = "billing-table font-sans">
                        <table className='billing-header'>
                            {tableHeaderData && tableHeaderData.map(row => {

                                return (
                                <tr>
                                    {row.map(col => {
                                        return(
                                        <td>{col}</td>
                                        )
                                    })
                                    }
                                </tr>
                                )
                            })}

                        </table>
                        <table className = "billing-main">
                            {result_state && payment_history && payment_history.map(row => {

                                return (
                                <tr>
                                    <td>{row.issuedDate.substr(0,10)}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.currency}</td>
                                    <td>{row.method}</td>
                                </tr>
                                )
                            })}                           

                        </table>
                        {!result_state && <div className = "billing-no-message">No payment to display</div> }
                        

                    </div>
                </div>

            </div>
        </div>
    );
};
export default Billing;
