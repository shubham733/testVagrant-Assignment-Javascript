const RecentlyPlayedStore = require('../program/recentlyPlayedStore');
const capacity = 3;

test('add_song: should add songs to the store', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S2');
  store.add_song('user1', 'S3');
  store.add_song('user1', 'S4');
  expect(store.get_recently_played('user1')).toEqual(['S2', 'S3', 'S4']);
});

test('get_recently_played: should return the recently played songs for a user', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S2');
  store.add_song('user1', 'S3');
  expect(store.get_recently_played('user1')).toEqual(['S1', 'S2', 'S3']);
  expect(store.get_recently_played('user2')).toEqual([]);
});

test('add_song: should remove the oldest song when the store is full', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S2');
  store.add_song('user1', 'S3');
  store.add_song('user1', 'S4');
  store.add_song('user1', 'S5');
  expect(store.get_recently_played('user1')).toEqual(['S3', 'S4', 'S5']);
});

test('add_song: should work for multiple users', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S2');
  store.add_song('user2', 'S3');
  store.add_song('user2', 'S4');
  expect(store.get_recently_played('user1')).toEqual(['S1', 'S2']);
  expect(store.get_recently_played('user2')).toEqual(['S3', 'S4']);
});

test('add_song: should work for an empty store', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  expect(store.get_recently_played('user1')).toEqual(['S1']);
});

test('get_recently_played: should return an empty array for a nonexistent user', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  expect(store.get_recently_played('user2')).toEqual([]);
});

test('add_song: should work when similar song played multiple times', () => {
  const store = new RecentlyPlayedStore(capacity);
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S1');
  store.add_song('user1', 'S1');
  expect(store.get_recently_played('user1')).toEqual(['S1']);
})
