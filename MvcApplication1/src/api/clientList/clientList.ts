//import * as ProspectAction from '../../actions/ProspectAction';
//import ApiUrl from '../apiUrl.dev';
import fetch from 'isomorphic-fetch';
//import { agileneturl } from '../../constants/index';
//import * as ValidationMessage from '../../actions/ValidationMessageAction';
//import * as ActionTypes from '../../constants/ActionTypes';
//import * as LoaderAction from '../../store/Loader';
//import * as ValidationMessageAction from '../../store/validationMessage';
//import * as ProspectAction from '../../store/Prospect';
//import * as StateAction from '../../store/States';

//import errorhandler from 'errorhandler';
//import connect from 'connect';
interface Prospect{
FirstName:string;
LastName:string;
Ssn:string;
Id:number;

}
const advisorUrl = "";
const participantUrl = "https://dev.valic.com/services/participant/api/";

export const ClientListMiddleWare = (store:any) => (next:any) => (action:any) => {
    switch (action.type) {
        case 'FETCH_CLIENTLIST_REQUEST':
            //next(ProspectAction.loaderBegin());
            //next(LoaderAction.actionCreators.loaderBegin());
            return fetch(`${participantUrl}client/search/`, {
                method: 'GET'
            })
                .then((response:any) => response.json())
                .then(data => {
                    //console.log(data);
                    let prospect = {} as any;
                    if (data !== undefined && data !== null) {
                        prospect.firstName = data.FirstName;
                        prospect.lastName = data.LastName;
                        prospect.ssn = data.Ssn;
                        prospect.isNew = true;
                        prospect.clientProspectId = data.Id;
                        if (data.Id > 0) {
                            prospect.isNew = false;
                        }
                        else {
                            prospect.isNew = true;
                        }
                        let homeAddressStreet1, homeAddressStreet2, homeAddressStreet3, homeAddressZipCode, homeAddressState, homeAddressCity;
                        let mailingAddressStreet1, mailingAddressStreet2, mailingAddressStreet3, mailingAddressZipCode, mailingAddressState, mailingAddressCity;
                        if (data.Addresses !== undefined && data.Addresses !== null) {
                            data.Addresses["$values"].forEach(function (address:any) {
                                //data.Addresses.forEach(function (address) {
                                if (address.AddressType === 0) {
                                    homeAddressStreet1 = address.Street1;
                                    homeAddressStreet2 = address.Street2;
                                    homeAddressStreet3 = address.Street3;
                                    homeAddressState = address.State;
                                    homeAddressCity = address.City;
                                    //homeAddressCountry = address.Country;
                                    homeAddressZipCode = address.Zip;
                                }
                                else if (address.AddressType === 2) {
                                    mailingAddressStreet1 = address.Street1;
                                    mailingAddressStreet2 = address.Street2;
                                    mailingAddressStreet3 = address.Street3;
                                    mailingAddressState = address.State;
                                    mailingAddressCity = address.City;
                                    //mailingAddressCountry = address.Country;
                                    mailingAddressZipCode = address.Zip;
                                }
                            });
                        }


                        let homePhoneNumber; let workPhoneNumber; let otherPhoneNumber;
                        if (data.PhoneNumbers !== null && data.PhoneNumbers !== undefined) {
                            data.PhoneNumbers["$values"].forEach(function (phone:any) {
                                //data.PhoneNumbers.forEach((phone) => {
                                if (phone.PhoneType === 0) {
                                    homePhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 1) {
                                    workPhoneNumber = phone.Number;
                                }
                                else if (phone.PhoneType === 5) {
                                    otherPhoneNumber = phone.Number;
                                }

                            });
                        }

                        let isReferral = false;
                        if (data.ReferralDate !== null && data.ReferralDate !== undefined && new Date(data.ReferralDate.toString()).getFullYear() > 1900) {
                            isReferral = true;
                        }
                        prospect.title = data.Title;
                        prospect.middleInitial = data.MiddleInitial !== null ? data.MiddleInitial : '';
                        prospect.dateOfBirth = data.DateOfBirth !== null && data.DateOfBirth !== undefined ? new Date(data.DateOfBirth.toString()).toISOString().substr(0, 10) : '';
                        prospect.gender = data.Gender !== null && data.Gender !== undefined ? data.Gender.toString() : '';
                        prospect.usCitizen = data.UsCitizenFlag !== null && data.UsCitizenFlag !== undefined ? data.UsCitizenFlag.toString() : '';
                        prospect.maritalStatus = data.MaritalStatus !== null && data.MaritalStatus !== undefined ? data.MaritalStatus.toString() : '';
                        prospect.homeAddressLine1 = homeAddressStreet1;
                        prospect.homeAddressLine2 = homeAddressStreet2;
                        prospect.homeAddressLine3 = homeAddressStreet3;
                        prospect.homeAddressCity = homeAddressCity;
                        prospect.homeAddressState = homeAddressState;
                        prospect.homeAddressZipCode = homeAddressZipCode;
                        prospect.mailingAddressLine1 = mailingAddressStreet1;
                        prospect.mailingAddressLine2 = mailingAddressStreet2;
                        prospect.mailingAddressLine3 = mailingAddressStreet3;
                        prospect.mailingAddressCity = mailingAddressCity;
                        prospect.mailingAddressState = mailingAddressState;
                        prospect.mailingAddressZipCode = mailingAddressZipCode;
                        prospect.homePhone = homePhoneNumber;
                        prospect.workPhone = workPhoneNumber;
                        prospect.otherPhone = otherPhoneNumber;
                        prospect.referral = isReferral;
                        prospect.emailAddress = data.Email;
                        if (data.ProspectInvestorProfile !== null && data.ProspectInvestorProfile !== undefined) {
                            prospect.previousFunds = data.ProspectInvestorProfile.InvestmentExperience_Flag !== undefined && data.ProspectInvestorProfile.InvestmentExperience_Flag !== null ? data.ProspectInvestorProfile.InvestmentExperience_Flag.toString() : '';
                            prospect.FINRA = data.ProspectInvestorProfile.Finra_Flag !== undefined && data.ProspectInvestorProfile.Finra_Flag !== null ? data.ProspectInvestorProfile.Finra_Flag.toString() : '';
                            prospect.investmentObjective = data.ProspectInvestorProfile.InvestmentObjective;
                            prospect.riskProfile = data.ProspectInvestorProfile.RiskProfile;
                            prospect.annualHouseholdIncomeRange = data.ProspectInvestorProfile.HouseholdIncomeRange;
                            prospect.netWorthRange = data.ProspectInvestorProfile.NetWorthRange;
                            prospect.lifeInsuranceRange = data.ProspectInvestorProfile.LifeInsuranceRange;
                            prospect.taxBracket = data.ProspectInvestorProfile.TaxBracketNumber;
                            prospect.dependentsNo = data.ProspectInvestorProfile.DepedentNumber;
                            prospect.ages = data.ProspectInvestorProfile.Ages;
                            prospect.currentEmployer = data.ProspectInvestorProfile.CurrentEmployer;
                            prospect.employmentStatus = data.ProspectInvestorProfile.EmploymentStatus;
                            prospect.occupation = data.ProspectInvestorProfile.Occupation;
                            prospect.employerAddress = data.ProspectInvestorProfile.EmployerAddress;
                            prospect.employerCity = data.ProspectInvestorProfile.EmployerCity;
                            prospect.employerState = data.ProspectInvestorProfile.EmployerState;
                            prospect.employerZipCode = data.ProspectInvestorProfile.EmployerZipCode;
                            prospect.employerSalary = data.ProspectInvestorProfile.Salary;
                            prospect.hireDate = data.ProspectInvestorProfile.HireDate !== null && data.ProspectInvestorProfile.HireDate !== undefined ? new Date(data.ProspectInvestorProfile.HireDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.expectedAnnuityDate = data.ProspectInvestorProfile.ExpectedAnnuityDate !== null && data.ProspectInvestorProfile.ExpectedAnnuityDate !== undefined ? new Date(data.ProspectInvestorProfile.ExpectedAnnuityDate.toString()).toISOString().substr(0, 10) : '';
                            prospect.isInvestorProfileNew = false;
                        }
                        else {
                            prospect.isInvestorProfileNew = true;
                        }
                        if (data.ProspectIncomeSource !== undefined && data.ProspectIncomeSource !== null) {
                            prospect.incomeAccountSalary = data.ProspectIncomeSource.Salary;
                            prospect.socialSecurity = data.ProspectIncomeSource.SocialSecurity;
                            prospect.pensionBenefits = data.ProspectIncomeSource.PensionBenefits;
                            prospect.investmentIncome = data.ProspectIncomeSource.InvestmentIncome;
                            prospect.rmd = data.ProspectIncomeSource.RMD;
                            prospect.other = data.ProspectIncomeSource.Other;
                            prospect.expensesAmount = data.ProspectIncomeSource.ExpensesAmount;
                            prospect.isIncomeSourceNew = false;
                        }
                        else {
                            prospect.isIncomeSourceNew = true;
                        }
                    }
                    else {
                        prospect.isNew = true;
                    }
                })
                .catch(error => {
                });
            //break;
        default:
            //console.log(action);
            next(action);
            break;
    }
};


export const errorHandler = state => next => action => {
    try {

        next(action);
    }
    catch (err) {
        console.log("error caught");
    }
}
