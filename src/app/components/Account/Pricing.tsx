import React, { useState, useEffect } from 'react';
import checkboximg from '../../../assets/checkbox.svg';
import hintimg from '../../../assets/Hint.png';
import '../../../styles/styles.css';
import '../../../styles/custom.css';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import axios from "axios";

import { apiClient } from "middleware/apiClient";
import { BILLING } from "config/endpoints";
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';



const api = apiClient();



const initTopTableData = [
  ['', 'Enthusiast', 'Solo', 'Expert', 'Team'], 
  ['Monthly Price', '$0', 'Coming Soon', 'Coming Soon', 'Coming Soon']
];

const tableData = {
  individualWorkspaces : [
    {
      subTitle : 'Availability',
      enthusiast : true,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'A max number of hours (per month) the workspace can be used'
    },
    {
      subTitle : 'Fully Configured',
      enthusiast : true,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'Each workspace is bundled with properly configured tools.'
    },
    {
      subTitle : 'Task Repository',
      enthusiast : true,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'Our platform includes a reach repository of tasks that are supportoed by both our company and our community of users and that can be used by you to automate different activitisies typical for your rolw.'
    },
    {
      subTitle : 'Task Development',
      enthusiast : true,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'In addition to the task reposity, you can also develop tasks by yourself using our task development environment included in each workspace.'
    },
    {
      subTitle : 'Private Repository',
      enthusiast : false,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'You can host your documents and/or code in a fully managed git repository.'
    },
    {
      subTitle : 'Integration',
      enthusiast : false,
      solo : false,
      expert : true,
      team : true,
      tooltipText:'If your workflow uses third party tools, you can leverage our repository of integration connectors/modules to seamlessly use such tools.'
    }
  ],
  automateWorkflows : [
    {
      subTitle : 'Tools Workspaces',
      enthusiast : false,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'Some workflows require rather dedicated compute resources for which we offer a repository of Tools Workspaces from which you can select a proper tools workspaces and use to automate your workflows.'
    },
    {
      subTitle : 'Task Templates',
      enthusiast : false,
      solo : true,
      expert : true,
      team : true,
      tooltipText:'Certain activities involve creation of different artifacts (e.g. code snippets) and are similar and repetitive across multiple projects. To automate such activities you can use our repository of special kind of tasks that use configurable templates to generate such artifacts for you.'
    },
    {
      subTitle : 'Workflow Pipelines',
      enthusiast : false,
      solo : false,
      expert : true,
      team : true,
      tooltipText:'Workflow Pipelines allow an implementation of complex workflows that require the use of multiple workspaces/tools and/or have sophisticated business logic.'
    },
    {
      subTitle : 'Premium Task Repo',
      enthusiast : false,
      solo : false,
      expert : true,
      team : true,
      tooltipText:'With certain premium plans you get access to even greater number of various task in our repositories to help you become even more productive'
    }
  ],
  teamEnv : [
    {
      subTitle : 'Team Workflows',
      enthusiast : false,
      solo : false,
      expert : false,
      team : true,
      tooltipText:'The Team Workflows can help improve productivity of you team by automating workstreams that involve multiple roles.'
    },
    {
      subTitle : 'Multiple Environments',
      enthusiast : false,
      solo : false,
      expert : false,
      team : true,
      tooltipText:'Multiple Environments allow your team to run similar workflows in different environments. Examples might include projects for different clients or software development (from dev through qa, staging, to pre-prod, production).'
    }
  ]
};

const bottomTableData = {
  subtitle : 'Coming Soon: BYCR (Bring your own compute resource)',
  content : [
    "The BYCR feature will allow you to use your own hardware (computer, Raspberry Pi) for your workspace and/or to rent it out",
    "(for a fee!)",
    "to us to host workspaces/workflows of other users."
  ]
}

const defaultBtnColor = 'bg-indigo-500';
const disabledBtn = ['bg-gray-400', 'cursor-not-allowed'];

const paramsInit = {price_id : 'price_1LIhd5KUSkDFrC1ELEjrr4dD'};

const defaultBtnStyle = 'sign-btn bg-indigo-500' ;
const disabledBtnStyle = 'sign-btn bg-gray-400 cursor-not-allowed' ;



export const Pricing = () => {

  const [solo, setSolo] = useState('');
  const [expert, setExpert] = useState('');
  const [team, setTeam] = useState('');
  const [bycr, setBYCR] = useState('');

  const [current_plan, setCurrentPlan] = useState('');
  const [current_plan_price, setCurrentPlanPrice] = useState('');
  const [current_plan_id, setCurrentPlanId] = useState();

  const [new_plan, setNewPlan] = useState('');
  const [new_plan_price, setNewPlanPrice] = useState('');
  const [signup_state,setSignupState] = useState(false);

  const [topTableData,setTopTableData] = useState(initTopTableData);
  const [priceId, setPriceId] = useState(['']);
  const [params, setParams] = useState(paramsInit);

  //Checkout Result part
  const [checkout_message,setCheckoutMessage] = useState("");
  const [checkout_result_dialog, setCheckoutResultDialog] = useState(false);


  // Button Text 

  const [button_text_free, setButtonTextFree] = useState('SIGN UP');
  const [button_text_solo, setButtonTextSolo] = useState('SIGN UP');
  const [button_text_expert, setButtonTextExpert] = useState('Notify Me');
  const [button_text_team, setButtonTextTeam] = useState('Notify Me');

  const [button_style_free, setButtonStyleFree] = useState(defaultBtnStyle);
  const [button_style_sole, setButtonStyleSolo] = useState(defaultBtnStyle);
  const [button_style_expert, setButtonStyleExpert] = useState(defaultBtnStyle);
  const [button_style_team, setButtonStyleTeam] = useState(defaultBtnStyle);

  const[freeDisable , setFreeDisable] = useState(false);
  const[soloDisable , setSoloDisable] = useState(false);
  const[expertDisable , setExpertDisable] = useState(false);
  const[teamDisable , setTeamDisable] = useState(false);




  const [freePlan, setFreePlan] = useState(false); 
  const [soloPlan, setSoloPlan] = useState(false); 
  const [expertPlan, setExpertPlan] = useState(false); 
  const [teamPlan, setTeamPlan] = useState(false); 

  const makeCurrentButton = (plan:String) => {
    if(plan == "Enthusiast") {
     setButtonTextFree('Current');
     setButtonTextSolo('SIGN UP');
     setButtonTextExpert('Notify Me');
     setButtonTextTeam('Notify Me');
    
     setButtonStyleFree(disabledBtnStyle);
     setButtonStyleSolo(defaultBtnStyle);
     setButtonStyleExpert(defaultBtnStyle);
     setButtonStyleTeam(defaultBtnStyle);
    
      setFreeDisable(true);
      setSoloDisable(false);
      setExpertDisable(false);
      setTeamDisable(false);
        
    }
    if(plan == "Solo") {
      setButtonTextFree('SiGN UP');
      setButtonTextSolo('Current');
      setButtonTextExpert('Notify Me');
      setButtonTextTeam('Notify Me');
    
      setButtonStyleFree(defaultBtnStyle);
      setButtonStyleSolo(disabledBtnStyle);
      setButtonStyleExpert(defaultBtnStyle);
      setButtonStyleTeam(defaultBtnStyle);
    
      setFreeDisable(false);
      setSoloDisable(true);
      setExpertDisable(false);
      setTeamDisable(false);
    }
    if(plan == "Expert") {
      setButtonTextFree('SIGN UP');
      setButtonTextSolo('SIGN UP');
      setButtonTextExpert('Notify Me');
      setButtonTextTeam('Notify Me');
    
     setButtonStyleFree(defaultBtnStyle);
     setButtonStyleSolo(defaultBtnStyle);
     setButtonStyleExpert(disabledBtnStyle);
     setButtonStyleTeam(defaultBtnStyle);
    
      setFreeDisable(false);
      setSoloDisable(false);
      setExpertDisable(true);
      setTeamDisable(false);
    }
    if(plan == "Team") {
      setButtonTextFree('SIGN UP');
      setButtonTextSolo('SIGN UP');
      setButtonTextExpert('Notify Me');
      setButtonTextTeam('Notify Me');
    
      setButtonStyleFree(defaultBtnStyle);
      setButtonStyleSolo(defaultBtnStyle);
      setButtonStyleExpert(defaultBtnStyle);
      setButtonStyleTeam(disabledBtnStyle);
    
      setFreeDisable(false);
      setSoloDisable(false);
      setExpertDisable(false);
      setTeamDisable(true);
    }
  }
  
  
  const getPlans = ()  => {
    api.get(BILLING.GET_PLANS)
       .then((res) => {
           
            let plans_data = res.data.plans;
            plans_data.sort((a, b) => (a.Id > b.Id) ? 1 : -1);
            let firstRow = [''];
            let secondRow = ['Monthly Price'];
            let topData :any[][] = [[],[]];
            let priceId : any[] = [] ;

            plans_data.map((plans) => firstRow.push(plans.Name));
            plans_data.map((plans) => secondRow.push('$'+ plans.Price));
            plans_data.map((plans) => priceId.push(plans.PriceId));

            topData[0] = firstRow;
            topData[1] = secondRow;
            setTopTableData(topData);  
            setPriceId(priceId);    
            console.log(plans_data);      

          })
        .catch((error) => {
          console.log(error);

        })
  }



  //Get Switch Plan
  const getSwitchPlan = () => {
    let url = BILLING.GET_PAYMENT_CHECKOUT + '?price_id=' + params.price_id;
    api.get(url)
         .then((res)=> {
            console.log(res.data.message);
          //   if(res.status == 208) {
          //     setCheckoutMessage ("The user is already subscribed to this plan.");
          //     setCheckoutResultDialog(true);
          //     setDialogVisibility(false);
          //   } 
            
          //  else {

              setDialogVisibility(false);
              if (freePlan) {
                setCheckoutResultDialog(true);
                setCheckoutMessage ("Thank you for your subscription!");
                makeCurrentButton('Enthusiast');
                setCurrentPlan("Enthusiast");
                setCurrentPlanPrice('$0/month');
              
              } else {
                window.location.href = res.data.message;
              }
          // }
            
            

         })
         .catch((error) => {
            console.log(error);
         });
  }


  // Get current plans API consume
  const getCurrentPlan = () => {
    api.get(BILLING.GET_CURRENT)
         .then((res)=> {
            setCurrentPlan(res.data.name);
            let currentPrice ;
            if(res.data.id == 1) {
              currentPrice = '$0/month';
            } else {
              currentPrice = '$'+ res.data.price + '/month';        
            }

            setCurrentPlanPrice(currentPrice);
            setCurrentPlanId(res.data.id);
            makeCurrentButton(res.data.name);
            console.log(res.status);
         })
         .catch((error) => {
             
            //  if(error.response.status == 404){
            //   setCheckoutMessage (error.response.data.message);
            //   setCheckoutResultDialog(true);
                          
            //  }

             
             
          });
  }

  React.useEffect(getPlans, []);
  React.useEffect(getCurrentPlan, []);

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    
    if (query.get("checkoutResult") == 'success') {
      setCheckoutMessage ("Thank you for your subscription!");
      setCheckoutResultDialog(true);
    }

    if (query.get("checkoutResult") == 'failure') {
      setCheckoutMessage ("Sorry, something went wrong. Please try again later or contact us!");
      setCheckoutResultDialog(true);
    }
  }, []);

  


  type tDisplayMapping = {
    [key: number]: any
  }

  const displayMapping : tDisplayMapping = [
    {
      200: displaySuccessSolo,
      400: displayFailureSolo,
      500: displayDuplicateSolo,
    },
    {
      200: displaySuccessExpert,
      400: displayFailureExpert,
      500: displayDuplicateExpert,
    },
    {
      200: displaySuccessTeam,
      400: displayFailureTeam,
      500: displayDuplicateTeam,
    },
    {
      200: displaySuccessBycr,
      400: displayFailureBycr,
      500: displayDuplicateBycr,
    }
  ];

  const [currentSolo, setCurrentSolo] = useState('');
  const [currentExpert, setCurrentExpert] = useState('');
  const [currentTeam, setCurrentTeam] = useState('');
  const [currentBycr, setCurrentBycr] = useState('');

  function displaySuccessSolo() {
    setCurrentSolo('success');
    let alert = document.getElementById('alertsolo') as HTMLDivElement | null;
    if ( alert ) {
      alert.getElementsByClassName('successText')[0].classList.remove('hidden');
    }
  };

  function displayFailureSolo() {
    setCurrentSolo('failure');
    let alertsolo = document.getElementById('alertsolo') as HTMLDivElement | null;
    if ( alertsolo ) {
      alertsolo.getElementsByClassName('errorText')[0].classList.remove('hidden');
    }
  };

  function displayDuplicateSolo() {
    setCurrentSolo('duplicate');
    let alertsolo = document.getElementById('alertsolo') as HTMLDivElement | null;
    if ( alertsolo ) {
      alertsolo.getElementsByClassName('duplicateText')[0].classList.remove('hidden');
    }
  };

  function displaySuccessExpert() {
    setCurrentExpert('success');
    let alertexpert = document.getElementById('alertexpert') as HTMLDivElement | null;
    if ( alertexpert ) {
      alertexpert.getElementsByClassName('successText')[0].classList.remove('hidden');
    }
  };

  function displayFailureExpert() {
    setCurrentExpert('failure');
    let alertexpert = document.getElementById('alertexpert') as HTMLDivElement | null;
    if ( alertexpert ) {
      alertexpert.getElementsByClassName('errorText')[0].classList.remove('hidden');
    }
  };

  function displayDuplicateExpert() {
    setCurrentExpert('duplicate');
    let alertexpert = document.getElementById('alertexpert') as HTMLDivElement | null;
    if ( alertexpert ) {
      alertexpert.getElementsByClassName('duplicateText')[0].classList.remove('hidden');
    }
  };

  function displaySuccessTeam() {
    setCurrentTeam('success');
    let alertteam = document.getElementById('alertteam') as HTMLDivElement | null;
    if ( alertteam ) {
      alertteam.getElementsByClassName('successText')[0].classList.remove('hidden');
    }
  };

  function displayFailureTeam() {
    setCurrentTeam('failure');
    let alertteam = document.getElementById('alertteam') as HTMLDivElement | null;
    if ( alertteam ) {
      alertteam.getElementsByClassName('errorText')[0].classList.remove('hidden');
    }
  };
  
  function displayDuplicateTeam() {
    setCurrentTeam('duplicate');
    let alertteam = document.getElementById('alertteam') as HTMLDivElement | null;
    if ( alertteam ) {
      alertteam.getElementsByClassName('duplicateText')[0].classList.remove('hidden');
    }
  };

  function displaySuccessBycr() {
    setCurrentBycr('success');
    let alertbycr = document.getElementById('alertbycr') as HTMLDivElement | null;
    if ( alertbycr ) {
      alertbycr.getElementsByClassName('successText')[0].classList.remove('hidden');
    }
  };

  function displayFailureBycr() {
    setCurrentBycr('failure');
    let alertbycr = document.getElementById('alertbycr') as HTMLDivElement | null;
    if ( alertbycr ) {
      alertbycr.getElementsByClassName('errorText')[0].classList.remove('hidden');
    }
  };

  function displayDuplicateBycr() {
    setCurrentBycr('duplicate');
    let alertbycr = document.getElementById('alertbycr') as HTMLDivElement | null;
    if ( alertbycr ) {
      alertbycr.getElementsByClassName('duplicateText')[0].classList.remove('hidden');
    }
  };

  function refreshStatus(id: string, current: string) {
    if (!current) return;
    let alertDiv = document.getElementById(id) as HTMLDivElement | null;
    if (current === 'success' && alertDiv ) {
      alertDiv.getElementsByClassName('successText')[0].classList.add('hidden');
    } else if (current === 'failure' && alertDiv ) {
      alertDiv.getElementsByClassName('errorText')[0].classList.add('hidden');
    } else {
      if ( alertDiv ) {
        alertDiv.getElementsByClassName('duplicateText')[0].classList.add('hidden');
      }
    }
  };

  function handleSignup(plan) {
    if(plan == 'free') {
      // if(current_plan_id == 0) {
      //   let sign = document.getElementById('sign') as HTMLButtonElement | null;
      //   if ( sign ) {
      //     sign.disabled = true;
      //     // sign.setAttribute("disabled","disabled");
      //     sign.innerHTML = 'Current'
      //     sign.classList.remove(defaultBtnColor);
      //     sign.classList.add(...disabledBtn);
      //   }
      // }
      
      setNewPlan('Enthusiast');
      setNewPlanPrice('$0/month');
      setSignupState(true); 

      let param = {price_id : ''};
      param.price_id = priceId[0];
      
      setParams(param);

      setFreePlan(true);
      setSoloPlan(false);
      setExpertPlan(false);
      setTeamPlan(false);
      handleClick();


    } else if(plan == "solo") {
      
      setNewPlan('Solo');
      setNewPlanPrice('$30/month');
      setSignupState(true);
      let param = {price_id : ''};
      param.price_id = priceId[1];
      console.log(param);
      
      setParams(param);

      setFreePlan(false);
      setSoloPlan(true);
      setExpertPlan(false);
      setTeamPlan(false);

      handleClick();
    }
    else if(plan == "expert") {
      setNewPlan('Expert');
      setNewPlanPrice('$30/month');
      setSignupState(true);

      let param = {price_id : ''};
      param.price_id = priceId[2];
      console.log(param);
      
      setParams(param);
      
      setFreePlan(false);
      setSoloPlan(false);
      setExpertPlan(true);
      setTeamPlan(false);

      handleClick();
    }
    else if(plan == "team") {
      setNewPlan('Team');
      setNewPlanPrice('$100/month');
      setSignupState(true);
      let param = {price_id : ''};
      param.price_id = priceId[3];
      console.log(param);      
      setParams(param);

      setFreePlan(false);
      setSoloPlan(false);
      setExpertPlan(false);
      setTeamPlan(true);

      handleClick();
    }
  } 

  async function addEmail(email: string, plan: string) {
    try {
      const response = await fetch('https://accountsvc.dev.workspacenow.cloud/api/emailNotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, plan })
      });
      return response;
    } catch (e) {
      return;
    }
  };

  function handleNotify(plan: string) {
    let btn = document.getElementById(plan) as HTMLButtonElement | null;
    if ( btn ) {
      if ( btn.disabled ) {
        return;
      }
      btn.disabled = true;
      btn.classList.remove(defaultBtnColor);
      btn.classList.add(...disabledBtn);
    }

    let emailInput = document.getElementById('email' + plan) as HTMLInputElement | null;
    let email = '';

    if ( emailInput ) 
      email = emailInput.value

    if ( !email ) {
      //displayOther();
      if (btn) {
        btn.classList.remove(...disabledBtn);
        btn.classList.add(defaultBtnColor);
        btn.disabled = false;       
      }
      return;
    }

    addEmail(email, 'plan_' + plan)
    .then( data => {
      console.log(data)
      if (plan == 'solo') {
        refreshStatus('alert' + plan, currentSolo);
        if ( data ) {
          displayMapping[0][data.status]();
        }
      }
      else if (plan == 'expert') {
        refreshStatus('alert' + plan, currentExpert);
        if ( data ) {
          displayMapping[1][data.status]();
        }
      } 
      else if (plan == 'team') {
        refreshStatus('alert' + plan, currentTeam);
        if ( data ) {
          displayMapping[2][data.status as any]();
        }
      }
      else {
        refreshStatus('alert' + plan, currentBycr);
        if ( data ) {
          displayMapping[3][data.status as any]();
        }
      }
      
      if ( btn ) {
        btn.classList.remove(...disabledBtn);
        btn.classList.add(defaultBtnColor);
        btn.disabled = false;
      }
    })
  }

  // Dialog Modal Part
  const [visibility, setDialogVisibility] = useState(false);
  
  const buttons: any = [
    {
      buttonModel: {
        content: 'Cancel',
        cssClass: 'cancel-btn',
       
      },
      click: () => {
        setDialogVisibility(false);
      },
    },
    {
      buttonModel: {
        content: 'Switch',
        cssClass: 'switch-btn',
        isPrimary: true,
      },
      click: () => {
        getSwitchPlan();
      },
    },
  ];

  function handleClick() {
    setDialogVisibility(true);
  }

  function dialogClose() {
    setDialogVisibility(false);
    setSignupState(false);
  }
  // Dialog Modal end 

  //Checkout Result Dialog Action

  const checkout_diag_buttons: any = [
    
    {
      buttonModel: {
        content: 'OK',
        cssClass: 'switch-btn',
       
      },
      click: () => {
        setCheckoutResultDialog(false);
      },
    }
   
  ];
  //

  return (
    <div className="relative max-w-7xl mx-auto flex items-center justify-between px-0 sm:px-6 lg:col-span-9">
      <div className="pricing font-sans">
          <div className='content-container'>
            <table className='main-table'>
              <tbody>
              {topTableData && topTableData.map(row => {

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
              </tbody>
            </table>
            <table>
             <tbody>
              <tr>
                <td className='subtable-title'>Individual Workspaces</td>
              </tr>
             </tbody>
            </table>
            <table>
             <tbody>
              {tableData.individualWorkspaces && tableData.individualWorkspaces.map(row => {
                  return (
                    <tr>
                      <td style={{textAlign:"start"}}>{ row.subTitle ? row.subTitle : <></> }
                        <div className='tooltip'> <img src={hintimg} width="18" alt=""/>
                          <span className='tooltiptext tooltip-bottom'>{row.tooltipText}</span>
                        </div>
                      </td>
                      <td style={{textAlign:"start"}}>{ row.enthusiast ? <div style={{color: "black", fontSize:"0.8rem", display: "flex", alignItems: "center"}}><img src={checkboximg} style={{width: "1.2rem"}} />&nbsp;{row.subTitle == 'Availability' ? 'up to 40 hours' : ''}</div> : <></> }</td>
                      <td>{ row.solo ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.expert ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.team ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                    </tr>
                  )
                })
              }
             </tbody>
            </table>
            <table>
             <tbody>
              <tr>
                <td className='subtable-title'>Automate Your Workflows</td>
              </tr>
             </tbody>
            </table>
            <table>
             <tbody>
              {tableData.automateWorkflows && tableData.automateWorkflows.map(row => {
                  return (
                    <tr>
                      <td style={{textAlign:"start"}}>{ row.subTitle ? row.subTitle : <></> }
                        <div className='tooltip'> <img src={hintimg} width="18" alt=""/>
                          <span className='tooltiptext tooltip-bottom'>{row.tooltipText}</span>
                        </div>
                      </td>
                      <td>{ row.enthusiast ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.solo ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.expert ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.team ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                    </tr>
                  )
                })
              }
             </tbody>
            </table>
            <table>
             <tbody>
              <tr>
                <td className='subtable-title'>Team Environments</td>
              </tr>
             </tbody>
            </table>
            <table style={{borderBottom: "7px solid #4F46E5"}}>
             <tbody>
              {tableData.teamEnv && tableData.teamEnv.map(row => {
                  return (
                    <tr>
                      <td style={{textAlign:"start"}}>{ row.subTitle ? row.subTitle : <></> }
                        <div className='tooltip'> <img src={hintimg} width="18" alt=""/>
                          <span className='tooltiptext tooltip-bottom'>{row.tooltipText}</span>
                        </div>
                      </td>
                      <td>{ row.enthusiast ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.solo ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.expert ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                      <td>{ row.team ? <div className='checkbox-align'><img src={checkboximg} /></div> : <></> }</td>
                    </tr>
                  )
                })
              }
             </tbody>
            </table>
            <table style={{borderBottom: "16px solid #4F46E5"}}>
             <tbody>
              <tr>
                <td></td>
                <td>
                    <input type='email' name='email' placeholder='Enter email' className='emailInput' style={{visibility: 'hidden'}} />
                    <button id='sign' className={button_style_free} onClick={() => handleSignup('free')} disabled = {freeDisable} >{button_text_free}</button>
                  
                </td>
                <td>
                  <input id='emailsolo' className='emailInput' type='email' name='email' placeholder='Enter email' value={solo} onChange={(e) => setSolo(e.target.value)} />
                  <button id='solo' className={button_style_sole}   onClick={() => handleSignup('solo')} disabled = {soloDisable}>{button_text_solo}</button>
                  <div id="alertsolo" style={{fontSize: "0.8rem"}}>
                    <p id="successText" className="successText hidden">Email added successfully</p>
                    <p id="errorText" className="errorText hidden">Failed</p>
                    <p id="duplicateText" className="duplicateText hidden">Email already on notification list</p>
                  </div>
                </td>
                <td>
                  <input id='emailexpert' className='emailInput' type='email' name='email' placeholder='Enter email' value={expert} onChange={(e) => setExpert(e.target.value)} />
                  <button id='expert' className={button_style_expert} onClick={() => handleNotify('expert')} >{button_text_expert}</button>
                  <div id="alertexpert" style={{fontSize: "0.8rem"}}>
                    <p id="successText" className="successText hidden">Email added successfully</p>
                    <p id="errorText" className="errorText hidden">Failed</p>
                    <p id="duplicateText" className="duplicateText hidden">Email already on notification list</p>
                  </div>
                </td>
                <td>
                  <input id='emailteam' className='emailInput' type='email' name='email' placeholder='Enter email' value={team} onChange={(e) => setTeam(e.target.value)} />
                  <button id='team' className={button_style_team} onClick={() => handleNotify('team')} >{button_text_team}</button>
                  <div id="alertteam" style={{fontSize: "0.8rem"}}>
                    <p id="successText" className="successText hidden">Email added successfully</p>
                    <p id="errorText" className="errorText hidden">Failed</p>
                    <p id="duplicateText" className="duplicateText hidden">Email already on notification list</p>
                  </div>
                </td>
              </tr>
             </tbody>
            </table>
            <table>
             <tbody>
              <tr>
                <td className='subtable-title'>{ bottomTableData.subtitle }</td>
              </tr>
             </tbody>
            </table>
            <table style={{border:"4px solid #BFBFBF", marginBottom: '10px'}}>
             <tbody>
              <tr>
                <td className='long-content' style={{width:"80%"}}>
                  { [ bottomTableData.content[0], <span className='strong'>&nbsp;{bottomTableData.content[1]}&nbsp;</span>, bottomTableData.content[2] ] }
                </td>
                <td>
                  <input id='emailbycr' type='email' name='email' placeholder='Enter email' className='emailInput' value={bycr} onChange={(e) => setBYCR(e.target.value)}/>
                  <button id='bycr' className='notify-btn bg-indigo-500' onClick={() => handleNotify('bycr')}>Notify Me</button>
                  <div id="alertbycr" style={{fontSize: "0.8rem"}}>
                    <p id="successText" className="successText hidden">Email added successfully</p>
                    <p id="errorText" className="errorText hidden">Failed</p>
                    <p id="duplicateText" className="duplicateText hidden">Email already on notification list</p>
                  </div>
                </td>
              </tr>
             </tbody>
            </table>
          </div>
          <div className="App" id="dialog-target">
            
            <DialogComponent
              width="500px"
              target="#dialog-target"
              visible={visibility}
              close={dialogClose}
              header="Switch to Plan"
              allowDragging={true}
              showCloseIcon={true}
              buttons={buttons}>
                <table className='tb_class' >
                 <tbody>
                  <tr>
                    <td>

                    </td>
                    <td>
                      Name
                    </td>
                    <td>
                      Fee
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Current Plan:
                    </td>
                    <td>
                      {current_plan} 
                    </td>
                    <td>
                      {current_plan_price}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      New Plan:
                    </td>
                    <td>
                      {new_plan}
                    </td>
                    <td>
                      {new_plan_price}
                    </td>
                  </tr>
                 </tbody>
                </table> 
            </DialogComponent>
          </div>
          <div className="checkout-diag" id="checkout-result">
            <DialogComponent
                width="500px"
                target="#checkout-result"
                visible={checkout_result_dialog}
                close={dialogClose}
                
                allowDragging={true}
                showCloseIcon={false}
                buttons={checkout_diag_buttons}>
                  <div className='checkout-message'>
                    {checkout_message}
                  </div>
            </DialogComponent>      

          </div>
      </div>
      
    </div>
  )
}

export default Pricing;
