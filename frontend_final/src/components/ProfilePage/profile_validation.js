import * as Yup from 'yup';

export const validation_profile = Yup.object({
    username: Yup.string()
      .test(
        "Account-validation",
        "Account can only contain number and letters and may not start with number",
        function (value) {
            if (/^\d/.test(value)){
                return false;
            }
            //make sure only letters and nums can be accepted and that at least one letter is required
            if (/^(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(value)){
                return true;
            } else {
                return false;
            }
        }
      ),
    email: Yup.string().email('Invalid email address'),
    zipcode: Yup.string().matches(/^\d{5}$/, "Zipcode must be 5 digit"),
    password1: Yup.string(),
    password2: Yup.string()
     .oneOf([Yup.ref('password1'), null], 'Passwords must match')
  })