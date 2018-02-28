using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaymentSPA.DAL;
using PaymentSPA.Models;

namespace PaymentSPA.Repositories.PaymentRepository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IPaymentAppDataContext _dataContext;
        public PaymentRepository(IPaymentAppDataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public bool AddNewPayment(Payment payment)
        {
            return this._dataContext.WriteFile(payment);
        }
    }
}
