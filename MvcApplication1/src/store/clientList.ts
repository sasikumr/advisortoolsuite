
import { Action, Reducer } from 'redux';
export interface ProspectState {
    ProspectDetail: Prospect;
}

export interface Prospect {
    firstName?: string;
    lastName?: string;
    ssn?: string;
    title?: string;
    middleInitial?: string;
    dateOfBirth?: Date;
    gender?: string;
    usCitizen?: string;
    maritalStatus?: string;
    homeAddressLine1?: string;
    homeAddressLine2?: string;
    homeAddressLine3?: string;
    homeAddressCity?: string;
    homeAddressState?: string;
    homeAddressZipCode?: string;
    mailingAddressLine1?: string;
    mailingAddressLine2?: string;
    mailingAddressLine3?: string;
    mailingAddressCity?: string;
    mailingAddressState?: string;
    mailingAddressZipCode?: string;
    homePhone?: string;
    workPhone?: string;
    otherPhone?: string;
    referral?: boolean;
    emailAddress?: string;
    previousFunds?: string;
    FINRA?: string;
    investmentObjective?: string;
    riskProfile?: string;
    annualHouseholdIncomeRange?: string;
    netWorthRange?: string;
    lifeInsuranceRange?: string;
    taxBracket?: string;
    dependentsNo?: string;
    ages?: string;
    currentEmployer?: string;
    employmentStatus?: string;
    occupation?: string;
    employerAddress?: string;
    employerCity?: string;
    employerState?: string;
    employerZipCode?: string;
    employerSalary?: string;
    hireDate?: Date;
    expectedAnnuityDate?: Date;
    incomeAccountSalary?: string;
    socialSecurity?: string;
    pensionBenefits?: string;
    investmentIncome?: string;
    rmd?: string;
    other?: string;
    expensesAmount?: string;
}

export interface IState {
    Code: string;
}
interface FetchProspectRequest { type: 'GET_PROSPECT_REQUEST', id: string }
interface FetchProspectSuccess { type: 'GET_PROSPECT', prospect:any }
interface FetchProspectFailed { type: 'GET_PROSPECT_FAILED' }
interface UpdateProspectRequest { type: 'UPDATE_PROSPECT_REQUEST' }
interface OnInputChange { type: 'ON_INPUT_CHANGE' , name:string, value:string}

type KnownAction = FetchProspectSuccess | FetchProspectFailed | OnInputChange;

export const actionCreators = {
    fetchProspectRequest: (id: string) => <FetchProspectRequest>{ type: 'GET_PROSPECT_REQUEST', id },
    fetchProspectSuccess: (prospect:any) => <FetchProspectSuccess>{ type: 'GET_PROSPECT', prospect },
    fetchProspectFailed: () => <FetchProspectFailed>{ type: 'GET_PROSPECT_FAILED' },
    onInputChange: (name, value) => <OnInputChange>{ type: 'ON_INPUT_CHANGE', name, value },
    updateProspectRequest: () => <UpdateProspectRequest>{ type: 'UPDATE_PROSPECT_REQUEST' }
};


export const reducer: Reducer<ProspectState> = (state: ProspectState, action: KnownAction) => {
    switch (action.type) {
        case "ON_INPUT_CHANGE":
            return Object.assign({}, state, { [action.name]: action.value });
        case"GET_PROSPECT":
            return Object.assign({}, action.prospect);
        case "GET_PROSPECT_FAILED":
            return Object.assign({}, null, null);
       
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state === undefined ? {} : state;
};


export interface AgentCodeState {
    agentCode: string;
};

interface AgentCode { type: 'SET_AGENTCODE', agentCode }

export const actionCreatorsAgentCode = {
    setAgentCode: (agentCode: string) => <AgentCode>{ type: 'SET_AGENTCODE', agentCode }

};

type KnownActionAgentCode = AgentCode

export const agentCodereducer: Reducer<AgentCodeState> = (state: AgentCodeState, action: KnownActionAgentCode) => {
    switch (action.type) {
        case "SET_AGENTCODE":
            return action.agentCode;
        default:
            return state === undefined ? "" : state;
    }
};
