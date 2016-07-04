using Ampbi.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ampbi.Business.Interface;
using Ampbi.DataAccess.DTOModels;
using AutoMapper;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Data;
using PagedList;
using PagedList.Mvc;
using Ampbi.DataAccess.Extensions;
using Ampbi.DataAccess.ViewModel;
using System.Globalization;

namespace Ampbi.Business.Business
{
    public class DashboardDetails : IDashBoard
    {
        #region Registration Follow Up
        public ICollection<getRegistrationFollowUpGridRecord_Result> getRegisteredUserDetails()
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            #region CommentedCode
            //ICollection<UserRegistrationModel> ptx = (from r in entities.tbl_UserRegistration
            //                                          select new UserRegistrationModel
            //                                          {
            //                                              CompanyGUID = r.CompanyGUID,
            //                                              CompanyName = r.CompanyName,
            //                                              FirstName = r.FirstName + " "+ r.LastName,
            //                                              NoOfLicence = r.NoOfLicence,
            //                                              CreatedDate = r.CreatedDate,
            //                                              //ContactDate =Convert.ToDateTime(r.ContactDate),
            //                                              Address1 = r.Address1,
            //                                              Address2 = r.Address2,
            //                                              //LastOutCome = r.OutCome,
            //                                              City =r.City,
            //                                              Zip=r.Zip

            //                                          }).ToList(); 
            #endregion


            ICollection<getRegistrationFollowUpGridRecord_Result> result = entities.getRegistrationFollowUpGridRecord().ToList();






            //ICollection<UserRegistrationModel> query = (from a in entities.tbl_UserRegistration
            //                                            from b in entities.tbl_UserRegistrationFollowup
            //                                            where
            //                                              a.USRSeq == b.USRSeq &&
            //                                              b.USRFLWPSeq ==
            //                                                (from c in entities.tbl_UserRegistrationFollowup
            //                                                 where
            //                                                   c.USRSeq == a.USRSeq
            //                                                 select new
            //                                                 {
            //                                                     c.USRFLWPSeq
            //                                                 }).Max(p => p.USRFLWPSeq)
            //                                            select new UserRegistrationModel
            //            {
            //                USRSeq = a.USRSeq,
            //                Email = a.Email,
            //                FirstName = a.FirstName,
            //                LastName = a.LastName,
            //                Password = a.Password,
            //                CompanyName = a.CompanyName,
            //                CompanyGUID = a.CompanyGUID,
            //                Logo = a.Logo,
            //                Address1 = a.Address1,
            //                Address2 = a.Address2,
            //                City = a.City,
            //                State = a.State,
            //                Zip = a.Zip,
            //                ContactPhone = a.ContactPhone,
            //                PrefferedContactMethod = a.PrefferedContactMethod,
            //                NoOfEmployee = a.NoOfEmployee,
            //                NoOfLicence = a.NoOfLicence,
            //                CreatedDate = a.CreatedDate,
            //                RecordStatus = a.RecordStatus,
            //                //ContactDate =DateTime.Now, //Parse (b.ContactDate.ToString()),
            //                ContactDate = b.ContactDate.Value,
            //                LastOutCome = b.OutCome
            //            }).ToList();

            return result;
        }


        public UserRegistrationModel getRegisteredUserDetails(string companyGuid)
        {
            var userDto = new UserRegistrationModel();

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var userDetails = entities.tbl_UserRegistration.Where(x => x.CompanyGUID == companyGuid).FirstOrDefault();
                Mapper.CreateMap<Ampbi.DataAccess.tbl_UserRegistration, UserRegistrationModel>();
                userDto = Mapper.Map<Ampbi.DataAccess.tbl_UserRegistration, UserRegistrationModel>(userDetails);
                return userDto;
            }
        }
        public UserRegistrationModel getRegisteredUserDetails(int UserSeq)
        {
            var userDto = new UserRegistrationModel();

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                var userDetails = entities.tbl_UserRegistration.Where(x => x.USRSeq == UserSeq).FirstOrDefault();
                Mapper.CreateMap<Ampbi.DataAccess.tbl_UserRegistration, UserRegistrationModel>();
                userDto = Mapper.Map<Ampbi.DataAccess.tbl_UserRegistration, UserRegistrationModel>(userDetails);
                return userDto;
            }
        }

        public bool insertRegistrationFolloup(RegistrationFollowUpUpdateModel regFolloup, string userName)
        {
            bool insertStatus = false;
            try
            {
                using (AmpbidevEntities entities = new AmpbidevEntities())
                {
                    //Inserting the record in Folloup table
                    tbl_UserRegistrationFollowup tbluserFolloup = new tbl_UserRegistrationFollowup
                    {
                        USRSeq = regFolloup.UserSeq,
                        CompanyGUID = regFolloup.CompanyGUID,
                        ContactDate = DateTime.Now,
                        Notes = regFolloup.NotesTxt,
                        ContactedBy = userName,
                        OutCome = regFolloup.LastOutCome
                    };
                    entities.tbl_UserRegistrationFollowup.Add(tbluserFolloup);
                    entities.SaveChanges();
                    //Updating the User Registration table
                    tbl_UserRegistration objreg = entities.tbl_UserRegistration.First(m => m.CompanyGUID == regFolloup.CompanyGUID);
                    objreg.RecordStatus = regFolloup.LastOutCome;

                    entities.SaveChanges();

                    if (regFolloup.LastOutCome == "5")
                    {
                        tbl_Company tblcomp = new tbl_Company
               {
                   CompanyGUID = regFolloup.CompanyGUID,
                   CompanyName = regFolloup.CompanyName,
                   ContactName = regFolloup.ContactName,
                   ContactPhone = regFolloup.ContactPhone,
                   Address1 = regFolloup.Address1,
                   Address2 = regFolloup.Address2,
                   City = regFolloup.City,
                   State = regFolloup.StateCode,
                   Zip = regFolloup.Zip,
                   NoofEmployee = regFolloup.Employee,
                   NoofLicence = regFolloup.Licence,
                   TrialStartDate = regFolloup.StartDt,
                   TrialEndDate = regFolloup.EndDt,
                   CreatedBy = userName,
                   CreatedDate = DateTime.Now.Date,
                   UpdatedBy = userName
               };
                        entities.tbl_Company.Add(tblcomp);
                        entities.SaveChanges();
                        //Insert and update the record in tbl_user table based on condition
                        tbl_User objUser = entities.tbl_User.First(m => m.Email == objreg.Email);
                        if (objUser == null)
                        {
                            tbl_User tblUSer = new tbl_User
                            {
                                Email = objreg.Email,
                                FirstName = objreg.FirstName,
                                LastName = objreg.LastName,
                                Password = objreg.Password,
                                UserStatus = "26",
                                UserType = 1,
                                CompanyGuid = objreg.CompanyGUID,
                                FstTimeLogin = false,
                                searchfield = objreg.FirstName + " " + objreg.LastName + " " + objreg.Email

                            };
                            entities.tbl_User.Add(tblUSer);
                            entities.SaveChanges();
                        }
                        else
                        {
                            objUser.UserType = 1;
                            objUser.FirstName = objreg.FirstName;
                            objUser.LastName = objreg.LastName;
                            objUser.CompanyGuid = objreg.CompanyGUID;
                            objUser.searchfield = objreg.FirstName + " " + objreg.LastName + " " + objreg.Email;
                            entities.SaveChanges();
                        }
                        var licDetail = (from look in entities.ref_LookupValues
                                         where look.Lkpseqid == regFolloup.Licence
                                         select new { look.ActualValue }).FirstOrDefault();


                        var licenceExistInLinceInfo = (from lic in entities.tbl_licencemoduleInfo
                                                       where lic.CompanyGUID == regFolloup.CompanyGUID
                                                       select new { lic }).ToList();

                        for (int i = 0; i <= int.Parse(licDetail.ActualValue) - licenceExistInLinceInfo.Count; i++)
                        {
                            //Insert the incrod in Licence Info table
                            tbl_LicenceInfo licenceinfo = new tbl_LicenceInfo()
                            {
                                LicenceKey = Guid.NewGuid().ToString(),
                                CompanyGUID = regFolloup.CompanyGUID,
                                Trial = Convert.ToBoolean(regFolloup.trialRequest == "Yes" ? 1 : 0),
                                TrialStartDate = DateTime.Now.Date,
                                TrialEndDate = DateTime.Now.AddDays(30).Date
                            };
                            entities.tbl_LicenceInfo.Add(licenceinfo);
                            entities.SaveChanges();
                        }
                        var LicenceKeyInfo = (from lickey in entities.tbl_LicenceInfo
                                              where lickey.CompanyGUID == regFolloup.CompanyGUID
                                              select new { lickey.LicenceKey }).ToList();
                        var count = (from Ref_Modules in entities.ref_Modules
                                     select new
                                     {
                                         Ref_Modules.Moduleid,
                                         Ref_Modules.ModuleName
                                     }).ToList();

                        foreach (var k in LicenceKeyInfo)
                        {
                            foreach (var item in count)
                            {
                                if (regFolloup.CallDash == 1 && item.ModuleName == "Calls Dashboard")
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.TicketDash == 1 && item.ModuleName.Contains("Tickets Dashboard,"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.QADash == 1 && item.ModuleName.Contains("QA Dashboard"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.ApptDash == 1 && item.ModuleName.Contains("Appointment Dashboard"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.EmpDash == 1 && item.ModuleName.Contains("Employee Performance"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.VirtualDash == 1 && item.ModuleName.Contains("Virtual Assistant"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                                if (regFolloup.KnowbaseDash == 1 && item.ModuleName.Contains("Knowledge Base"))
                                {
                                    tbl_companymodule compModule = new tbl_companymodule()
                                    {
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        moduleid = item.Moduleid,
                                        DisplayName = item.ModuleName
                                    };
                                    entities.tbl_companymodule.Add(compModule);
                                    entities.SaveChanges();
                                    tbl_licencemoduleInfo licenmodule = new tbl_licencemoduleInfo()
                                    {
                                        Licencekey = k.LicenceKey,
                                        CompanyGUID = regFolloup.CompanyGUID,
                                        Moduleid = item.Moduleid,
                                        Active = Convert.ToBoolean(1)

                                    };
                                    entities.tbl_licencemoduleInfo.Add(licenmodule);
                                    entities.SaveChanges();
                                }
                            }
                        }


                        insertStatus = true;
                    }
                }



            }
            catch (Exception)
            {
                throw;
            }
            return insertStatus;
        }

        #endregion

        public List<Statelist> GetAllStateNamesList()
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            IEnumerable<Statelist> stateList =
                from p in entities.statelists
                select new Statelist() { statecode = p.statecode, statename = p.statename };
            return stateList.ToList();
        }

        public List<sp_getlistofvalues_Result> GetAllMiscToBind(string moduleName, string columName)
        {
            AmpbidevEntities dataAccess = new AmpbidevEntities();

            var prm = new ObjectParameter("lkpseqid", typeof(int));
            prm.Value = null;

            var prm1 = new ObjectParameter("description", typeof(string));
            prm1.Value = null;

            var prm2 = new ObjectParameter("finalAction", typeof(bool));
            prm2.Value = null;

            var prm3 = new ObjectParameter("writerecord", typeof(bool));
            prm3.Value = null;

            List<sp_getlistofvalues_Result> query = (from usr in dataAccess.sp_getlistofvalues(moduleName, columName, prm, prm1, prm2, prm3)
                                                     select usr).ToList();
            List<string> lst = new List<string>();
            return query.ToList();
        }

        public List<string> getusrProfileSearch()
        {
            List<string> lst = new List<string>();
            AmpbidevEntities entities = new AmpbidevEntities();
            var search = (from usr in entities.tbl_User
                          select new LoginModel
             {
                 searchfield = usr.searchfield
             }).ToList();
            foreach (var item in search)
            {
                lst.Add(item.searchfield);
            }

            return lst;

        }

        public UserProfileUpdate searchUsert(string searchID)
        {

            AmpbidevEntities entities = new AmpbidevEntities();
            var email = searchID.Split('-')[1].ToString().Replace(" ", "");
            var userdetail = (from urr in entities.tbl_User
                              from ut in entities.ref_UserType
                              from ureg in entities.tbl_UserRegistration
                              where
                                urr.UserType == ut.UserTypeID &&
                                urr.CompanyGuid == ureg.CompanyGUID &&
                                urr.Email == email
                              select new
                              {
                                  urr.FirstName,
                                  urr.LastName,
                                  ut.UserTypeName,
                                  urr.UserType,
                                  ureg.CompanyName,
                                  ureg.CompanyGUID
                              }).FirstOrDefault();


            var licencinfor = (from lic in entities.tbl_LicenceInfo
                               where lic.CompanyGUID == userdetail.CompanyGUID && lic.AssignedTo == email
                               select new
                               {
                                   lic.LicenceKey,
                                   lic.ValideToDate,
                                   lic.ValidFromDate,
                                   lic.AssignedTo
                               }).FirstOrDefault();

            if (licencinfor == null)
            {
                UserProfileUpdate usrsearch = new UserProfileUpdate()
                {
                    Email = email,
                    FirstName = userdetail.FirstName,
                    LastName = userdetail.LastName,
                    CompanyName = userdetail.CompanyName,
                    UserTypeName = userdetail.UserTypeName,
                    UserTypeID = userdetail.UserType.Value,
                    LicenceAssigned = string.Empty,
                    ValidFrom = string.Empty,
                    ValidTo = string.Empty

                };
                return usrsearch;
            }
            else
            {
                var modules = (from lic in entities.tbl_licencemoduleInfo
                               from modu in entities.ref_Modules
                               where
                                 lic.Moduleid == modu.Moduleid
                               select new
                               {
                                   lic.Moduleid,
                                   modu.ModuleName
                               }).ToList();
                UserProfileUpdate usrsearch = new UserProfileUpdate();

                usrsearch.Email = email;
                usrsearch.FirstName = userdetail.FirstName;
                usrsearch.LastName = userdetail.LastName;
                usrsearch.CompanyName = userdetail.CompanyName;
                usrsearch.UserTypeName = userdetail.UserTypeName;
                usrsearch.LicenceAssigned = licencinfor.LicenceKey;
                usrsearch.ValidFrom = licencinfor != null ? licencinfor.ValidFromDate.ToString() : string.Empty;
                usrsearch.ValidTo = licencinfor != null ? licencinfor.ValideToDate.ToString() : string.Empty;

                foreach (var item in modules)
                {
                    if (item.ModuleName == "Calls Dashboard")
                        usrsearch.CallDash = 1;
                    if (item.ModuleName == "Tickets Dashboard,")
                        usrsearch.TicketDash = 1;
                    if (item.ModuleName == "QA Dashboard")
                        usrsearch.QADash = 1;
                    if (item.ModuleName == "Appointment Dashboard")
                        usrsearch.ApptDash = 1;
                    if (item.ModuleName == "Employee Performance")
                        usrsearch.EmpDash = 1;
                    if (item.ModuleName == "Virtual Assistant")
                        usrsearch.VirtualDash = 1;
                    if (item.ModuleName == "Knowledge Base")
                        usrsearch.KnowbaseDash = 1;
                }
                return usrsearch;
            }
        }

        public bool UserProfileUpdated(UserProfileUpdate model)
        {
            bool updateStatus = false;
            try
            {
                AmpbidevEntities entities = new AmpbidevEntities();



                tbl_User objUser = entities.tbl_User.First(m => m.Email == model.Email);
                objUser.FirstName = model.FirstName;
                objUser.LastName = model.LastName;
                objUser.UserType = model.UserTypeID;
                entities.SaveChanges();

                var data = (from usr in entities.tbl_User
                            from lic in entities.tbl_LicenceInfo
                            where usr.CompanyGuid == lic.CompanyGUID && usr.Email == model.Email && usr.Email == lic.AssignedTo
                            select new
                            {
                                usr.CompanyGuid,
                                lic.LicenceKey
                            }).FirstOrDefault();

                if (data != null)
                {

                    var modules = (from lic in entities.tbl_licencemoduleInfo
                                   from modu in entities.ref_Modules
                                   where
                                     lic.Licencekey == data.LicenceKey
                                   select new
                                   {
                                       lic.Moduleid,
                                       modu.ModuleName
                                   }).ToList();

                    if (modules != null)
                    {
                        tbl_licencemoduleInfo objlic = entities.tbl_licencemoduleInfo.First(m => m.Licencekey == data.LicenceKey);
                        foreach (var item in modules)
                        {
                            if (item.ModuleName == "Calls Dashboard" && model.CallDash == 1)
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            if (item.ModuleName == "Tickets Dashboard,")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }

                            if (item.ModuleName == "QA Dashboard")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            if (item.ModuleName == "Appointment Dashboard")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            if (item.ModuleName == "Employee Performance")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            if (item.ModuleName == "Virtual Assistant")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            if (item.ModuleName == "Knowledge Base")
                            {
                                objlic.Moduleid = item.Moduleid;
                                objlic.Active = true;
                            }
                            entities.SaveChanges();
                        }
                    }
                }


                updateStatus = true;


            }
            catch (Exception ex)
            {
                updateStatus = false;
            }
            return updateStatus;
        }



        public CompanyChartInfoModel getCompanyChartInfo(int ModuleID, string CompanyGUID)
        {
            AmpbidevEntities dataAccess = new AmpbidevEntities();
            var result = (from info in dataAccess.tbl_CompanyChartInfo
                          where info.ModuleID == ModuleID && info.CompanyGUID == CompanyGUID
                          select new CompanyChartInfoModel
                          {
                              Chart1 = info.Chart1,
                              Chart1Name = info.Chart1Name,
                              Chart2 = info.Chart2,
                              Chart2Name = info.Chart2Name,
                              Chart3 = info.Chart3,
                              Chart3Name = info.Chart3Name,
                              Chart4 = info.Chart4,
                              Chart4Name = info.Chart4Name,

                          }).FirstOrDefault();

            return result;

        }

        #region CompanyProfile

        public List<string> getCompanyProfileSearch()
        {
            List<string> lst = new List<string>();
            AmpbidevEntities entities = new AmpbidevEntities();
            var search = (from comp in entities.tbl_Company
                          select new CompanyModel
                          {
                              CompanyName = comp.CompanyName
                          }).ToList();
            foreach (var item in search)
            {
                lst.Add(item.CompanyName);
            }

            return lst;
        }

        public UserRegistrationModel getCompanyProfileDetailOnSearch(string companyName)
        {
            AmpbidevEntities entities = new AmpbidevEntities();

            var company = (from comp in entities.tbl_Company
                           where comp.CompanyName == companyName
                           select new
                           {
                               comp

                           }).FirstOrDefault();

            UserRegistrationModel model = new UserRegistrationModel()
            {
                CompanyName = company.comp.CompanyName
            };


            return model;
        }
        #endregion

        public CompanyModel getCompanyInformation(string companyGuiD)
        {

            AmpbidevEntities entities = new AmpbidevEntities();

            var resutl = (from comp in entities.tbl_Company
                          where comp.CompanyGUID == companyGuiD
                          select new CompanyModel
                          {
                              CompanyGUID = comp.CompanyGUID,
                              CompanyName = comp.CompanyName
                          }).FirstOrDefault();

            return resutl;
        }

        #region AccessLOG

        public IPagedList<sp_dispmoduleaccess_Result> GetAccess(string Email, string Companyguid, int? no)
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            List<sp_dispmoduleaccess_Result> obj = new List<sp_dispmoduleaccess_Result>();
            var query = "EXEC dbo.sp_dispmoduleaccess  @email,@companyguid ,@Employeename,@module,@accessdatetimeationPerc";

            var parameters = new[]
                {
                                  
                    new SqlParameter("@companyguid",Companyguid),
                    new SqlParameter("@email",Email),
                    new SqlParameter("@Employeename", DBNull.Value),
                    new SqlParameter("@module", DBNull.Value),
                    new SqlParameter("@accessdatetimeationPerc", DBNull.Value),
                    
                };
            //Assume _context is your EF DbContext
            using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
            {
                obj = multiResultSet.ResultSetFor<sp_dispmoduleaccess_Result>().ToList();
            }

            IPagedList<sp_dispmoduleaccess_Result> obj1 = obj.ToPagedList(no ?? 1, 30);




            return obj1;
        }
        #endregion

        #region KPI

        //pranjal start update

        public bool CheckKPI(string kpiName, string companyGuid)
        {
            bool status = false;
            AmpbidevEntities entities = new AmpbidevEntities();
            var data = (from k in entities.tbl_KPIMetric where k.KPIMetricName == kpiName && k.companyguid == companyGuid select k).FirstOrDefault();
            if (data == null)
            {
                status = true;
                return status;
            }
            else
            {
                status = false;
                return status;

            }

        }



        public List<LookupValuesModel> GetAllColorList()
        {
            AmpbidevEntities entites = new AmpbidevEntities();
            IEnumerable<LookupValuesModel> color = from n in entites.ref_LookupValues
                                                   where n.Modulename == "KPI" && n.Columnname == "Color" && n.active == true
                                                   select new LookupValuesModel()
                                                   {
                                                       Lkpseqid = n.Lkpseqid,
                                                       ActualValue = n.ActualValue
                                                   };
            return color.ToList();
        }

        //only for test 3table first insert and update
        public bool InsertKpi(KPIMetricModel kpiModel, string companyGuid)
        {
            bool insetUpdateStatus = false;
            AmpbidevEntities entities = new AmpbidevEntities();
            tbl_KPIMetric objkpi = entities.tbl_KPIMetric.FirstOrDefault(k => k.KPIMetricName == kpiModel.KPIName);
            if (objkpi == null)
            {

                tbl_KPIMetric tblKpi = new tbl_KPIMetric
                {
                    companyguid = companyGuid,
                    KPIMetricName = kpiModel.KPIName,
                    ShortName = kpiModel.ShortName,
                    Active = kpiModel.Active,
                    displayorder = kpiModel.DisplayOrder,
                    modulename = kpiModel.ModuleName,
                    StartDate = Convert.ToDateTime(kpiModel.StartDate),
                    EndDate = Convert.ToDateTime(kpiModel.EndDate)


                };
                entities.tbl_KPIMetric.Add(tblKpi);
                entities.SaveChanges();
                tbl_KPIMetric checkkpiid = entities.tbl_KPIMetric.First(k => k.companyguid == companyGuid && k.KPIMetricName == kpiModel.KPIName);
                //tbl_KPIMetric objkpiNewData = entities.tbl_KPIMetric.FirstOrDefault(k=>k.KPIMetricId == checkkpiid.KPIMetricId);

                tbl_KPIMetricGoal tblKpiGoal = new tbl_KPIMetricGoal
                {
                    CompanyGuid = companyGuid,
                    KPIMetricId = checkkpiid.KPIMetricId,
                    Goal = kpiModel.Goal,
                    programname = kpiModel.programname,
                    valueabovegoal = kpiModel.valueabovegoal,
                    valuebelowgoal = kpiModel.valuebelowgoal,
                    valuemeetgoal = kpiModel.valuemeetgoal,
                    CoachingColorAboveGoal = kpiModel.CoachingColorAboveGoal,
                    CoachingColorbelowGoal = kpiModel.CoachingColorbelowGoal,
                    CoachingColormeetGoal = kpiModel.CoachingColormeetGoal,
                };
                entities.tbl_KPIMetricGoal.Add(tblKpiGoal);
                entities.SaveChanges();
                insetUpdateStatus = true;
                return insetUpdateStatus;

            }
            else
            {
                objkpi.StartDate = Convert.ToDateTime(kpiModel.StartDate);
                objkpi.EndDate = Convert.ToDateTime(kpiModel.EndDate);
                objkpi.displayorder = kpiModel.DisplayOrder;
                objkpi.ShortName = kpiModel.ShortName;
                objkpi.Active = kpiModel.Active;
                objkpi.modulename = kpiModel.ModuleName;
                // entities.SaveChanges();
                //goal table
                tbl_KPIMetricGoal objKpiGoal = entities.tbl_KPIMetricGoal.FirstOrDefault(g => g.KPIMetricId == objkpi.KPIMetricId);
                //tbl_KPIMetricGoal objKpiGoal = from n in entities.tbl_KPIMetricGoal where n.CompanyGuid == companyGuid select n; 
                if (objKpiGoal == null)
                {
                    return false;
                }
                objKpiGoal.Goal = kpiModel.Goal;
                objKpiGoal.CoachingColorAboveGoal = kpiModel.CoachingColorAboveGoal;
                objKpiGoal.CoachingColorbelowGoal = kpiModel.CoachingColorbelowGoal;
                objKpiGoal.CoachingColormeetGoal = kpiModel.CoachingColormeetGoal;
                objKpiGoal.valueabovegoal = kpiModel.valueabovegoal;
                objKpiGoal.valuebelowgoal = kpiModel.valuebelowgoal;
                objKpiGoal.valuemeetgoal = kpiModel.valuemeetgoal;
                objKpiGoal.programname = kpiModel.programname;
                entities.SaveChanges();
                insetUpdateStatus = true;
                return insetUpdateStatus;
            }
        }

        public KPIMetricModel GetKpiProfileFromSearch(string kpiname, string companyGuid)
        {

            AmpbidevEntities entities = new AmpbidevEntities();
            var kpiData = (from kpi in entities.tbl_KPIMetric
                           from cp in entities.tbl_Company
                           from kpigoal in entities.tbl_KPIMetricGoal
                           where kpi.KPIMetricName == kpiname &&
                           cp.CompanyGUID == companyGuid &&
                           kpigoal.KPIMetricId == kpi.KPIMetricId

                           select new KPIMetricModel

                           {

                               //tblkpimetridata
                               KPIName = kpi.KPIMetricName,
                               ShortName = kpi.ShortName,
                               Active = kpi.Active,//change in model
                               DisplayOrder = kpi.displayorder,//change in model
                               StartDate = kpi.StartDate.ToString(),
                               EndDate = kpi.EndDate.ToString(),
                               ModuleName = kpi.modulename,
                               //tblcompanydata
                               companyName = cp.CompanyName,

                               //tblkpimetrigoaldata
                               Goal = kpigoal.Goal,
                               programname = kpigoal.programname,
                               valuemeetgoal = kpigoal.valuemeetgoal,
                               valueabovegoal = kpigoal.valueabovegoal,
                               valuebelowgoal = kpigoal.valuebelowgoal,
                               CoachingColorAboveGoal = kpigoal.CoachingColorAboveGoal,
                               CoachingColormeetGoal = kpigoal.CoachingColormeetGoal,
                               CoachingColorbelowGoal = kpigoal.CoachingColorbelowGoal

                           }).FirstOrDefault();
            return kpiData;


        }

        public List<CompanyModel> GetAllCompanyNameList()
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            IEnumerable<CompanyModel> companyNameList = from comp in entities.tbl_Company
                                                        select new CompanyModel()
                                                        {
                                                            CompanyName = comp.CompanyName

                                                        };
            return companyNameList.ToList();
        }
        public List<modulesModel> GetModuleNameList()
        {
            AmpbidevEntities entites = new AmpbidevEntities();
            IEnumerable<modulesModel> moduleNameList = from n in entites.ref_Modules
                                                       select new modulesModel()
                                                       {
                                                           ModuleName = n.ModuleName
                                                       };
            return moduleNameList.ToList();
        }
        public List<string> GetKpi(string companyGuid)
        {
            List<string> lst = new List<string>();
            AmpbidevEntities entities = new AmpbidevEntities();
            var search = (from kpi in entities.tbl_KPIMetric
                          where kpi.companyguid == companyGuid
                          group kpi by kpi.KPIMetricName into ne
                          orderby ne.Key
                          select ne.Key).ToList();

            return search;
        }


        //end
        #endregion





        #region Get Chart Axis Name
        public List<sp_getchartaxislabels_Result> getChartAxisName(string CompanyGUID, string ModuleName, string ChartName, int chartno)
        {
            AmpbidevEntities _context = new AmpbidevEntities();
            List<sp_getchartaxislabels_Result> obj = new List<sp_getchartaxislabels_Result>();

            var query = "EXEC dbo.sp_getchartaxislabels @companyguid,@modulename,@chartname,@chartno,@xaxislabel,@yaxislabel";
            var parameters = new[]
                {
                    new SqlParameter("@companyguid", CompanyGUID),
                    new SqlParameter("@modulename", ModuleName),
                       new SqlParameter("@chartname", ChartName),
                    new SqlParameter("@chartno", chartno),
                    new SqlParameter("@xaxislabel", DBNull.Value),
                    new SqlParameter("@yaxislabel", DBNull.Value)
                };

            //Assume _context is your EF DbContext
            using (var multiResultSet = _context.MultiResultSetSqlQuery(query, parameters))
            {
                obj = multiResultSet.ResultSetFor<sp_getchartaxislabels_Result>().ToList();
            }
            if (obj.Count == 0)
            {
                sp_getchartaxislabels_Result ob = new sp_getchartaxislabels_Result();
                ob.xaxislabel = "xaxisval";
                ob.yaxislabel = "yaxisval";
                obj.Add(ob);
            }

            return obj;

        }
        #endregion

        #region Moodi Icon Transaction
        public bool InsertMoodiTrans(string Email, string MoodiIconselected)
        {
            bool insertrecord = false;
            AmpbidevEntities entities = new AmpbidevEntities();

            try
            {
                tbl_moodicontransaction tblmoditras = new tbl_moodicontransaction()
                {
                    Datecreated = DateTime.Now,
                    Email = Email,
                    Moodiconselected = MoodiIconselected

                };
                entities.tbl_moodicontransaction.Add(tblmoditras);
                entities.SaveChanges();
                insertrecord = true;
            }
            catch (Exception ex)
            {
                return insertrecord;
            }

            return insertrecord;

        }

        #endregion

        #region UserSetting data

        public UserSettingModel getUserSettingData(string email)
        {
            UserSettingModel model = new UserSettingModel();
            AmpbidevEntities entitiest = new AmpbidevEntities();

            var query = (from usr in entitiest.Dim_Employee1 where usr.EMAIL == email select usr).First();

            var query1 = (from usr in entitiest.tbl_User where usr.Email == email select usr).First();
            if (query != null && query1 != null)
            {
                var comparny = (from comp in entitiest.tbl_Company where comp.CompanyGUID == query.Companyguid select comp.CompanyName).FirstOrDefault();

                if (query != null && query1 != null)
                {
                    model.Company = comparny.ToString() == string.Empty ? "Information not available" : comparny.ToString();
                    model.Email = query.EMAIL == string.Empty ? "Information not available" : query.EMAIL;
                    model.ENumber = query.Employeenumber.ToString() == string.Empty ? "Information not available" : query.Employeenumber.ToString();
                    model.FirstName = query.employeeFirstname == string.Empty ? "Information not available" : query.employeeFirstname;
                    model.LastName = query.employeeLastname == string.Empty ? "Information not available" : query.employeeLastname;
                    model.Location = query.LocationName == string.Empty ? "Information not available" : query.LocationName;
                    // model.Image = query1.userimage;
                    model.Title = "Information not available";
                    model.Image = query1.userimage;
                    model.Supervisor = "Information not available";
                }
            }
            return model;


        }
        public bool UploadImage(byte[] val, string email)
        {

            using (AmpbidevEntities entities = new AmpbidevEntities())
            {
                tbl_User objUser = entities.tbl_User.First(m => m.Email == email);

                objUser.userimage = val;

                entities.SaveChanges();

            }


            return true;
        }


        #endregion

        #region Application Log
        public bool InsertLog(AppLogModel model)
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            if (model != null)
            {
                tbl_AppLog applog = new tbl_AppLog()
                {
                    CompanyGUID = model.CompanyGUID,
                    UserEmailID = model.UserEmailID,
                    DashboardName = model.DashboardName,
                    PropertyName1 = model.PropertyName1,
                    PropertyValue1 = model.PropertyValue1,
                    PropertyName2 = model.PropertyName2,
                    PropertyValue2 = model.PropertyValue2,
                    PropertyName3 = model.PropertyName3,
                    PropertyValue3 = model.PropertyValue3,
                    PropertyName4 = model.PropertyName4,
                    PropertyValue4 = model.PropertyValue4,
                    PropertyName5 = model.PropertyName5,
                    PropertyValue5 = model.PropertyValue5,
                    PropertyName6 = model.PropertyName6,
                    PropertyValue6 = model.PropertyValue6,
                    PropertyName7 = model.PropertyName7,
                    PropertyValue7 = model.PropertyValue7,
                    PropertyName8 = model.PropertyName8,
                    PropertyValue8 = model.PropertyValue8
                };
                entities.tbl_AppLog.Add(applog);
                entities.SaveChanges();
            }
            return true;
        }


        public void ModuleAudit(string moduleName, string companyGUID, string username)
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            var resutl = (entities.Sp_ins_acessrecord(moduleName, username, companyGUID));
        }


        #endregion

        #region Implicity method

        public List<ChartDetailModel> getDataToBindChart(string userName, string companyGuid, int chartNo, string dealerName, string marketName, string displylvl1, string displylvl2, string displylvl3, DateTime reportDate, string type)
        {
            throw new NotImplementedException();
        }

        public List<QADashboardListModel> getAgentAndQuestion(string companyGuid, string spType)
        {
            throw new NotImplementedException();
        }

        public EmployeePerformanceObjects getEmployeePerformance(string emailId, string KPI, string reportDate, string Type, string prgName)
        {
            throw new NotImplementedException();
        }

        public EmployeePerformanceObjects getEmployeeAllTabNames(string emailId, string KPI, string reportDate, string Type)
        {
            throw new NotImplementedException();
        }

        public EmployeeIndividualPerformanceObjects getEmployeePerformanceIndividualDetails(string emailId, string recDates, int recYear, string Type)
        {
            throw new NotImplementedException();
        }

        public EmployeeIndividualPerformanceObjects GetIndividualPerformanceCardCoachingGridDetails(string companyGUID, string email)
        {
            throw new NotImplementedException();
        }

        public EmployeeIndividualPerformanceObjects GetIndividualPerformanceTrainingGridDetails(string companyGUID, string email)
        {
            throw new NotImplementedException();
        }

        public List<string> getQADashboardParameter(string CompanyGUID, string ModuelName, string dashbaordName)
        {
            throw new NotImplementedException();
        }

        public List<sp_getKPIMenu_Result> getKPIMenu(string companyGUID, string parameter)
        {
            throw new NotImplementedException();
        }

        public List<string> getProgramNameForEmpPerf(string companyGUID, string email)
        {
            throw new NotImplementedException();
        }

        public List<ChimesAgentmymetrics> getmyMetrics(string companyGUID, string email, string recDate, string cardColor, string type)
        {
            throw new NotImplementedException();
        }

        public List<chimesAgentTeamComparision> getTeamComparisonData(string companyGUID, string email, string recDate, string type)
        {
            throw new NotImplementedException();
        }

        public List<chimesAgentOrgComparision> getOrgComparisonData(string companyGUID, string email, string recDate, string type)
        {
            throw new NotImplementedException();
        }

        public List<AgentComparisonChartPopup> getChimesMetricComparisonChart(string companyGuid, string email, string kpimetricid, string type)
        {
            throw new NotImplementedException();
        }

       
        //public List<chimetrendchart1> gettrendchart1(string companyGuid, string site, string program, string manager, string agent, string recdate, string type)
        //{
        //    throw new NotImplementedException();
        //}

        #endregion



        #region Performance Dashboard

        public List<string> getPerformanceParameter(string companyguid)
        {
            List<string> lst = new List<string>();
            AmpbidevEntities entities = new AmpbidevEntities();

            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Sites")
                                      select param.Paramvalue).ToList()));


            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Day")
                                      select param.Paramvalue).ToList()));

            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Week")
                                      select param.Paramvalue).ToList()));
            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Month")
                                      select param.Paramvalue).ToList()));
            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Interval")
                                      select param.Paramvalue).ToList()));

            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Team Manager")
                                      select param.Paramvalue).ToList()));

            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "Agent")
                                      select param.Paramvalue).ToList()));

            lst.Add(String.Join(",", (from param in entities.sp_getParameterlist(companyguid, "LOB")
                                      select param.Paramvalue).ToList()));



            return lst;
        }

        public List<sp_c3_perfdb_uessurvey_Result> getUesSurvey(string companyGUID, string location, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent)
        {
            AmpbidevEntities entities = new AmpbidevEntities();
            List<sp_c3_perfdb_uessurvey_Result> obj = new List<sp_c3_perfdb_uessurvey_Result>();

            var query = "EXEC dbo.sp_c3_perfdb_uessurvey @companyguid,@location,@trandate,@tranweek,@month,@interval,@teammanager,@agent,@retlob,@rettype,@goal,@actual";
            var parameters = new[]
                {
                    new SqlParameter("@companyguid", companyGUID),
                    new SqlParameter("@location", location  ==""? (object)DBNull.Value : location),
                    new SqlParameter("@trandate", tradedate  ==""? (object)DBNull.Value : tradedate),
                    new SqlParameter("@tranweek", tradeweek  ==""? (object)DBNull.Value : tradeweek),
                    new SqlParameter("@interval", interval  ==""? (object)DBNull.Value : interval),
                    new SqlParameter("@teammanager", teammanager  ==""? (object)DBNull.Value : teammanager),
                     new SqlParameter("@month", month==""? (object)DBNull.Value : month),
                    new SqlParameter("@agent", agent ==""? (object)DBNull.Value : agent),                 
                    new SqlParameter("@retlob",DBNull.Value),
                    new SqlParameter("@rettype", DBNull.Value),
                    new SqlParameter("@goal", DBNull.Value),
                    new SqlParameter("@actual", DBNull.Value)
                };

            using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
            {
                obj = multiResultSet.ResultSetFor<sp_c3_perfdb_uessurvey_Result>().ToList();
            }

            return obj;

        }



        public List<sp_c3_perfdb_uessurvey3chrts_Result> getUesSurveybar(string companyGUID, string site, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent,string lob)
        {
            List<sp_c3_perfdb_uessurvey3chrts_Result> obj = new List<sp_c3_perfdb_uessurvey3chrts_Result>();
            AmpbidevEntities entities = new AmpbidevEntities();
            DateTime dt = new DateTime();
            if (tradedate != "All")
            {
                dt = DateTime.Parse(tradedate);
            }
            int monthint =0;
            if (month !="6")
                monthint = DateTime.ParseExact(month, "MMM", CultureInfo.CurrentCulture).Month;
            else
                monthint = int.Parse(month);

            var query = "EXEC dbo.sp_c3_perfdb_uessurvey3chrts @companyguid,@charttype,@lob,@location,@trandate,@tranweek,@month,@interval,@teammanager,@agent,@retlob,@rettype,@goal,@actual";
            var parameters = new[]
                {
                    new SqlParameter("@companyguid", companyGUID), new SqlParameter("@charttype", "Composite"),new SqlParameter("@lob", lob),
                    new SqlParameter("@location", site  ==""? (object)DBNull.Value : site),
                    new SqlParameter("@trandate", tradedate  =="All"? (object)DBNull.Value : dt.Date),
                    new SqlParameter("@tranweek", tradeweek  ==""? (object)DBNull.Value : tradeweek),
                    new SqlParameter("@interval", interval  ==""? (object)DBNull.Value : interval),
                    new SqlParameter("@teammanager", teammanager  ==""? (object)DBNull.Value : teammanager),
                     new SqlParameter("@month", month==""? (object)DBNull.Value : monthint),
                    new SqlParameter("@agent", agent ==""? (object)DBNull.Value : agent),                 
                    new SqlParameter("@retlob",DBNull.Value),
                    new SqlParameter("@rettype", DBNull.Value),
                    new SqlParameter("@goal", DBNull.Value),
                    new SqlParameter("@actual", DBNull.Value)
                };

            using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
            {
                obj = multiResultSet.ResultSetFor<sp_c3_perfdb_uessurvey3chrts_Result>().ToList();
            }



            return obj;
        }

        public List<sp_c3_perfdb_uessurvey3charts2_Result> getUesSurveybar2(string companyGUID, string charttype, string site, string tradedate, string tradeweek, string month, string interval, string teammanager, string agent,string lob)
        {

            List<sp_c3_perfdb_uessurvey3charts2_Result> obj = new List<sp_c3_perfdb_uessurvey3charts2_Result>();
            AmpbidevEntities entities = new AmpbidevEntities();
            DateTime dt = new DateTime();
            if (tradedate != "All")
            {
                dt = DateTime.Parse(tradedate);
            }

            int monthint = 0;
            if (month != "6")
                monthint = DateTime.ParseExact(month, "MMM", CultureInfo.CurrentCulture).Month;
            else
                monthint = int.Parse(month);



            var query = "EXEC dbo.sp_c3_perfdb_uessurvey3charts2 @companyguid,@charttype,@lob,@location,@trandate,@tranweek,@month,@interval,@teammanager,@agent,@rettype,@actual";
            var parameters = new[]
                {
                    new SqlParameter("@companyguid", companyGUID), new SqlParameter("@charttype", charttype),new SqlParameter("@lob", lob),
                    new SqlParameter("@location", site  ==""? (object)DBNull.Value : site),
                    new SqlParameter("@trandate", tradedate  =="All"? (object)DBNull.Value : dt.Date),
                    new SqlParameter("@tranweek", tradeweek  ==""? (object)DBNull.Value : tradeweek),
                    new SqlParameter("@interval", interval  ==""? (object)DBNull.Value : interval),
                    new SqlParameter("@teammanager", teammanager  ==""? (object)DBNull.Value : teammanager),
                     new SqlParameter("@month", month==""? (object)DBNull.Value : monthint),
                    new SqlParameter("@agent", agent ==""? (object)DBNull.Value : agent),                 
                    new SqlParameter("@retlob",DBNull.Value),
                    new SqlParameter("@rettype", DBNull.Value),
                    new SqlParameter("@goal", DBNull.Value),
                    new SqlParameter("@actual", DBNull.Value)
                };

            using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
            {
                obj = multiResultSet.ResultSetFor<sp_c3_perfdb_uessurvey3charts2_Result>().ToList();
            }



            return obj;

        }




        public string gettrendlookupvalue(string companyguid,string selection, string lob, string site, string teammanager)
        {

            AmpbidevEntities entities = new AmpbidevEntities();

            var prm1 = new ObjectParameter("listid", typeof(int));
            prm1.Value = null;
            var prm2 = new ObjectParameter("Paramvalue", typeof(string));
            prm1.Value = null;


            var retval = String.Join(",", (from n in entities.sp_getParameterlist_fortrend(companyguid, selection, lob == "" ? null : lob, site == "" ? null : site, teammanager == "" ? null : teammanager)
                                           select n.Paramvalue).ToList());



            return retval;
        }

        public List<c3trendchart1> getC3TrendChart1(string companyguid, string metric, string lob, string site, string teammanager, string agent, string recdate, string type)
        {

            AmpbidevEntities entities = new AmpbidevEntities();
            List<c3trendchart1> obj = new List<c3trendchart1>();
            var prm1 = new ObjectParameter("dispvalue", typeof(DateTime));
            prm1.Value = null;
            var prm2 = new ObjectParameter("period", typeof(string));
            prm1.Value = null;
            var prm3 = new ObjectParameter("defectpercent", typeof(decimal));
            prm1.Value = null;

            DateTime dt = DateTime.Parse(recdate);

            if (type == "M")
            {
                List<sp_pfdb_trendchart_monthly_Result> obj1 = new List<sp_pfdb_trendchart_monthly_Result>();
                var query = "EXEC dbo.sp_pfdb_trendchart_monthly @companyguid, @metric,@LOB,@site,@teammanager,@agent,@Recmonth,@dispdate,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@Recmonth", dt.Month),
                    new SqlParameter("@dispdate",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    obj1 = multiResultSet.ResultSetFor<sp_pfdb_trendchart_monthly_Result>().ToList();
                }
                foreach (var item in obj1)
                {
                    c3trendchart1 ob = new c3trendchart1();
                    ob.showvalue = item.dow;
                    ob.score = item.Actual;
                    obj.Add(ob);
                }
               

            }
            if (type == "W")
            {
                var query = "EXEC dbo.sp_pfdb_trendchart_weekly @companyguid, @metric,@LOB,@site,@teammanager,@agent,@wkstartdate,@dispdate,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@wkstartdate", dt.Date),
                    new SqlParameter("@dispdate",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    obj = multiResultSet.ResultSetFor<c3trendchart1>().ToList();
                }
            }
            if (type == "D")
            {
                var query = "EXEC dbo.sp_pfdb_trendchart_daily @companyguid, @metric,@LOB,@site,@teammanager,@agent,@Recdate,@dispdate,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@Recdate", dt.Date),
                    new SqlParameter("@dispdate",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    obj = multiResultSet.ResultSetFor<c3trendchart1>().ToList();
                }
            }


            


            return obj;

        }


        public List<c3trendchartdrilldown> getC3TrendChart1DrillDown(string companyguid, string metric, string lob, string site, string teammanager, string agent, string recdate, string type, string selecteddisp1)
        {

            AmpbidevEntities entities = new AmpbidevEntities();
            List<c3trendchartdrilldown> obj = new List<c3trendchartdrilldown>();
            var prm1 = new ObjectParameter("dispvalue", typeof(DateTime));
            prm1.Value = null;
            var prm2 = new ObjectParameter("period", typeof(string));
            prm1.Value = null;
            var prm3 = new ObjectParameter("defectpercent", typeof(decimal));
            prm1.Value = null;

            DateTime dt = new DateTime();
            


            if (type == "M")
            {

                //dt = DateTime.Parse(selecteddisp1);
                selecteddisp1 = selecteddisp1.Replace("-", "");
                dt = DateTime.Parse(selecteddisp1);
                List<sp_pfdb_trendchart_monthly_drilldown_Result> month = new List<sp_pfdb_trendchart_monthly_drilldown_Result>();
                //dt = DateTime.Parse(selecteddisp1);
                var query = "EXEC dbo.sp_pfdb_trendchart_monthly_drilldown @companyguid, @metric,@LOB,@site,@teammanager,@agent,@Recmonth,@recyear,@retdate,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@Recmonth",dt.Month ),new SqlParameter("@recyear",dt.Year ),
                    new SqlParameter("@retdate",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    month = multiResultSet.ResultSetFor<sp_pfdb_trendchart_monthly_drilldown_Result>().ToList();
                }
                foreach (var item in month)
                {
                    c3trendchartdrilldown ob = new c3trendchartdrilldown();
                    ob.showvalue = item.showvalue;
                    ob.Actual = item.Actual;
                    obj.Add(ob);
                }


            }
            if (type == "W")
            {

                //dt = DateTime.Parse(selecteddisp1);
                selecteddisp1 = selecteddisp1.Split('-')[0];
                dt = DateTime.ParseExact(selecteddisp1.Trim(), "MM/dd/yy", CultureInfo.InvariantCulture);
                List<sp_pfdb_trendchart_weekly_drilldown_Result> week = new List<sp_pfdb_trendchart_weekly_drilldown_Result>();
                //dt = DateTime.Parse(selecteddisp1);
                var query = "EXEC dbo.sp_pfdb_trendchart_weekly_drilldown @companyguid, @metric,@LOB,@site,@teammanager,@agent,@wkstartdate,@retdate,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@wkstartdate",dt.Date ),
                    new SqlParameter("@retdate",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    week = multiResultSet.ResultSetFor<sp_pfdb_trendchart_weekly_drilldown_Result>().ToList();
                }
                foreach (var item in week)
                {
                    c3trendchartdrilldown ob = new c3trendchartdrilldown();
                    ob.showvalue = item.showvalue;
                    ob.Actual = item.Actual;
                    obj.Add(ob);
                }

            }
            if (type == "D")
            {
                //dt = DateTime.Parse(selecteddisp1);
                selecteddisp1 = selecteddisp1.Split('-')[0];
                dt = DateTime.ParseExact(selecteddisp1.Trim(), "MM/dd/yy", CultureInfo.InvariantCulture);
              
                //dt = DateTime.Parse(selecteddisp1);
                var query = "EXEC dbo.sp_pfdb_trendchart_daily_drilldown @companyguid, @metric,@LOB,@site,@teammanager,@agent,@Recdate,@interval,@showvalue,@sno,@score";
                var parameters = new[]
                {
                   
                    new SqlParameter("@companyguid", companyguid),
                    new SqlParameter("@metric", metric),
                    new SqlParameter("@LOB", lob),
                    new SqlParameter("@site", site),
                    new SqlParameter("@teammanager", teammanager),
                    new SqlParameter("@agent", agent),
                    new SqlParameter("@Recdate",dt.Date ),
                    new SqlParameter("@interval",DBNull.Value),
                    new SqlParameter("@showvalue",DBNull.Value),
                    new SqlParameter("@sno",DBNull.Value), new SqlParameter("@score",DBNull.Value)
                };
                //Assume _context is your EF DbContext
                using (var multiResultSet = entities.MultiResultSetSqlQuery(query, parameters))
                {
                    obj = multiResultSet.ResultSetFor<c3trendchartdrilldown>().ToList();
                }
            }
            




            return obj;

        }

        #endregion
    }
}
