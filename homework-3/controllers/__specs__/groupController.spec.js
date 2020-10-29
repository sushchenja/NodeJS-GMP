import GroupController from '../groupController.js';
import { groupService, groupServiceWithServiceError, groupServiceWithEmptyResult } from '../../services/__mocks__/groupService.js';
import { userGroupService, userGroupServiceWithServiceError, userGroupServiceWithEmptyResult } from '../../services/__mocks__/userGroupService.js';

const ERROR = 'error';
const INVALID_DATA = 'invalidData';
const USER_DATA = 'userData';
const GROUP_DATA = 'groupData';

describe('GroupController', () => {
    const controller = new GroupController(groupService, userGroupService);
    const controllerWithEmptyResult = new GroupController(groupServiceWithEmptyResult, userGroupServiceWithEmptyResult);
    const controllerWithServiceError = new GroupController(groupServiceWithServiceError, userGroupServiceWithServiceError);

    const setupResponse = () => ({
        json: jest.fn(),
        send: jest.fn()
    });
    const setupNext = () => jest.fn();

    describe('addNewGroup', () => {
        describe('when valid body data is provided', () => {
            test('should call res.json with group entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.addNewGroup({ body: GROUP_DATA }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(GROUP_DATA);
            });
        });

        describe('when invalid data is provided', () => {
            const requestData = { body: INVALID_DATA };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.addNewGroup(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Failed to create group" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Failed to create group');
            });

            test('error should have 500 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(500);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.group).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('addNewGroup');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = { body: ERROR };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.addNewGroup(requestData, res, next);
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
                expect(error.controllerData.arguments.group).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('addNewGroup');
            });
        });
    });

    describe('getAllGroups', () => {
        describe('when valid body data is provided', () => {
            test('should call res.json with group entities', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.getAllGroups({}, res, next);
                expect(res.json).toHaveBeenLastCalledWith([GROUP_DATA]);
            });
        });

        describe('when no groups to return', () => {
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.getAllGroups({}, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "No groups" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('No groups');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments).toMatchObject({});
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('getAllGroups');
            });
        });

        describe('when service error is happened',  () => {
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.getAllGroups({}, res, next);
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
                expect(error.controllerData.arguments).toMatchObject({});
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('getAllGroups');
            });
        });
    });

    describe('getGroup', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with group entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.getGroup({
                    params: {
                        id: GROUP_DATA
                    }
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(GROUP_DATA);
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

                await controllerWithEmptyResult.getGroup(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Group with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Group with ID invalidData is not found');
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
                expect(error.controllerData.method).toBe('getGroup');
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

                await controllerWithServiceError.getGroup(requestData, res, next);
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
                expect(error.controllerData.method).toBe('getGroup');
            });
        });
    });

    describe('removeGroup', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with group entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.removeGroup({
                    params: {
                        id: GROUP_DATA
                    }
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(GROUP_DATA);
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

                await controllerWithEmptyResult.removeGroup(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Group with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Group with ID invalidData is not found');
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
                expect(error.controllerData.method).toBe('removeGroup');
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

                await controllerWithServiceError.removeGroup(requestData, res, next);
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
                expect(error.controllerData.method).toBe('removeGroup');
            });
        });
    });

    describe('updateGroup', () => {
        describe('when valid id is provided', () => {
            test('should call res.json with group entity', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.updateGroup({
                    params: {
                        id: GROUP_DATA
                    },
                    body: GROUP_DATA
                }, res, next);
                expect(res.json).toHaveBeenLastCalledWith(GROUP_DATA);
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

                await controllerWithEmptyResult.updateGroup(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Group with ID invalidData is not found" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Group with ID invalidData is not found');
            });

            test('error should have 404 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(404);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('updateGroup');
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

                await controllerWithServiceError.updateGroup(requestData, res, next);
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
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('updateGroup');
            });
        });
    });

    describe('addUsersToGroup', () => {
        describe('when valid data is provided', () => {
            test('should call res.send with user entities', async () => {
                const res = setupResponse();
                const next = setupNext();

                await controller.addUsersToGroup({
                    params: {
                        id: GROUP_DATA
                    },
                    query: {
                        id: USER_DATA
                    }
                }, res, next);
                expect(res.send).toHaveBeenLastCalledWith([USER_DATA]);
            });
        });

        describe('when invalid data is provided', () => {
            const requestData = {
                params: {
                    id: INVALID_DATA
                },
                query: {
                    id: INVALID_DATA
                }
            };
            const getInvalidError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithEmptyResult.addUsersToGroup(requestData, res, next);
                return next.mock.calls[0][0];
            };

            test('should call next callback with error on invalid data', async () => {
                const error = await getInvalidError();
                expect(error instanceof Error).toBe(true);
            });

            test('error should contain "Failed add users to group" message', async () => {
                const error = await getInvalidError();
                expect(error.message).toBe('Failed add users to group');
            });

            test('error should have 500 status', async () => {
                const error = await getInvalidError();
                expect(error.statusCode).toBe(500);
            });

            test('error should contain method arguments', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getInvalidError();
                expect(error.controllerData.method).toBe('addUsersToGroup');
            });
        });

        describe('when service error is happened',  () => {
            const requestData = {
                params: {
                    id: ERROR
                },
                query: {
                    id: ERROR
                }
            };
            const getServiceError = async () => {
                const res = setupResponse();
                const next = setupNext();

                await controllerWithServiceError.addUsersToGroup(requestData, res, next);
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
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
            });

            test('error should contain method name', async () => {
                const error = await getServiceError();
                expect(error.controllerData.method).toBe('addUsersToGroup');
            });
        });
    });
});
