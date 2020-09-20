const mockGroupsToUsers = async (group, user) => {
    const marvelGroup = await group.findOne({
        where: {
            name: 'Marvel'
        }
    });

    const dcGroup = await group.findOne({
        where: {
            name: 'DC'
        }
    });

    const userBarbara = await user.findOne({
        where: {
            login: 'Jhon'
        }
    });

    const userJhon = await user.findOne({
        where: {
            login: 'Barbara'
        }
    });

    // This adds user Jhon to the Marvel and DC groups:
    await userJhon.addGroup(marvelGroup);
    await userJhon.addGroup(dcGroup);

    // This adds user Barbara to the Marvel group:
    await userBarbara.addGroup(marvelGroup);
};

export default mockGroupsToUsers;
