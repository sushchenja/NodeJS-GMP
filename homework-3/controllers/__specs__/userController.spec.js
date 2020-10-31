import UserController from '../userController.js';
import { userService, userServiceWithServiceError, userServiceWithEmptyResult } from '../../services/__mocks__/userService.js';

const ERROR = 'error';
const INVALID_DATA = 'invalidData';
const USER_DATA = 'userData';

describe('UserController', () => {
    const controller = new UserController(userService);
    const controllerWithEmptyResult = new UserController(userServiceWithEmptyResult);
    const controllerWithServiceError = new UserController(userServiceWithServiceError);

    const setupResponse = () => ({
        json: jest.fn()
    });
    const setupNext = () => jest.fn();

    describe('addNewUser', () => {
        describe('when valid body data is provided', () => {
            test('should call res.json with user entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.addNewUser({ body: USER_DATA }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(USER_DATA);
            });
        });

        describe('when user is not created due to invalid data is provided', () => {
            test('should call next callback with "Failed to create user" 500 error', async () => {
                const requestData = { body: INVALID_DATA };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.addNewUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Failed to create user');
                expect(error.statusCode).toBe(500);
                expect(error.controllerData.arguments.user).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addNewUser');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = { body: ERROR };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.addNewUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.user).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addNewUser');
                expect(error instanceof Error).toBe(true);
            });
        });
    });

    describe('getAllUsers', () => {
        describe('when valid body data is provided', () => {
            test('should call res.json with user entities', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.getAllUsers({ query: {
                    login: USER_DATA,
                    limit: USER_DATA
                } }, res, next);
                expect(res.json).toHaveBeenLastCalledWith([USER_DATA]);
            });
        });

        describe('when users are not found due invalid data is provided', () => {
            test('should call next callback with "No users containing userData in login" 404 error', async () => {
                const requestData = {
                    query: {
                        login: INVALID_DATA,
                        limit: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.getAllUsers(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('No users containing invalidData in login');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.login).toBe(requestData.query.login);
                expect(error.controllerData.arguments.limit).toBe(requestData.query.limit);
                expect(error.controllerData.method).toBe('getAllUsers');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = { query: {
                    login: ERROR,
                    limit: ERROR
                } };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.getAllUsers(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.login).toBe(requestData.query.login);
                expect(error.controllerData.arguments.limit).toBe(requestData.query.limit);
                expect(error.controllerData.method).toBe('getAllUsers');
                expect(error instanceof Error).toBe(true);
            });
        });
    });

    describe('updateUser', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with user entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.updateUser({
                    params: {
                        id: USER_DATA
                    },
                    body: USER_DATA
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(USER_DATA);
            });
        });

        describe('when an user is not found due to invalid data is provided', () => {
            test('should call next callback with "User with ID invalidData is not found" 404 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    },
                    body: INVALID_DATA
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.updateUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('User with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.userUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('updateUser');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = {
                    params: {
                        id: ERROR
                    },
                    body: ERROR
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.updateUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.userUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('updateUser');
                expect(error instanceof Error).toBe(true);
            });
        });
    });

    describe('getUser', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with user entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.getUser({
                    params: {
                        id: USER_DATA
                    }
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(USER_DATA);
            });
        });

        describe('when an user is not found due to invalid data is provided', () => {
            test('should call next callback with "User with ID invalidData is not found" 404 error on invalid data', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.getUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('User with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('getUser');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = {
                    params: {
                        id: ERROR
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.getUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('getUser');
                expect(error instanceof Error).toBe(true);
            });
        });
    });

    describe('removeUser', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with user entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.removeUser({
                    params: {
                        id: USER_DATA
                    }
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(USER_DATA);
            });
        });

        describe('when an user is not found due to invalid data is provided', () => {
            test('should call next callback with "User with ID invalidData is not found" 404 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.removeUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('User with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('removeUser');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = {
                    params: {
                        id: ERROR
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.removeUser(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('removeUser');
                expect(error instanceof Error).toBe(true);
            });
        });
    });
});
