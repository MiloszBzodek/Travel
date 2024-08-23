// Po załadowaniu całej treści dokumentu
document.addEventListener("DOMContentLoaded", function () {
    // Pobranie elementów formularza i powiązanych elementów
    const addActivityButton = document.getElementById("add-activity");
    const activityList = document.getElementById("activity-list");
    const activityInput = document.getElementById("activity-input");
    const customAlert = document.getElementById("custom-alert");
    const closeAlertButton = document.getElementById("close-alert");
    const alertMessage = document.getElementById("alert-message");
    const submitButton = document.getElementById("submit");
    const resetButton = document.getElementById("reset");

    // Funkcja wyświetlająca niestandardowy alert
    function showAlert(message) {
        alertMessage.textContent = message; // Ustawienie treści alertu
        customAlert.style.display = "flex"; // Pokaż modal z wyśrodkowaniem
        console.log("Alert wyświetlony:", customAlert.style.display); // Debugowanie
    }

    // Funkcja zamykająca niestandardowy alert
    closeAlertButton.addEventListener("click", function () {
        console.log("Przycisk zamykania kliknięty"); // Debugowanie
        customAlert.style.display = "none"; // Ukryj modal
        console.log("Po zamknięciu alertu:", customAlert.style.display); // Debugowanie
    });

    // Dodawanie aktywności do listy
    addActivityButton.addEventListener("click", function () {
        const activityText = activityInput.value.trim(); // Pobranie i oczyszczenie wartości z pola tekstowego
        if (activityText) {
            const listItem = document.createElement("li"); // Tworzenie nowego elementu listy
            listItem.innerHTML = `
                ${activityText}
                <button type="button" onclick="this.parentElement.remove()">Usuń</button>
            `; // Dodawanie tekstu i przycisku do elementu listy
            activityList.appendChild(listItem); // Dodawanie elementu listy do listy aktywności
            activityInput.value = ""; // Czyszczenie pola tekstowego
        }
    });

    // Obsługa wysyłania formularza
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Zatrzymanie domyślnego działania formularza (wysłanie)

        // Pobranie wartości z pól formularza
        const destination = document.getElementById("destination").value;
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;      

        // Walidacja danych formularza
        if (destination === "") {
            showAlert("Podaj cel podróży!"); // Wyświetlenie alertu, jeśli cel podróży jest pusty
            return; // Zatrzymanie dalszego działania formularza
        }

        if (startDate === "") {
            showAlert("Podaj datę rozpoczęcia podróży!"); // Wyświetlenie alertu, jeśli data rozpoczęcia jest pusta
            return; // Zatrzymanie dalszego działania formularza
        }

        if (endDate === "") {
            showAlert("Podaj datę zakończenia podróży!"); // Wyświetlenie alertu, jeśli data zakończenia jest pusta
            return; // Zatrzymanie dalszego działania formularza
        }

        // Sprawdzanie, czy data zakończenia nie jest przed datą rozpoczęcia
        if (new Date(endDate) < new Date(startDate)) {
            showAlert("Data zakończenia nie może być przed datą rozpoczęcia!"); // Wyświetlenie alertu, jeśli data zakończenia jest wcześniejsza
            return; // Zatrzymanie dalszego działania formularza
        }

        // Dodawanie nowego elementu do listy podróży
        const itineraryList = document.getElementById("itinerary-list");
        const itineraryItem = document.createElement("li");
        itineraryItem.classList.add("activity-item");
        itineraryItem.innerHTML = `
            <h3 style="margin: 10px;">${destination}</h3>
            <p style="margin: 10px;"><strong>Data:</strong> ${startDate} - ${endDate}</p>
            <ul>${Array.from(activityList.children).map(item => `<li>${item.firstChild.textContent}</li>`).join("")}</ul>
            <button onclick="this.parentElement.remove()">Usuń</button>
        `; // Dodawanie danych z formularza oraz listy aktywności do elementu listy

        itineraryList.appendChild(itineraryItem); // Dodawanie nowego elementu listy do listy podróży
    });

    // Obsługa resetowania formularza
    resetButton.addEventListener("click", function () {
        // Czyszczenie formularza i listy aktywności
        document.getElementById("destination").value = ""; // Czyszczenie pola celu podróży
        document.getElementById("start-date").value = ""; // Czyszczenie pola daty rozpoczęcia
        document.getElementById("end-date").value = ""; // Czyszczenie pola daty zakończenia
        activityList.innerHTML = ""; // Usuwanie wszystkich elementów z listy aktywności
    });
});
