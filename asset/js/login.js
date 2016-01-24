$(document).ready(function() {


    $('.signup-form #send1').prop('disabled', true);
    $('.signup-form #send1').css('backgroundColor', 'red');
    $('.signup-form #email2').prop('disabled', true); 
    // On active le champs "Email2"
    $('.signup-form #password2').prop('disabled', true); 
    // On active le champs "Email2"
    $('.forgot-form #send3').prop('disabled', true);
    $('.forgot-form #send3').css('backgroundColor', 'red');
    /*************************************************/
    /*              Fonctions de Validation          */
    /*************************************************/

    function validateName(Name) {
            if (Name == '' || Name.length < 3) {
                return false;
            } else {
                var filter = /^([a-zA-Z]{4,25})+([0-9]{0,15})$/;
                return filter.test(Name);
            }

        } //validateName()

    function validateEmail(Email) {
            if (Email == '' || Email.length < 7) {
                return false;
            } else {
                var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                return filter.test(Email);
            }
        } // validateEmail()

    /*************************************************/
    /*              Validation Check                 */
    /*************************************************/
    var B = {
        validerall: false,
        validerPseudo: false,
        validerEmail: false,
        validerEmail2: false,
        validerPassword: false,
        validerPassword2: false
    }

    function valider() {
            console.log('Pseudo :' + B.validerPseudo);
            console.log('Email :' + B.validerEmail);
            console.log('Email2 :' + B.validerEmail2);
            console.log('Password :' + B.validerPassword);
            console.log('PassWord2 :' + B.validerPassword2);
            if (B.validerPseudo && B.validerEmail && B.validerEmail2
                 && B.validerPassword && B.validerPassword2) {
                $('.signup-form #send1').css('backgroundColor', 'green');
                $('#send1').prop('disabled', false);
                B.validerall = true;
            } else {
                B.validerall = false;
                $('.signup-form #send1').css('backgroundColor', 'red');
                $('#send1').prop('disabled', true);
            }

        } //valider()

    /*************************************************/
    /*              Verification Pseudo              */
    /*************************************************/
    function validerPseudo1() {
            var pseudo = $('.signup-form #pseudo1');
            if (validateName(pseudo.val())) {
                $.ajax({
                    type: 'GET',
                    url: window.ress.traitement + 'isInDb.php',
                    data: {
                        nom: 'pseudo',
                        valeur: pseudo.val()
                    },
                    success: function(result) {
                        if (result) {
                            $('#pseudo1').css('border', '2px solid red');
                            B.validerPseudo = false;
                        } else {
                            $('#pseudo1').css('border', '2px solid green');
                            B.validerPseudo = true;
                            $( "#email1" ).parent().addClass('is-focused has-label');
                        }
                    }
                });
            } else {
                $('#pseudo1').css('border', '2px solid red');
                B.validerPseudo = false;
                $( "#email1" ).parent().removeClass('is-focused has-label');
            }
            valider();
        } // validerPseudo()

    function validerEmail1() {
            /*************************************************/
            /*              Verification Email               */
            /*************************************************/
            var email = $('.signup-form #email1');

            if (validateEmail(email.val())) {
                $.ajax({
                    type: 'GET',
                    url: window.ress.traitement + 'isInDb.php',
                    data: {
                        nom: 'email',
                        valeur: email.val()
                    },
                    success: function(result) {
                        if (result) {
                            $('#email1').css('border', '2px solid red');
                            // On desactive le champs "Email2"
                            $('#email2').prop('disabled', true);                            
                            B.validerEmail = false;
                        } else {
                            $('#email1').css('border', '2px solid green');
                            // On active le champs "Email2"
                            $('#email2').prop('disabled', false);
                            $( "#email2" ).parent().addClass('is-focused has-label');                        
                            B.validerEmail = true;
                        }
                    }
                });
            } else {
                $('#email1').css('border', '2px solid red');
            }
            valider();
        } // validerEmail1()

    function validerEmailEmail() {
            var email = $('.signup-form #email1');
            var email2 = $('.signup-form #email2');
            /*************************************************/
            /*              Verification Email2              */
            /*************************************************/
            if (email2.val() != '') {
                if (email2.val() === email.val()) {
                    $('#email2').css('border', '2px solid green');
                    B.validerEmail2 = true;
                    console.log('Email 2 : ' + email2.val());
                    $( "#password1" ).parent().addClass('is-focused has-label');
                } else {
                    $('#email2').css('border', '2px solid red');
                    B.validerEmail2 = false;
                    $( "#password1" ).parent().removeClass('is-focused has-label');
                }
            }

            valider();
        } //validerEmail2()

    function validerPassword1() {
            /*************************************************/
            /*              Verification PassWord            */
            /*************************************************/
            var password = $('.signup-form #password1');
            if (password.val() == '' || password.val().length < 6) {
                $('#password1').css('border', '2px solid red');
                // On desactive le champs "Password2"
                $('#password2').prop('disabled', true);
                B.validerPassword = false;
            } else {
                $('#password1').css('border', '2px solid green');
                B.validerPassword = true;
                // On active le champs "Password2"
                $('#password2').prop('disabled', false);
                $( "#password2" ).parent().addClass('is-focused has-label');
            }

            valider();
        } //validerPassword1()

    function validerPasswordPassword() {
            /*************************************************/
            /*              Verification PassWord2           */
            /*************************************************/
            var password = $('.signup-form #password1');
            var password2 = $('.signup-form #password2');
            if (password2.val() != '') {
                if (password2.val() != password.val()) {
                    $('#password2').css('border', '2px solid red');
                    B.validerPassword2 = false;
                } else {
                    $('#password2').css('border', '2px solid green');
                    B.validerPassword2 = true;
                }

            }

            valider();
        } //validerPassword2()

    function validerEmailRecup() {
            /*************************************************/
            /*              Verification Email               */
            /*************************************************/
            var email = $('#email3');

            if (validateEmail(email.val())) {
                $.ajax({
                    type: 'GET',
                    url: window.ress.traitement + 'isInDb.php',
                    data: {
                        nom: 'email',
                        valeur: email.val()
                    },
                    success: function(result) {
                        if (!result) {
                            $('#email3').css('border', '2px solid red');
                            $('.forgot-form #send3')
                                .prop('disabled', true);
                            $('.forgot-form #send3')
                                .css('backgroundColor', 'red');
                        } else {
                            $('#email3').css('border', '2px solid green');
                            $('.forgot-form #send3')
                                .css('backgroundColor', 'green');
                            $('.forgot-form #send3')
                                .prop('disabled', false);
                        }
                    }
                });
            } else {
                $('#email3').css('border', '2px solid red');
            }
        } // validerEmailRecup()

    $('#pseudo1').focus().keyup(function() {
        validerPseudo1();
    }); // keyup()
    $('#email1').focus().keyup(function() {
        validerEmail1();
    }); // keyup()
    $('#email2').focus().keyup(function() {
        validerEmailEmail();
    }); // keyup()
    $('#password1').focus().keyup(function() {
        validerPassword1();
    }); // keyup()
    $('#password2').focus().keyup(function() {
        validerPasswordPassword();
    }); // keyup()

    $('#email3').focus().keyup(function() {
        validerEmailRecup();
    });
    /*
        Form Submit
    */
    $("form").submit(OnSubmit);

    function OnSubmit(data) {
            $.ajax({
                type: $(this).attr("method"),
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: OnSuccess
            });
            return false;
        } // OnSubmit()

    function OnSuccess(result) {
            console.log(result);
            if (result == "Sign") {
                window.location = "http://51.255.41.18/Aurora/index.php?page=login";
            }
            if (result.type == "Login") {
                if (result.error != "Ok") {
                    alert(result.error);
                } else {
                    window.location = "http://51.255.41.18/Aurora/index.php?page=home";
                }
            }
            if (result.type == "Forgot") {
                if (result.msg != '') {
                    alert(result.msg);
                } else {
                    window.location = "http://51.255.41.18/Aurora/index.php?page=home";
                }
            }
        } // OnSuccess()

});