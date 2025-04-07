//your JS code here. If required.
 const submitBtn = document.getElementById("submit");
    const playerInputs = document.getElementById("player-inputs");
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "";
    let gameActive = true;

    const winningCombinations = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["1", "5", "9"],
      ["3", "5", "7"]
    ];

    function checkWin() {
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
          document.getElementById(a).textContent === currentSymbol &&
          document.getElementById(b).textContent === currentSymbol &&
          document.getElementById(c).textContent === currentSymbol
        );
      });
    }

    function handleClick(e) {
      const cell = e.target;
      if (!gameActive || cell.textContent !== "") return;

      cell.textContent = currentSymbol;

      if (checkWin()) {
        message.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
      }

      if ([...cells].every(cell => cell.textContent !== "")) {
        message.textContent = `It's a draw!`;
        gameActive = false;
        return;
      }

      // Switch turn
      if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
      } else {
        currentSymbol = "X";
        currentPlayer = player1;
      }

      message.textContent = `${currentPlayer}, you're up`;
    }

    submitBtn.addEventListener("click", () => {
      player1 = document.getElementById("player1").value.trim();
      player2 = document.getElementById("player2").value.trim();

      if (!player1 || !player2) {
        alert("Please enter both player names.");
        return;
      }

      currentPlayer = player1;
      currentSymbol = "X";
      message.textContent = `${currentPlayer}, you're up`;
      playerInputs.style.display = "none";
      board.style.display = "block";
    });

    cells.forEach(cell => {
      cell.addEventListener("click", handleClick);
    });
