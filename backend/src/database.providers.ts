// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'admin',
//         database: 'teambridge',
//         entities: [__dirname + '/../**/*.entity.js'],
//         synchronize: true,
//       });

//       return (
//         dataSource
//           .initialize()
//           .then(() => {
//             console.log('Data Source has been initialized!');
//           })
//           // eslint-disable-next-line prettier/prettier
//           .catch(err => {
//             console.error('Error during Data Source initialization', err);
//           })
//       );
//     },
//   },
// ];

// export const dataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'admin',
//   database: 'teambridge',
//   entities: [__dirname + '/../**/*.entity.js'],
//   synchronize: true,
// });
