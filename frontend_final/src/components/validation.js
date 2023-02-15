import * as Yup from 'yup';

export const validation = Yup.object({
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
      )
      .required('Required'),
    displayName: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/, "Phone number is format 000-000-0000").required('Required'),
    dob: Yup.date().test(
        "is18",
        "You must be 18 to regsiter",
        function (value) {
            let date = new Date(value);
            const date18YearsAgo = new Date();
            date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);
            return date <=date18YearsAgo;
        }
    ).required("Required"),
    zipcode: Yup.string().matches(/^\d{5}$/, "Zipcode must be 5 digit").required("Required"),
    password1: Yup.string().required('Password is required'),
    password2: Yup.string()
     .oneOf([Yup.ref('password1'), null], 'Passwords must match').required("Password is required")
  })