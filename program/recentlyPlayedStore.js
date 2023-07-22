class RecentlyPlayedStore {
    constructor(capacity) {
        this.capacity = capacity;
        this.store = {};
    }

    add_song(user, song) {
        if (!this.store[user]) {
            this.store[user] = new Array();
        }

        if (this.store[user].indexOf(song) != -1) {
            const userSongs = this.store[user];
            const songs = [];
            for (let s of userSongs) {
                if (s != song) {
                    songs.push(s);
                }
            }
            songs.push(song);
            this.store[user] = songs;
        } else {
            if (this.store[user].length >= this.capacity) {
                this.store[user].shift();
            }
            this.store[user].push(song);
        }

    }

    get_recently_played(user) {
        if (user in this.store) {
            return this.store[user].slice(); // Return a copy of the array to prevent direct modification
        }
        return [];
    }

    print_store() {
        for (const [user, songs] of Object.entries(this.store)) {
            console.log(`User: ${user}`);
            for (const song of songs) {
                console.log(`   - ${song}`);
            }
        }
    }
}

module.exports = RecentlyPlayedStore;
