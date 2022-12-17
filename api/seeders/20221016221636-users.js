module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
        [
            {
                name: "Luca",
                password: "1234",
                email: "luca@luca.com",
                age: 19,
                sex: "M",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {}),

    down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};