document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let square_feet = document.getElementById("square_feet").value;
    let bedrooms = document.getElementById("bedrooms").value;
    let bathrooms = document.getElementById("bathrooms").value;
    let age = document.getElementById("age").value;

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            square_feet: parseFloat(square_feet),
            bedrooms: parseInt(bedrooms),
            bathrooms: parseInt(bathrooms),
            age: parseInt(age)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("result").innerText = "Error: " + data.error;
        } else {
            document.getElementById("result").innerText = "Predicted Price: $" + data.predicted_price.toLocaleString();
        }
    })
    .catch(error => {
        document.getElementById("result").innerText = "Error fetching prediction.";
    });
});
