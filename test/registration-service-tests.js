const assert = require('assert');
// const UsersService = require('../services/registration-service');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://lorenzo:123@localhost:5432/registration_numbers_app_tests';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {
    beforeEach(async function () {
        await pool.query('delete from users;');
    });

    it('should able to add a registration number', async function () {
        let usersService = UsersService(pool);
        await usersService.create({
            username: 'ljenecker',
            counter: 1
        });
        let users = await usersService.getAll();
        assert.equal(1, users.length);
    });


    after(function () {
        pool.end();
    });
});
