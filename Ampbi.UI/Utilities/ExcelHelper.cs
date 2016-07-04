using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Data;
using ExcelLibrary.SpreadSheet;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Online.Registration.Web.Helper
{
    public class ExcelHelper
    {
        public static string Export(string jsonTable)
        {
            jsonTable = Regex.Replace(jsonTable.Replace(@"\n", " "), @"\s+", " ");
            string excelFileName = Guid.NewGuid().ToString() + ".xls";
            string excelFilePath = HttpContext.Current.Server.MapPath("~/Temp/" + excelFileName);
            var result = Deserialize(jsonTable, typeof(DataTable));
            DataTable da = result as DataTable;
            //// Create an Excel object and add workbook...
            Workbook workbook = new Workbook();
            Worksheet worksheet = new Worksheet("Sheet1");
            if (da == null) return string.Empty;

            //add blank rows to data set because of ms excel unable to open the file if file size is less than 10kb
            int totalRows = da.Rows.Count;
            if (totalRows < 50)
            {
                int count = 50 - totalRows;
                for (int i = 0; i <= count; i++)
                {
                    da.Rows.Add(da.NewRow());
                }
            }

            if (da.Columns.Contains("Action"))
            {
                da.Columns.Remove("Action");
            }

            // Add column headings...
            int iCol = 0;
            foreach (DataColumn c in da.Columns)
            {

                worksheet.Cells[0, iCol] = new Cell(c.ColumnName);
                iCol++;
            }

            // for each row of data...
            int iRow = 0;
            foreach (DataRow r in da.Rows)
            {
                // add each row's cell data...
                iCol = 0;
                foreach (DataColumn c in da.Columns)
                {
                    worksheet.Cells[iRow + 1, iCol] = new Cell(r[c.ColumnName].ToString());

                    iCol++;
                }
                iRow++;
            }

            workbook.Worksheets.Add(worksheet);
            workbook.Save(excelFilePath);

            return excelFileName;
        }


        private static object Deserialize(string jsonText, Type valueType)
        {
            JsonSerializer json = new JsonSerializer
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    ObjectCreationHandling = ObjectCreationHandling.Replace,
                    MissingMemberHandling = MissingMemberHandling.Ignore,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };

            StringReader sr = new StringReader(jsonText);
            JsonTextReader reader = new JsonTextReader(sr);
            object result = json.Deserialize(reader, valueType);
            reader.Close();

            return result;
        }
    }
}