new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage} damage!`
      })
      if (this.checkWin()) {
        return;
      }
    
      this.monsterAttacks();
    },
    specialAttack: function() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster HARD for ${damage} damage!`
      })
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
        this.turns.unshift({
          isPlayer: true,
          heals: true,
          text: `Player heals for 10 health!`
        });
      } else {
        this.playerHealth = 100;
        this.turns.unshift({
          isPlayer: true,
          heals: true,
          text: `Players health has been reset to 100!`
        });
      }
      
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits player for ${damage} damage!`
      })
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lose! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});