
using Ampbi.DataAccess.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using PagedList.Mvc;

namespace Ampbi.DataAccess.ViewModel
{
    public class DashBoard
    {
        public ICollection<getRegistrationFollowUpGridRecord_Result> userRegModel { get; set; }
        public UserRegistrationModel companyRegModel { get; set; }
        public List<Statelist> lstAllStateNames { get; set; }
        public CompanyModel CompanyModel { get; set; }
        public static string modiIconPath { get; set; }
        public static string mainMenuItem { get; set; }

        //pranjal start update kpi
        public List<CompanyModel> lstAllCompanyNames { get; set; }
        public List<modulesModel> lstAllModuleName { get; set; }
        public List<KPIMetricModel> lstAllGoalcolor { get; set; }
        public List<LookupValuesModel> lstAllColor { get; set; }
        public LookupValuesModel LookupValuesModel { get; set; }
        //accesslog
        public IPagedList<sp_dispmoduleaccess_Result> lstAlllogdata { get; set; }
        //end

        public List<sp_getlistofvalues_Result> LstNoOfEmpList { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfLicencesList { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfRecStatusList { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfPrefferedContact { get; set; }
        public List<sp_getlistofvalues_Result> LstNoOfCallDashboardChartTypes { get; set; }
        public static int UsrSeqID { get; set; }
        public modulesModel modulesModel { get; set; }
        public  List<string> UserName { get; set; }
        public UserProfileUpdate usrSearchProfileUpdate { get; set; }

        public Callsboard callsBoardValues { get; set; }
       
        public List<ChartDetailModel> lstchartDetails { get; set; }

        public object CompanyObject { get; set; }

        public List<LicenceInfoModel> licenceInfoModel { get; set; }

        public CompanyChartInfoModel getCompanyChartInfo { get; set; }

        public KPIMetricModel kpiMetricModel { get; set; }

        public List< QADashboardListModel> LstAgent { get; set; }
        public List<QADashboardListModel> LstQuestion { get; set; }

       

        public List<KPIMetricModel> metricList { get; set; }
        public List<EmployeePerformanceCount> employeeListCount { get; set; }
        public List<EmployeePerformaceCard> employeePerformanceCardList { get; set; }

        public Dictionary<string, byte[]> getAgentPicture { get; set; }

        //public List<EmployeePerformaceCardMonthly> employeePerformanceCardListMonthly { get; set; } 


        public List<QADashboardChartResultModel> lstchartDetailQADashboard { get; set; }

        public List<IndividualPerformanceCardGridDetails> empIndGridList { get; set; }

     

        public List<IndividualPerformanceCardOtherDetails> empIndOthrDetailsList { get; set; }
        public List<IndividualPerformanceCard> empIndPerfCard { get; set; } 

        public EmployeePerformaceCard IndividualPerfCardObjects { get; set; }

        public IndividualPerformanceCardOtherDetails IndividualPerfCardObjectsOtherDetails { get; set; }

     

        public MoodiTransModel moodiIconTrans { get; set; }

        public List<string> parameters { get; set; }




      

        
      



        

        public List<sp_getchartaxislabels_Result> getChartAxisName { get; set; }


        public List<sp_getKPIMenu_Result> KPIMenu { get; set; }

        public List<sp_getchartaxislabels_Result> QAScoreChart1Name { get; set; }
        public List<sp_getchartaxislabels_Result> QAScoreChart2Name { get; set; }
        public List<sp_getchartaxislabels_Result> QAScoreChart3Name { get; set; }
        public List<sp_getchartaxislabels_Result> QAScoreChart4Name { get; set; }

        public List<ChimesAgentmymetrics> agentMyMetric { get; set; }

     

        public static bool IsAgentLogin { get; set; }

        public List<chimesAgentTeamComparision> getTeamComp { get; set; }
        public List<chimesAgentOrgComparision> getOrgComp { get; set; }

        public UserSettingModel usersettingmodel { get; set; }

        public List<AgentComparisonChartPopup> getComparisonChartData { get; set; }


        //public List<sp_getAging_Chart1_Monthly_Result> Chart1 { get; set; }
        //public List<sp_getAging_Chart2_Monthly_Result> Chart2 { get; set; }

        //public List<sp_getAging_Chart1_DataExport_Daily_Result> Chart1Export { get; set; }
        //public List<sp_getAging_Chart2_DataExport_Daily_Result> Chart2Export { get; set; }

        //public List<sp_gettat_Chart1_Monthly_Result> TATChart1 { get; set; }
        //public List<sp_gettat_Chart3_Monthly_Result> TATChart2 { get; set; }

        public List<sp_c3_perfdb_uessurvey_Result> getUsesSurvey { get; set; }
        public List<sp_c3_perfdb_uessurvey3chrts_Result> getUsesSurveybar { get; set; }
        public List<sp_c3_perfdb_uessurvey3charts2_Result> getUsesSurveybar2 { get; set; }

        public List<string> getTreeviewdata { get; set; }
        public Dictionary<string, string> selectedItems { get; set; }

        public List<c3trendchart1> getc3TrendChart { get; set; }

        public List<c3trendchartdrilldown> getc3trendchardrilldown { get; set; }
    }
}
