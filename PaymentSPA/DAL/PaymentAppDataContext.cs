using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.IO;
using PaymentSPA.Models;

namespace PaymentSPA.DAL
{
    public class PaymentAppDataContext : IPaymentAppDataContext
    {
        private IConfiguration _configuration;

        private IFileProvider _fileProvider;

        public string DataFilePath { get; set; } //The data will be stored in this file instead of DB

        public PaymentAppDataContext(IConfiguration configuration, IFileProvider fileProvider)
        {
            this._configuration = configuration;
            this._fileProvider = fileProvider;
            this.DataFilePath = _configuration["PaymentsFileName"];
        }

        public bool WriteFile(Payment payment)
        {
            if (payment == null)
            {
                return false;
            }
            //In the real application, the file name could be dynamic using "payments-{currentDate}.txt"
            IFileInfo file = this._fileProvider.GetFileInfo(this.DataFilePath);
            string fileFullPath = file.PhysicalPath;
            string dataToWrite = string.Format("{0} | {1} | {2} | {3} | {4} | {5}", payment.BSB, payment.AccountNo, payment.AccountName, payment.Reference, payment.Amount, System.DateTime.Now);
            if (!file.Exists)
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(fileFullPath))
                {
                    sw.WriteLine(dataToWrite);
                }
            }
            // This text is always added, making the file longer over time
            // if it is not deleted.
            using (StreamWriter sw = File.AppendText(fileFullPath))
            {
                sw.WriteLine(dataToWrite);
            }
            return true;
        }
    }
}
