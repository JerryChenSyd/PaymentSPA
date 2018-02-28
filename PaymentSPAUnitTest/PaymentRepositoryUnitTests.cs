using Moq;
using PaymentSPA.Repositories.PaymentRepository;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using PaymentSPA.DAL;
using PaymentSPA.Models;

namespace PaymentAppUnitTest
{
    public class PaymentRepositoryUnitTests
    {
        [Fact]
        public void AddNewPayment_ReturnsTrue_GivenCanSaveFile()
        {
            // Arrange & Act
            var mockRepo = new Mock<IPaymentAppDataContext>();
            IPaymentRepository paymentRepository = new PaymentRepository(mockRepo.Object);
            var newPayment = new Payment();
            mockRepo.Setup(repo => repo.WriteFile(newPayment)).Returns(true);

            // Act
            bool result = paymentRepository.AddNewPayment(newPayment);

            // Assert
            Assert.True(result);
        }
    }
}
