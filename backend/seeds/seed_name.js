// exports.seed = function(knex) {
//   return knex('users').del()
//     .then(function () {
//       return knex('users').insert([
//         { username: 'abdulla', password: '1234AAaa', email: 'a@gmail.com' },
//         { username: 'abdulla', password: '1234AAaa', email: 'b@gmail.com' },
//         { username: 'muhammed', password: '1234AAaa', email: 'm@gmail.com' },
//         { username: 'ayub', password: '1234AAaa', email: 'y@gmail.com' }
//       ]);
//     });
// };

export function seed(knex) {
  return knex('note').del()
    .then(function () {
      return knex('note').insert([
        { title: 'title', note: 'note...', user_id: '8' },
        { title: 'Note App', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae. Libero nunc consequat interdum varius sit amet mattis. Integer quis auctor elit sed vulputate. Lacus suspendisse faucibus interdum posuere lorem ipsum. Eu non diam phasellus vestibulum. Scelerisque felis imperdiet proin fermentum leo vel. Nibh ', user_id: '8' },
        { title: 'a', note: 'a', user_id: '8' },
        { title: '11', note: '11', user_id: '8' },
        { title: 'title', note: 'note...', user_id: '2' },
        { title: 'Note title', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae. Libero nunc consequat interdum varius sit amet mattis. Integer quis auctor elit sed vulputate. Lacus suspendisse faucibus interdum posuere lorem ipsum. Eu non diam phasellus vestibulum. Scelerisque felis imperdiet proin fermentum leo vel. Nibh ', user_id: '3' },
        { title: 'Note title', note: 'syso("Hello world!");', user_id: '8' },
      ]);
    });
}
