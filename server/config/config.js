const config = {
    production: {
        USERNAME: process.env.MARIADB_USERNAME || 'ckntecrl_BancoAdminMaster2023',
        PASSWORD: process.env.MARIADB_PASSWORD || 'BanConONline#Strt2023!',
        DATABASE: process.env.MARIADB_DB || 'ckntecrl_BancoConnectBD',
        MARIADB_PORT: process.env.MARIADB_PORT || '3306',
        HOST: process.env.MARIADB_HOST || 'localhost',
        DIALECT: 'mysql',
        SECRET: process.env.JWT_SECRET || 'superSECRET!PASSWORD123#',
        URL: process.env.URL ||'/'
    },
    default: {
        USERNAME: 'root',
        PASSWORD: '',
        DATABASE: 'online_db',
        MARIADB_PORT: '3306',
        HOST: 'localhost',
        DIALECT: 'mysql',
        SECRET: 'SUPERSECRETPASSWORD123',
        URL: ''
    }
}

exports.get = function get (env) {
    return config[env] || config.default;
}


  