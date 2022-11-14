function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const locationLabel = document.getElementById('location');
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const location = locationLabel.value;

    submitBtn.addEventListener('click', getWeather);

    async function getWeather(){
        const response = await fetch(url);
        const body = await response.json();
        const foundLocation = '';
        Object.entries(body).forEach(body => {
            const content = body[1]
            if(location == content.name){
                foundLocation = content.name;
            }
            debugger;
        });
        console.log(foundLocation);
    }
}

attachEvents();