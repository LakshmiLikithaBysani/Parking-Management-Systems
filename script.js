const totalSlots = 5;

let parkingSlots = [
    null,
    null,
    null,
    null,
    null
];


function displaySlots() {

    let parkingArea = document.getElementById("parkingArea");

    parkingArea.innerHTML = "";


    for (let i = 0; i < totalSlots; i++) {

        let slot = document.createElement("div");

        slot.classList.add("slot");


        if (parkingSlots[i] === null) {

            slot.innerHTML = `
                <div class="slot-number">
                    Slot A${i + 1}
                </div>

                <div class="vehicle">
                    Available
                </div>
            `;

        } else {

            slot.classList.add("occupied");

            slot.innerHTML = `
                <div class="slot-number">
                    Slot A${i + 1}
                </div>

                <div class="vehicle">
                    🚗 ${parkingSlots[i].vehicleNumber}
                    <br>
                    ${parkingSlots[i].vehicleType}
                </div>

                <button
                    class="exit-btn"
                    onclick="removeVehicle(${i})">
                    Vehicle Exit
                </button>
            `;
        }


        parkingArea.appendChild(slot);
    }


    updateSummary();
}


function parkVehicle() {

    let vehicleNumber =
        document.getElementById("vehicleNumber").value.trim();

    let vehicleType =
        document.getElementById("vehicleType").value;


    if (vehicleNumber === "" || vehicleType === "") {

        alert("Please enter vehicle details!");

        return;
    }


    // Check duplicate vehicle

    let alreadyParked = parkingSlots.some(
        slot =>
            slot !== null &&
            slot.vehicleNumber.toLowerCase() ===
            vehicleNumber.toLowerCase()
    );


    if (alreadyParked) {

        alert("This vehicle is already parked!");

        return;
    }


    // Find empty slot

    let emptySlot = parkingSlots.findIndex(
        slot => slot === null
    );


    if (emptySlot === -1) {

        alert("Parking is full!");

        return;
    }


    parkingSlots[emptySlot] = {

        vehicleNumber: vehicleNumber,

        vehicleType: vehicleType

    };


    document.getElementById("vehicleNumber").value = "";

    document.getElementById("vehicleType").value = "";


    document.getElementById("message").textContent =
        "✅ Vehicle parked successfully!";


    displaySlots();
}


function removeVehicle(index) {

    parkingSlots[index] = null;


    document.getElementById("message").textContent =
        "🚪 Vehicle exited successfully!";


    displaySlots();
}


function updateSummary() {

    let occupied = parkingSlots.filter(
        slot => slot !== null
    ).length;

    let available = totalSlots - occupied;


    document.getElementById("totalSlots").textContent =
        totalSlots;

    document.getElementById("occupiedSlots").textContent =
        occupied;

    document.getElementById("availableSlots").textContent =
        available;
}


displaySlots();