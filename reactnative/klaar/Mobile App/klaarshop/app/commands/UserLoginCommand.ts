import { CustomCommand } from 'reactotron-core-client';
import { UserActions } from '~/logic/user/UserRedux';
import { store } from '~/store/store';

function makeString(length: number) { // (just for test) - creates random string
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makePhone() { // (just for test) - creates random phone number
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = '3809' + result;
    return result;
}

const LoginUserCommand: CustomCommand = {
    command: 'LoginUser',
    description: 'User: syndicateua@gmail.com',

    handler: () => {
        store.dispatch(
            UserActions.login.request({
                email: 'Admin12345@gmail.com',
                passw:
                    'Admin12345',
                storeToken: true
            }),
        );
    },
};

const LogoutUserCommand: CustomCommand = {
    command: 'LogoutUser',
    description: 'Initiate logout',
    handler: () => {
        store.dispatch(
            UserActions.logout.request(),
        );
    },
};

const RegisterUserCommand: CustomCommand = {
    command: 'RegisterUser',
    description: 'User Register',
    handler: () => {
        let pass = 'Qwerty123456'
        store.dispatch(
            UserActions.register.request({
                ln: makeString(8),
                fn: makeString(8),
                phone: makePhone(),
                passw: { pass },
            }),
        );
    },
};

const CheckTokenRelevanceCommand: CustomCommand = {
    command: 'TokenRelevance',
    description: 'No description provided',
    handler: () => {
        store.dispatch(
            UserActions.tokenRelevanceCheck.request({
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjJkMmVkMmZiMGNjYTA0NDRlMTc1YjciLCJzZXNzaW9uSWQiOiIwZWxlZmdiOXNpanQxOGdiY2xuOHQ1dGRkdnM5MzkiLCJpYXQiOjE1OTY5MjM4MzcsImV4cCI6MTU5NzA5NjYzN30.MyMt39B5Nc0OVQ-FN1g5oGngr3GaFCmTgaARxQNpZ2M'
            }),
        );
    },
};



// const CheckTokenRelevanceCommand: CustomCommand = {
//     command: 'ActivateCode',
//     description: 'No description provided',
//     handler: () => {
//       store.dispatch(
//         UserActions.otp.request({
//             phone: `+38011231231212`,
//             otp: `9252`

//         }),
//       );
//     },
//   };

// const RecoverPasswordCommand: CustomCommand = {
//   command: 'RecoverPassword',
//   description: 'Change users pass',
//   handler: () => {
//     store.dispatch(
//       UserActions.passwordRecovery.request({
//         phone: '+79537117582'
//       }),
//     );
//   },
// };

// const OtpUserCommand: CustomCommand = {
//   command: 'OtpUser',
//   description: '{ smsId: 111111, otp: "111111" }',
//   handler: () => {
//     store.dispatch(UserActions.otp.request({otp: '111111'}));
//   },
// };

// const JwtErrorCommand: CustomCommand = {
//   command: 'JwtError',
//   description: '',
//   handler: () => {
//     jwtLogic.emitter.emit(TOKEN_ERROR);
//   },
// };

// const UserProfileCommand: CustomCommand = {
//   command: 'UserProfile',
//   description: '',
//   handler: () => {
//     store.dispatch(UserActions.profile.request());
//   },
// };

const commands = [
    LoginUserCommand,
    RegisterUserCommand,
    CheckTokenRelevanceCommand,
    // RecoverPasswordCommand,
    LogoutUserCommand
    // OtpUserCommand,
    // JwtErrorCommand,
    // UserProfileCommand,
];
export { commands };

