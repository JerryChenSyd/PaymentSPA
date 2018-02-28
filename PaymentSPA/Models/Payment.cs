using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentSPA.Models
{
    public class Payment
    {
        public int TransactionID { get; set; }

        [Required]
        [StringLength(6, MinimumLength = 6)]
        [RegularExpression(@"^[0-9]{6}$")]
        [Range(1, 999999)]
        public string BSB { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 6)]
        [RegularExpression(@"^[0-9]{6,10}$")]
        [Range(1, 9999999999)]
        public string AccountNo { get; set; }

        [Required]
        public string AccountName { get; set; }

        public string Reference { get; set; }

        [Required]
        [RegularExpression(@"^[0-9]+(\.[0-9]{1,2})?$")]
        [Range(0.01, 100000)]
        public decimal Amount { get; set; }

        public DateTime DateTime { get; set; }
    }
}
