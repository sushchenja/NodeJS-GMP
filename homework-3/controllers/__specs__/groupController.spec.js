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

        describe('when a group is not created due to invalid data is provided', () => {
            test('should call next callback with "Failed to create group" 500 error', async () => {
                const requestData = { body: INVALID_DATA };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.addNewGroup(requestData, res, next);
                const error =  next.mock.calls[0][0];

                expect(error.message).toBe('Failed to create group');
                expect(error.statusCode).toBe(500);
                expect(error.controllerData.arguments.group).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addNewGroup');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = { body: ERROR };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.addNewGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.group).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addNewGroup');
                expect(error instanceof Error).toBe(true);
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

        describe('when groups are not returned due to invalid data is provided', () => {
            test('should call next callback with "No groups" 404 error', async () => {
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.getAllGroups({}, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('No groups');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments).toMatchObject({});
                expect(error.controllerData.method).toBe('getAllGroups');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.getAllGroups({}, res, next);
                const error =  next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments).toMatchObject({});
                expect(error.controllerData.method).toBe('getAllGroups');
                expect(error instanceof Error).toBe(true);
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

        describe('when a group is not returned due to invalid data is provided', () => {
            test('should call next callback with "Group with ID invalidData is not found" 404 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.getGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Group with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('getGroup');
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
                await controllerWithServiceError.getGroup(requestData, res, next);
                const error =  next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('getGroup');
                expect(error instanceof Error).toBe(true);
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

        describe('when a group is not removed due to invalid data is provided', () => {
            test('should call next callback with "Group with ID invalidData is not found" 404 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.removeGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Group with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('removeGroup');
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
                await controllerWithServiceError.removeGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.method).toBe('removeGroup');
                expect(error instanceof Error).toBe(true);
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

        describe('when a group is not updated due to invalid data is provided', () => {
            test('should call next callback with "Group with ID invalidData is not found" 404 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    },
                    body: INVALID_DATA
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.updateGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Group with ID invalidData is not found');
                expect(error.statusCode).toBe(404);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('updateGroup');
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
                await controllerWithServiceError.updateGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('updateGroup');
                expect(error instanceof Error).toBe(true);
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

        describe('when group is not added to group due to invalid data is provided', () => {
            test('should call next callback with "Failed add users to group" 500 error', async () => {
                const requestData = {
                    params: {
                        id: INVALID_DATA
                    },
                    query: {
                        id: INVALID_DATA
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithEmptyResult.addUsersToGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Failed add users to group');
                expect(error.statusCode).toBe(500);
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addUsersToGroup');
                expect(error instanceof Error).toBe(true);
            });
        });

        describe('when service error is happened',  () => {
            test('should call next callback with "Service error"', async () => {
                const requestData = {
                    params: {
                        id: ERROR
                    },
                    query: {
                        id: ERROR
                    }
                };
                const res = setupResponse();
                const next = setupNext();
                await controllerWithServiceError.addUsersToGroup(requestData, res, next);
                const error = next.mock.calls[0][0];

                expect(error.message).toBe('Service error');
                expect(error.controllerData.arguments.id).toBe(requestData.params.id);
                expect(error.controllerData.arguments.groupUpdates).toBe(requestData.body);
                expect(error.controllerData.method).toBe('addUsersToGroup');
                expect(error instanceof Error).toBe(true);
            });
        });
    });
});
