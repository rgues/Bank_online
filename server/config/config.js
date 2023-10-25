const config = {
    production: {
        USERNAME: process.env.MARIADB_USERNAME,
        PASSWORD: process.env.MARIADB_PASSWORD,
        DATABASE: process.env.MARIADB_DB,
        MARIADB_PORT: process.env.MARIADB_PORT,
        HOST: process.env.MARIADB_HOST,
        DIALECT: 'mysql',
        SECRET: process.env.JWT_SECRET,
        URL: process.env.URL
    },
    default: {
        USERNAME: 'root',
        PASSWORD: '',
        DATABASE: 'online_db',
        MARIADB_PORT: '3306',
        HOST: 'localhost',
        DIALECT: 'mysql',
        SECRET: 'SUPERSECRETPASSWORD123', //'superSECRET!PASSWORD123#'
        URL: ''
    }
}

exports.get = function get (env) {
    return config[env] || config.default;
}


  