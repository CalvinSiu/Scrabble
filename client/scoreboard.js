class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  //Save the word score to the server
  async saveWordScore(name, word, score) {
    this.words.push({ name, word, score });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, word, score })
    };
    try {
      const response = await fetch('/wordScore', requestOptions);
      const data = await response.json();
      if(response.status === 200 && data.status === 'success') {
        console.log('Word score saved successfully.');
      } else {
        console.log('Failed to save word score:', data.message);
      }
    } catch(error) {
      console.error('Error:', error);
    }
  }

  render(element) {
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  //Save the game score to the server
  async saveGameScore(name, score) {
    this.game.push({ name, score });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score })
    };

    try {
      const response = await fetch('/gameScore', requestOptions);
      const data = await response.json();
      
      if(response.status === 200 && data.status === 'success') {
        console.log('Game score saved successfully.');
      } else {
        console.log('Failed to save game score:', data.message);
      }
    } catch(error) {
      console.error('Error:', error);
    }
  }
}

class TopWordAndGameScoreBoard {
  //Render the top word and game scores
  async render(element) {
    try {
      const wordResponse = await fetch('/highestWordScores');
      const gameResponse = await fetch('/highestGameScores');
      const wordData = await wordResponse.json();
      const gameData = await gameResponse.json();
      console.log("Word Data: ", wordData);
      console.log("Game Data: ", gameData);
      let html = '<h1 class="top-score-boards">Top 10 Word Scores</h1>';
      html += '<table>';
      wordData.forEach((word) => {
        html += `
          <tr>
            <td>${word.name}</td>
            <td>${word.word}</td>
            <td>${word.score}</td>
          </tr>
        `;
      });
      html += '</table>';
      html += '<h1 class="top-score-boards">Top 10 Game Scores</h1>';
      html += '<table>';
      gameData.forEach((game) => {
        html += `
          <tr>
            <td>${game.name}</td>
            <td>${game.score}</td>
          </tr>
        `;
      });
      html += '</table>';
      element.innerHTML = html;
    } catch(error) {
      console.error('Error fetching top scores:', error);
    }
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
