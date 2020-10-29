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

        describe('when invalid data is provided', () => {
            const requestData = { body: INVALID_DATA };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.addNewUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Failed to create user" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Failed to create user');
            });

            test('error should have 500 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(500);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.user).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('addNewUser');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = { body: ERROR };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.addNewUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on service error', async () => {
                const error = await getServiceError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Service error" message', async () => {
                const error = await getServiceError();
                expect(error.message).toBe('Service error');
            });

            test('error should contain method arguments', async () => {
                const error = await getServiceError();
                expect(error.controllerData.arguments.user).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('addNewUser');
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

        describe('when invalid data is provided', () => {
            const requestData = {
                query: {
                    login: INVALID_DATA,
                    limit: INVALID_DATA
                }
            };

            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.getAllUsers(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "No users containing userData in login" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('No users containing invalidData in login');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.login).toBe(requestData.query.login);
                expect(error.controllerData.arguments.limit).toBe(requestData.query.limit);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('getAllUsers');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = { query: {
                login: ERROR,
                limit: ERROR
            } };

            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.getAllUsers(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on service error', async () => {
                const error = await getServiceError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Service error" message', async () => {
                const error = await getServiceError();
                expect(error.message).toBe('Service error');
            });

            test('error should contain method arguments', async () => {
                const error = await getServiceError();
                expect(error.controllerData.arguments.login).toBe(requestData.query.login);
                expect(error.controllerData.arguments.limit).toBe(requestData.query.limit);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('getAllUsers');
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

        describe('when invalid data is provided', () => {
            const requestData = {
                params: {
                    id: INVALID_DATA
                },
                body: INVALID_DATA
            };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.updateUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "User with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('User with ID invalidData is not found');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.userUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('updateUser');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = {
                params: {
                    id: ERROR
                },
                body: ERROR
            };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.updateUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on service error', async () => {
                const error = await getServiceError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Service error" message', async () => {
                const error = await getServiceError();
                expect(error.message).toBe('Service error');
            });

            test('error should contain method arguments', async () => {
                const error = await getServiceError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.userUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('updateUser');
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

        describe('when invalid data is provided', () => {
            const requestData = {
                params: {
                    id: INVALID_DATA
                }
            };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.getUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "User with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('User with ID invalidData is not found');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('getUser');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = {
                params: {
                    id: ERROR
                }
            };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.getUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on service error', async () => {
                const error = await getServiceError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Service error" message', async () => {
                const error = await getServiceError();
                expect(error.message).toBe('Service error');
            });

            test('error should contain method arguments', async () => {
                const error = await getServiceError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('getUser');
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

        describe('when invalid data is provided', () => {
            const requestData = {
                params: {
                    id: INVALID_DATA
                }
            };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.removeUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "User with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('User with ID invalidData is not found');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('removeUser');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = {
                params: {
                    id: ERROR
                }
            };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.removeUser(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on service error', async () => {
                const error = await getServiceError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Service error" message', async () => {
                const error = await getServiceError();
                expect(error.message).toBe('Service error');
            });

            test('error should contain method arguments', async () => {
                const error = await getServiceError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('removeUser');
            });
        });
    });
});
