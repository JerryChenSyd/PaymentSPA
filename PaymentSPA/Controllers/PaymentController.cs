using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PaymentSPA.Models;
using PaymentSPA.Repositories.PaymentRepository;


namespace PaymentSPA.Controllers
{
    [Produces("application/json")]
    [Route("api/Payment")]
    public class PaymentController : Controller
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IPaymentRepository paymentRepository, ILogger<PaymentController> logger)
        {
            this._paymentRepository = paymentRepository;
            this._logger = logger;
        }
        // POST api/<controller>
        [HttpPost]
        public bool Post([FromBody] Payment payment)
        {
            if (ModelState.IsValid)
            {
                _logger.LogInformation("Add new payment action was called with valid data.");
                return this._paymentRepository.AddNewPayment(payment);
            }
            else
            {
                _logger.LogWarning("Add new payment action was called with invalid data!");
                return false;
            }
        }
    }
}