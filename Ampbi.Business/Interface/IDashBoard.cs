using Ampbi.DataAccess;
using Ampbi.DataAccess.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList.Mvc;
using PagedList;
namespace Ampbi.Business.Interface
{
    public interface IDashBoard
    {
        ICollection<getRegistrationFollowUpGridRecord_Result> getRegisteredUserDetails();
        bool insertRegistrationFolloup(RegistrationFollowUpUpdateModel companyModel, string userName);
        List<Statelist> GetAllStateNamesList();
        UserRegistrationModel getRegisteredUserDetails(string companyGuid);
        UserRegistrationModel getRegisteredUserDetails(int UserSeq);
        List<sp_getlistofvalues_Result> GetAllMiscToBind(string moduleName,string columName);

       List<string> getusrProfileSearch();

       UserProfileUpdate searchUsert(string searchID);

       bool UserProfileUpdated(UserProfileUpdate model);
       //pranjal start 
       bool CheckKPI(string kpiName, string companyGuid);

       List<LookupValuesModel> GetAllColorList();

       bool InsertKpi(KPIMetricModel kpiModel, string companyGuid);

       KPIMetricModel GetKpiProfileFromSearch(string kpiname, string companyGuid);

       List<CompanyModel> GetAllCompanyNameList();

       List<modulesModel> GetModuleNameList();

       List<string> GetKpi(string companyGuid);
       //AccessLog
       IPagedList<sp_dispmoduleaccess_Result> GetAccess(string Email, string Companyguid, int? pageNo);
       //End

       //pranjal end
      
       List<ChartDetailModel> getDataToBindChart(string userName,string companyGuid, int chartNo,
           string dealerName, string marketName, string displylvl1, string displylvl2, string displylvl3, DateTime reportDate,string type);

       List<string> getCompanyProfileSearch();
      UserRegistrationModel getCompanyProfileDetailOnSearch(string companyName);

       CompanyChartInfoModel getCompanyChartInfo(int ModuleID,string CompanyGUID);

       CompanyModel getCompanyInformation(string companyGuiD);

      

       List<QADashboardListModel> getAgentAndQuestion(string companyGuid, string spType);

    
       EmployeePerformanceObjects getEmployeePerformance(string emailId, string KPI, string reportDate, string Type,string prgName);

       EmployeePerformanceObjects getEmployeeAllTabNames(string emailId, string KPI, string reportDate,
            string Type);
        EmployeeIndividualPerformanceObjects getEmployeePerformanceIndividualDetails(string emailId,
            string recDates, int recYear, string Type);

        EmployeeIndividualPerformanceObjects GetIndividualPerformanceCardCoachingGridDetails(string companyGUID,
            string email);

        EmployeeIndividualPerformanceObjects GetIndividualPerformanceTrainingGridDetails(string companyGUID,
            string email);

        bool InsertLog(AppLogModel model);

        bool InsertMoodiTrans(string Email, string MoodiIconselected);
        List<string> getQADashboardParameter(string CompanyGUID, string ModuelName, string dashbaordName);

       


        void ModuleAudit(string moduleName, string companyGUID, string username);

        List<sp_getchartaxislabels_Result> getChartAxisName(string CompanyGUID,string ModuleName,string ChartName,int chartno);

        List<sp_getKPIMenu_Result> getKPIMenu(string companyGUID, string parameter);

        List<string> getProgramNameForEmpPerf(string companyGUID,string email);

        List<ChimesAgentmymetrics> getmyMetrics(string companyGUID, string email, string recDate, string cardColor, string type);

     

        List<chimesAgentTeamComparision> getTeamComparisonData(string companyGUID, string email, string recDate,string type);

        //List<sp_chimesAgentTeamComparisionMonthly_Result> getTeamComparisonData(string companyGUID, string email, string recDate, string type);
        //List<sp_chimesAgentTeamComparisionWeekly_Result> getTeamComparisonData(string companyGUID, string email, string recDate, string type);



        List<chimesAgentOrgComparision> getOrgComparisonData(string companyGUID, string email, string recDate, string type);

        UserSettingModel getUserSettingData(string email);

        bool UploadImage(byte[] val,string email);

        List<AgentComparisonChartPopup> getChimesMetricComparisonChart(string companyGuid, string email, string kpimetricid, string type);



        //string gettrendlookupvalue(string selection, string site, string program, string manager);

        //List<chimetrendchart1> gettrendchart1(string companyGuid, string site, string program, string manager, string agent, string recdate,string type);

        List<string> getPerformanceParameter(string companyguid);

         List<sp_c3_perfdb_uessurvey_Result> getUesSurvey(string companyGUID, string site, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent);

         List<sp_c3_perfdb_uessurvey3chrts_Result> getUesSurveybar(string companyGUID, string site, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent,string lob);


         List<sp_c3_perfdb_uessurvey3charts2_Result> getUesSurveybar2(string companyGUID,string charttype, string site, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent,string lob);

         string gettrendlookupvalue(string companyguid,string selection, string lob, string site, string teammanager);

         List<c3trendchart1> getC3TrendChart1(string companyguid, string metric, string lob, string site, string teammanager, string agent, string recdate, string type);

         List<c3trendchartdrilldown> getC3TrendChart1DrillDown(string companyguid, string metric, string lob, string site, string teammanager, string agent, string recdate, string type,string selecteddisp1);
    }
}
