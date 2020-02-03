// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    InteractionManager,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {preventDoubleTap} from 'app/utils/tap';
import {t} from 'app/utils/i18n';
import Button from 'react-native-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GlobalStyles} from 'app/styles';
export default class Login extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        
    }

    componentWillUnmount() {
    }

    
    blur = () => {
        this.loginId.blur();
        this.passwd.blur();
        Keyboard.dismiss();
    };

    preSignIn = preventDoubleTap(() => {
        console.log('preSignIn');
        this.setState({error: null, isLoading: true});
        Keyboard.dismiss();
        console.log('preSignIn 222');
        InteractionManager.runAfterInteractions(async () => {
            console.log('preSignIn 333');
            if (!this.props.loginId) {
                t('login.noEmail');
                t('login.noEmailLdapUsername');
                t('login.noEmailUsername');
                t('login.noEmailUsernameLdapUsername');
                t('login.noLdapUsername');
                t('login.noUsername');
                t('login.noUsernameLdapUsername');

                // it's slightly weird to be constructing the message ID, but it's a bit nicer than triply nested if statements
                let msgId = 'login.no';
                if ('true' === 'true') {
                    msgId += 'Email';
                }
                // if (this.props.config.EnableSignInWithUsername === 'true') {
                //     msgId += 'Username';
                // }
                // if (this.props.license.IsLicensed === 'true' && this.props.config.EnableLdap === 'true') {
                //     msgId += 'LdapUsername';
                // }

                this.setState({
                    isLoading: false,
                    error: {
                        intl: {
                            id: msgId,
                            defaultMessage: '',
                            values: {
                                ldapUsername: this.props.config.LdapLoginFieldName 
                               
                            },
                        },
                    },
                });
                return;
            }

            if (!this.props.password) {
                this.setState({
                    isLoading: false,
                    error: {
                        intl: {
                            id: t('login.noPassword'),
                            defaultMessage: 'Please enter your password',
                        },
                    },
                });
                return;
            }

            this.signIn();
        });
    });

    scheduleSessionExpiredNotification = () => {
        const {intl} = this.context;
        const {actions} = this.props;

        actions.scheduleExpiredNotification(intl);
    };

    signIn = () => {
        const {actions, loginId, loginRequest, password} = this.props;
        console.log('signIn', loginId, password);
        if (loginRequest.status !== RequestStatus.STARTED) {
            actions.login(loginId.toLowerCase(), password).then(this.checkLoginResponse);
        }
    };

    checkLoginResponse = (data) => {
        if (mfaExpectedErrors.includes(data?.error?.server_error_id)) { // eslint-disable-line camelcase
            this.goToMfa();
        }
    };

    createLoginPlaceholder() {
        return '电子邮件 或 用户名';
    }

    getLoginErrorMessage = () => {
        return (
            this.getServerErrorForLogin() ||
            this.state.error
        );
    };

    getServerErrorForLogin = () => {
        const {error} = this.props.loginRequest;
        if (!error) {
            return null;
        }
        const errorId = error.server_error_id;
        if (!errorId) {
            return error.message;
        }
        if (mfaExpectedErrors.includes(errorId) && !getMfaPreflightDone()) {
            return null;
        }
        if (
            errorId === 'store.sql_user.get_for_login.app_error' ||
            errorId === 'ent.ldap.do_login.user_not_registered.app_error'
        ) {
            return {
                intl: {
                    id: t('login.userNotFound'),
                    defaultMessage: "We couldn't find an account matching your login credentials.",
                },
            };
        } else if (
            errorId === 'api.user.check_user_password.invalid.app_error' ||
            errorId === 'ent.ldap.do_login.invalid_password.app_error'
        ) {
            return {
                intl: {
                    id: t('login.invalidPassword'),
                    defaultMessage: 'Your password is incorrect.',
                },
            };
        }
        return error.message;
    };

    loginRef = (ref) => {
        this.loginId = ref;
    };

    passwordRef = (ref) => {
        this.passwd = ref;
    };

    passwordFocus = () => {
        this.passwd.focus();
    };

    orientationDidChange = () => {
        this.scroll.scrollToPosition(0, 0, true);
    };

    scrollRef = (ref) => {
        this.scroll = ref;
    };

    forgotPassword = () => {
        const {intl} = this.context;
        const screen = 'ForgotPassword';
        const title = "password_form.title";

        goToScreen(screen, title);
    }

    render() {
        const isLoading = this.state.isLoading;

        let proceed;
        if (isLoading) {
            proceed = (
                <ActivityIndicator
                    animating={true}
                    size='small'
                />
            );
        } else {
            const additionalStyle = {};
            

            const additionalTextStyle = {};
            

            proceed = (
                <Button
                    onPress={this.preSignIn}
                    containerStyle={[GlobalStyles.signupButton, additionalStyle]}
                >登录
                    {/* <FormattedText
                        id='login.signIn'
                        defaultMessage='Sign in'
                        style={[GlobalStyles.signupButtonText, additionalTextStyle]}
                    /> */}
                </Button>
            );
        }

        let forgotPassword;
        if ('true' === 'true' || this.props.config.EnableSignInWithUsername === 'true') {
            forgotPassword = (
                <Button
                    onPress={this.forgotPassword}
                    containerStyle={[style.forgotPasswordBtn]}
                >
                    {/* <FormattedText
                        id='login.forgot'
                        defaultMessage='I forgot my password'
                        style={style.forgotPasswordTxt}
                    /> */}
                </Button>
            );
        }

        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={this.blur}>
                    <KeyboardAwareScrollView
                        ref={this.scrollRef}
                        style={style.container}
                        contentContainerStyle={[style.innerContainer]}
                        keyboardShouldPersistTaps='handled'
                        enableOnAndroid={true}
                    >
                        {/* <Image
                            source={require('assets/images/logo.png')}
                        /> */}
                        <View>
                            <Text style={GlobalStyles.header}>
                                {/* {this.props.config.SiteName} */}
                            </Text>
                            {/* <FormattedText
                                style={GlobalStyles.subheader}
                                id='web.root.signup_info'
                                defaultMessage='All team communication in one place, searchable and accessible anywhere'
                            /> */}
                        </View>
                        <TextInput
                            ref={this.loginRef}
                            value={this.props.loginId}
                            style={GlobalStyles.inputBox}
                            placeholder={this.createLoginPlaceholder()}
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyType='next'
                            underlineColorAndroid='transparent'
                            onSubmitEditing={this.passwordFocus}
                            blurOnSubmit={false}
                            disableFullscreenUI={true}
                        />
                        <TextInput
                            ref={this.passwordRef}
                            value={this.props.password}
                            style={GlobalStyles.inputBox}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            returnKeyType='go'
                            onSubmitEditing={this.preSignIn}
                            disableFullscreenUI={true}
                            placeholder='密码'
                        />
                        {proceed}
                        {forgotPassword}
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 50,
    },
    forgotPasswordBtn: {
        borderColor: 'transparent',
        marginTop: 15,
    },
    forgotPasswordTxt: {
        color: '#2389D7',
    },
});
