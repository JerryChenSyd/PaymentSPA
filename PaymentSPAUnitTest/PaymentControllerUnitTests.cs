using PaymentSPA.Controllers;
using PaymentSPA.Repositories.PaymentRepository;
using PaymentSPA.Models;
using PaymentSPA.DAL;
using System;
using Xunit;
using Moq;
using Microsoft.Extensions.Logging;

namespace PaymentAppUnitTest
{
    public class PaymentControllerUnitTests
    {
        [Fact]
        public void Create_ReturnsFalse_GivenInvalidModel()
        {
            // Arrange & Act
            var mockRepo = new Mock<IPaymentRepository>();
            var mockLogRepo = new Mock<ILogger<PaymentController>>();
            var controller = new PaymentController(mockRepo.Object, mockLogRepo.Object);
            controller.ModelState.AddModelError("error", "some error");

            // Act
            bool result = controller.Post(null);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Create_ReturnsTrue__GivenValidModel()
        {
            // Arrange
            var mockRepo = new Mock<IPaymentRepository>();
            var mockLogRepo = new Mock<ILogger<PaymentController>>();
            var controller = new PaymentController(mockRepo.Object, mockLogRepo.Object);
            var newPayment = new Payment()
            {
                BSB = "112789",
                AccountNo = "123456789",
                AccountName = "Jerry",
                Reference = "Books",
                Amount = 100
            };
            mockRepo.Setup(repo => repo.AddNewPayment(newPayment)).Returns(true);
            // Act
            bool result = controller.Post(newPayment);
            // Assert
            mockRepo.Verify(repo => repo.AddNewPayment(newPayment));
            Assert.True(result);

        }

    }
}
