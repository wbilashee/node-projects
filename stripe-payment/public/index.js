const purchase = [
    { id: "1", name: "t-shirt", price: 1999 },
    { id: "2", name: "shoes", price: 4999 },
];
const total_amount = 10998;
const shipping_fee = 1099;

var stripe = Stripe(
    "pk_test_51MAfiNBaY75D4B4O2es7rutZYJ2dnOaGIntxp8MF6WYHWQdQqs5WQlu4T3Eq3IX6dxpp2ddnZjvcXK5TcyeQiOzF00gjkF27F1", {
    stripeAccount: "acct_1MAfiNBaY75D4B4O",
});

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
fetch("/stripe", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ purchase, total_amount, shipping_fee }),
})
    .then(function (result) {
        return result.json();
    })
    .then(function (data) {
        var elements = stripe.elements();

        var style = {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                fontFamily: "Arial, sans-serif",
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        };

        var card = elements.create("card", { style: style });
        card.mount("#card-element");

        card.on("change", function (event) {
            document.querySelector("button").disabled = event.empty;
            document.querySelector("#card-error").textContent = event.error
                ? event.error.message
                : "";
        });

        var form = document.getElementById("payment-form");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            payWithCard(stripe, card, data.clientSecret);
        });
    });

var payWithCard = function (stripe, card, clientSecret) {
    loading(true);
    stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
            },
        })
        .then(function (result) {
            if (result.error) {
                showError(result.error.message);
            } else {
                orderComplete(result.paymentIntent.id);
            }
        });
};

var orderComplete = function (paymentIntentId) {
    loading(false);
    document
        .querySelector(".result-message a")
        .setAttribute(
            "href",
            "https://dashboard.stripe.com/test/payments/" + paymentIntentId
        );
    document.querySelector(".result-message").classList.remove("hidden");
    document.querySelector("button").disabled = true;
};

var showError = function (errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
        errorMsg.textContent = "";
    }, 4000);
};

var loading = function (isLoading) {
    if (isLoading) {
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
};