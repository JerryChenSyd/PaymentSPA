using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaymentSPA.Models;

namespace PaymentSPA.Repositories.PaymentRepository
{
    public interface IPaymentRepository
    {
        bool AddNewPayment(Payment payment);
    }
}
