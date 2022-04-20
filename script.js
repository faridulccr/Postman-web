{
    // get lelement from html
    let customRadio = document.getElementById('custom');
    let jsonRadio = document.getElementById('jsonRadio');
    let parameterBox = document.getElementById('parameterBox');

    // event listener for json radio
    jsonRadio.addEventListener('click', () => {
        jsonBox.style = "display: block";
        parameterBox.style = "display: none";
    });

    // event listener for custom radio
    customRadio.addEventListener('click', () => {
        parameterBox.style = "display: block";
        jsonBox.style = "display: none";
    });

    // event listener for plus button
    let plusBtn = document.getElementById('plusBtn');
    let extraParamDiv = document.getElementById('extraParamDiv');
    plusBtn.addEventListener('click', () => {
        extraParamDiv.appendChild(addParameter());
    });

    // this function is for add parameter
    let countPara = 1;
    function addParameter() {
        let div = document.createElement('div');
        countPara++;
        div.innerHTML = `<div class="row mb-3">
                            <label for="url" class="col-sm-2 col-form-label">Parameter ${countPara}</label>
                            <div class="col">
                                <input type="text" id="key${countPara}" class="form-control" placeholder="Enter Key" aria-label="key">
                            </div>
                            <div class="col">
                                <input type="text" id="value${countPara}" class="form-control" placeholder="Enter Value"
                                    aria-label="value">
                            </div>
                            <div class="col-1">
                                <button id="minus${countPara}" onclick="minusPara(this.id)" type="button" class="btn btn-primary">-</button>
                            </div>
                        </div>`;
        return div.firstElementChild;
    };

    // this function is for remove parameter
    function minusPara(id) {
        let btnDiv = document.getElementById(id).parentElement;
        btnDiv.parentElement.remove();
    };

    // event lister for submit button
    let submitBtn = document.getElementById('submit');
    let responseBox = document.getElementById('responseBox');

    submitBtn.addEventListener('click', () => {
        responseBox.value = `Please wait....,  Fetching response....`;
    
        // Fetch all the values that user has entered
        let url = document.getElementById('urlField').value;
        let requestType = document.querySelector("input[name='requestType']:checked"); //access GET or POST
        let contentType = document.querySelector("input[name='contentType']:checked"); // access JSON or custom Parameters
        let data;

        // If user has used customParameter option instead of json, collect all the parameters in an object.
        if (contentType.value == 'customParameter'){
            data = {};
            for (i = 1; i <= countPara; i++) {
                if (document.getElementById(`key${i}`)) {
                    let key = document.getElementById(`key${i}`).value;
                    let value = document.getElementById(`value${i}`).value;
                    data[key] = value;
                }
            }
            data = JSON.stringify(data); // corvert data obj into json and assign to data
        }else {
            data = document.getElementById('jsonBox').value;
        };

        // If the request type is post, invoke fetch api to create a post request
        if(requestType.value == 'POST'){
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
            })
            .then(res => res.text())
            .then(text => responseBox.value = text)
            .catch(err => responseBox.value = err);
        }else {
            fetch(url, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(text => responseBox.value = text)
            .catch(error => responseBox.value = error);
        };
    });

}