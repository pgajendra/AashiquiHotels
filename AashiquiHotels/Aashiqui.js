


function openCity(evt, cityName, requiredId) {
    var flagData = { flag: true };;
    if (cityName != "basic_details") {
        flagData = validateForm(evt, cityName, requiredId);
    }
    if (flagData.flag) {

        let element = document.querySelector('.tabbtnstyle');
        if (element != null) {
            element.disabled = false;
        }

        // Check if the element exists
        if (element) {
            // Remove the 'tabbtnstyle' class from the element
            element.classList.remove('tabbtnstyle');
        }
        document.getElementById(cityName + "_info").classList.add('tabbtnstyle');
        // document.getElementById(cityName+"_info").style="background-color: #0c8785;color: #ffffff;";
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";


    } else {
        Swal.fire({
            title: flagData.altTitle,
            //text: flagData.errorMsg,
            html: `<h3>` + flagData.errorMsg + `</h3>`,
            icon: "error"
        });
    }



}

function uploadedNewEmployee() {
    alert("Added new Employee");
}


function validateForm(event, cityName, requiredId) {
    // Prevent form submission (default action)
    event.preventDefault();

    // Get all required fields (those with the red star)
    //const requiredFields = document.querySelectorAll('.required-star');
    const requiredFields = document.querySelectorAll('#' + requiredId + ' .required-star');

    let isValid = true;
    let missingFields = [];
    var flag = true;
    var error;
    var alertTitle = "Error";
    document.querySelectorAll(".error-message").forEach(element => {
        element.remove();
    });
    requiredFields.forEach(function (star) {
        //const field = star.parentElement.querySelector('input, select');
        const label = star.parentElement; // The parent <div> containing the label and input
        const inputId = label.getAttribute("for"); // Get the 'for' attribute of the label
        const field = document.getElementById(inputId);
        // Check if the field is empty
        if (!field.value) {
            isValid = false;


            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'This field is required.';
            errorMessage.className = 'error-message'; // Add a class for styling
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '12px';
            errorMessage.style.marginTop = '4px';
            flag = false;
            error = "Fill all required fields... !";
            alertTitle = "Required !!";
            // Append the error message below the input field
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                if (field.id == 'password' || field.id == 'confirm_password') {
                    field.parentElement.insertAdjacentElement('afterend', errorMessage);
                } else {
                    field.insertAdjacentElement('afterend', errorMessage);
                }


            }
            //missingFields.push(field.previousElementSibling.textContent.trim());
        }
    });
    if (flag) {
        document.querySelectorAll(".error-message").forEach(element => {
            element.remove();
        });
        if (cityName == "address") {
            var passwordValue = document.getElementById('password').value;
            var confirmPasswordValue = document.getElementById('confirm_password').value;
            if (passwordValue != confirmPasswordValue) {
                flag = false;
                error = "Password Mismatch...!";
                alertTitle = "Mismatch !";
            }
        }
    }
    // If any required fields are empty, show an error message
    // if (!isValid) {
    //     alert("Please fill out the following required fields: \n\n" + missingFields.join('\n'));
    // } else {
    //     // If all fields are valid, proceed to the next step
    //     openCity(event, 'address');
    // }
    return { 'flag': flag, 'errorMsg': error, 'altTitle': alertTitle };
}


function showPasssword(id) {
    const passwordField = document.getElementById(id);
    const icon = event.target; //this.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text"; // Change input type to text
        icon.classList.remove("fa-eye"); // Update icon
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password"; // Change input type to password
        icon.classList.remove("fa-eye-slash"); // Update icon
        icon.classList.add("fa-eye");
    }
}

function addNewMenu(event) {

    clearnewItemData("test");
    const allTabs = document.querySelectorAll(`#menuTabs .nav-item`);
    allTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll(`#menuTabContent .tab-pane`).forEach(content => content.classList.remove('show', 'active', 'in'));

    document.getElementById("addNewItem").classList.add('show', 'in', 'active');
    document.getElementById("updateitembtn").disabled = true;
    document.getElementById("saveitembtn").disabled = false;

}



function showImage(event) {
    const imageInput = document.getElementById('imageUpload');
    const previewImage = document.getElementById('previewImage');
    const file = this.event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Set the image preview
        };
        reader.readAsDataURL(file);
    }
}

function savenewItemData(id) {
    console.log("savenewItemData");

    var itemsList = newItemsInfo();
    itemsList.forEach((item) => {
        console.log(item.value);
    })


}

function clearnewItemData(id) {

   

    let timerInterval;
    Swal.fire({
        title: "Clear Data In!",
        html: "I will close in <b></b> milliseconds.",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            var itemsList = newItemsInfo();
            itemsList.forEach((item) => {
                item.value = '';
            })
        
        }
    });

   
}

function uploadDataToDb(id) {
    console.log("uploadDataToDb");

    var itemsList = newItemsInfo();
    itemsList.forEach((item) => {
        console.log(item.value);
    })
    Swal.fire({
        title: 'uploadDataToDb' + id,
        //text: flagData.errorMsg,
        html: `<h3>call api</h3>`,
        icon: "error"
    });

}

function newItemsInfo() {
    var listOfOtems = [];
    listOfOtems.push(document.getElementById("itemName"));
    listOfOtems.push(document.getElementById("itemPrice"));
    listOfOtems.push(document.getElementById("itemcategory"));
    listOfOtems.push(document.getElementById("imageUpload"));
    listOfOtems.push(document.getElementById("itemdescription"));
    return listOfOtems;

}

function firebaseConfig() {
    const firebaseConfig = {

 		


    
};

return firebaseConfig;
}
