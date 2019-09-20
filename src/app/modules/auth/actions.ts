/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { IWallet, ILoginCall, ISession, IAccountContext } from 'apla/auth';
import { ICreateWalletCall, IImportWalletCall } from 'apla/auth';
import { IAccount } from 'apla/api';

const actionCreator = actionCreatorFactory('auth');
export const acquireSession = actionCreator.async<ISession, boolean>('ACQUIRE_SESSION');
export const login = actionCreator.async<ILoginCall, { privateKey: string, publicKey: string, session: ISession }, string>('LOGIN');
export const loginGuest = actionCreator.async<void, { privateKey: string, publicKey: string, wallet: IAccountContext, session: ISession }, string>('LOGIN_GUEST');
export const logout = actionCreator.async('LOGOUT');
export const inviteEcosystem = actionCreator<{ ecosystem: string, redirectPage?: string }>('INVITE_ECOSYSTEM');
export const securityProcess = actionCreator<string>('SECURITY_PROCESS');
export const accountProcess = actionCreator<{ password: string, email: string, firstName: string, lastName: string }>('ACCOUNT_PROCESS');
export const loginAccount = actionCreator.async<{ account: IWallet, password: string }, { context: IAccountContext, privateKey: string, publicKey: string, session: ISession }, string>('LOGIN_ACCOUNT');
export const createAccount = actionCreator.async<{ keys: { private: string, public: string }, password: string }, IWallet>('CREATE_ACCOUNT');
export const restoreAccount = actionCreator.async<{ privateKey: string, password: string }, IWallet>('RESTORE_ACCOUNT');
export const createWallet = actionCreator.async<ICreateWalletCall, IWallet, string>('CREATE_WALLET');
export const importWallet = actionCreator.async<IImportWalletCall, IWallet, string>('IMPORT_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const selectWallet = actionCreator<IAccountContext>('SELECT_WALLET');
export const switchWallet = actionCreator<{ ecosystem: string, role: string }>('SWITCH_WALLET');
export const authorize = actionCreator<string>('AUTHORIZE');
export const deauthorize = actionCreator('DEAUTHORIZE');
export const changePassword = actionCreator.async<void, { oldPassword: string, newPassword: string }, string>('CHANGE_PASSWORD');
export const loadWallets = actionCreator.async<void, IAccount[]>('LOAD_WALLETS');
export const loadWallet = actionCreator<IAccount>('LOAD_WALLET');
export const backupAccount = actionCreator('BACKUP_ACCOUNT');