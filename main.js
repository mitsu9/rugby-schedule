Vue.component('schedule-table', {
  props: ['games', 'columns'],
  data: ()=> {
    return {
      round: '',
      stadium: '',
      team: ''
    }
  },
  template:`
    <div class='schedule-table'>
      <form>
        <div class="form-group row">
          <label class="col-sm-1">節</label>
          <select class="form-control col-sm-11" v-model="round">
            <option value="">全て</option>
            <option v-for='s in allRound'>{{s}}</option>
          </select>
        </div>
        <div class="form-group row">
          <label class="col-sm-1">会場</label>
          <select class="form-control col-sm-11" v-model="stadium">
            <option value="">全て</option>
            <option v-for='s in allStadiums'>{{s}}</option>
          </select>
        </div>
        <div class="form-group row">
          <label class="col-sm-1">チーム</label>
          <select class="form-control col-sm-11" v-model="team">
            <option value="">全て</option>
            <option v-for='s in allTeams'>{{s}}</option>
          </select>
        </div>
      </form>
      <table class='table'>
        <thead>
          <tr>
            <th v-for='column in columns'>{{column}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='game in filteredGames'>
            <td v-for='column in columns'>{{game[column]}}</th>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  computed: {
    filteredGames: function () {
      var data = this.games;
      // TODO: 日時でのfilter処理を追加
      data = data
        .filter((game) => this.round == '' || this.round == game.round)
        .filter((game) => this.stadium == '' || this.stadium == game.stadium)
        .filter((game) => this.team == '' || this.team == game.team1 || this.team == game.team2);
      return data
    },
    allRound: function () {
      return this.games.map(d => d.round).filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
    },
    allStadiums: function () {
      return this.games.map(d => d.stadium).filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
    },
    allTeams: function () {
      team1 = this.games.map(d => d.team1)
      team2 = this.games.map(d => d.team2)
      return team1.concat(team2).filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
    }
  }
})

var vm = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue.js",
    columns: ['round', 'date', 'weekday', 'kickoff', 'stadium', 'team1', 'team2'],
    games: []
  },
  mounted: function () {
    axios.get("https://mitsu9.github.io/rugby-schedule/games.json").then(response => (this.games = response.data))
  },
});
