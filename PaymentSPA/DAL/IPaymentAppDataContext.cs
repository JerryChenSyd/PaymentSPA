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
    public interface IPaymentAppDataContext
    {
        bool WriteFile(Payment payment);
    }
}

