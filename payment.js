document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simulate payment processing
    console.log('Processing payment...', data);

    // Simulate a successful payment response
    setTimeout(() => {
        alert('Payment is not implemented yet. Please make your order via WhatsApp or call the number provided in the contacts.');
        // No redirection, stay on the payment page
    }, 2000);
});
