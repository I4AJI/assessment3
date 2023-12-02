window.addEventListener('load', function () {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // ...
            console.log('User is signed in');
        } else {
            console.log('User is signed out');
            // ...
        }
    });



    document.getElementById("sign-in-google").addEventListener('click', function () {

        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope("email");
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log("Logging secessfully", result.user);
            })
            .catch(function (error) {
                console.log("Logging Failed", error);
            });
        //alert("google clicked");

        document.getElementById("sign-in-google").addEventListener('click', (event) => {
            event.preventDefault();
            loginwithGoogle();
        });


        document.getElementById('sign-in-traditional').addEventListener('click', function () {

            var emailTxt = document.getElementById('account_email').value;
            var passtxt = document.getElementById('account_passwd').value;

            firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
                .then((userCredential) => {
                    var user = userCredential.user;
                    console.log('Loggin sucessfull');
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Loggin fail', error);
                });


        });


        function getPhoneNumberFromUserInput() {
            return "+16042039559"
        }

        document.getElementById('sign-in-phone').
            addEventListener('click', function () {

                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

                const phoneNumber = getPhoneNumberFromUserInput();
                const appVerifier = window.recaptchaVerifier;
                firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;

                        const code = '821028';
                        confirmationResult.confirm(code).then((result) => {
                            // User signed in successfully.
                            const user = result.user;
                            // ...
                        }).catch((error) => {
                            // User couldn't sign in (bad verification code?)
                            // ...
                        });


                        // ...
                    }).catch((error) => {
                        // Error; SMS not sent
                        // ...
                        alert(error)
                    });
            });
    });
});